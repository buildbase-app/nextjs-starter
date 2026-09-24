import { NextRequest, NextResponse } from 'next/server';
import { parseWebhookEvent } from '@buildbase/sdk';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { logger } from '@/lib/logger';
import { detect } from '@/tour/progress';

/**
 * Platform webhooks (server to server).
 *
 * BuildBase signs every delivery: `x-buildbase-signature` is
 * `sha256=<hex>`, an HMAC-SHA256 of `{timestamp}.{body}` with the endpoint's
 * signing secret, and `x-buildbase-timestamp` is the same Unix time as the
 * body's `timestamp`. `parseWebhookEvent` checks both (and rejects anything
 * older than five minutes) before we look at the payload, so a forged or
 * replayed request never reaches the database.
 *
 * Register the endpoint in the console under Settings → Webhooks, pointing at
 * `<site>/api/webhooks/buildbase`, and put its signing secret in
 * `BUILDBASE_WEBHOOK_SECRET`.
 *
 * Deliveries are at-least-once with no event id, so the row key is a hash of
 * the raw body: a retry lands on the same row instead of a duplicate.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.BUILDBASE_WEBHOOK_SECRET;
  if (!secret) {
    logger.warn('Webhook received but BUILDBASE_WEBHOOK_SECRET is not set');
    return NextResponse.json(
      { error: 'Webhook endpoint not configured' },
      { status: 503 }
    );
  }

  const body = await request.text();
  const event = parseWebhookEvent({
    body,
    signature: request.headers.get('x-buildbase-signature'),
    timestamp: request.headers.get('x-buildbase-timestamp'),
    secret,
  });

  if (!event) {
    logger.warn('Webhook rejected: bad signature or stale timestamp', {
      event: request.headers.get('x-buildbase-event') ?? undefined,
    });
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const data = event.data ?? {};
  const workspaceId =
    typeof data.workspaceId === 'string' ? data.workspaceId : null;
  const userId = typeof data.userId === 'string' ? data.userId : null;
  const id = await bodyHash(body);

  try {
    await prisma.webhookEvent.upsert({
      where: { id },
      // The row carries a BigInt; select nothing so the audit extension's
      // JSON logging never has to serialize it.
      select: { id: true },
      update: {},
      create: {
        id,
        event: event.event,
        timestamp: BigInt(event.timestamp),
        workspaceId,
        userId,
        payload: data as Prisma.InputJsonValue,
      },
    });
  } catch (error) {
    logger.error('Webhook could not be stored', {
      event: event.event,
      error: error instanceof Error ? error.message : String(error),
    });
    // 500 makes the platform retry; the body hash keeps the retry idempotent.
    return NextResponse.json({ error: 'Storage failed' }, { status: 500 });
  }

  // The tour: a webhook has no session, so credit the people it is about -
  // every member of the workspace it names, plus the user it names.
  const people = new Set<string>();
  if (userId) people.add(userId);
  if (workspaceId) {
    const members = await prisma.userWorkspace.findMany({
      where: { workspaceId },
      select: { userId: true },
    });
    for (const m of members) people.add(m.userId);
  }
  await Promise.all(
    [...people].map((person) =>
      detect(person, { kind: 'webhook', event: event.event }, { workspaceId })
    )
  );

  logger.debug('Webhook stored', { event: event.event, workspaceId });
  return NextResponse.json({ received: true });
}

async function bodyHash(body: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(body)
  );
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
