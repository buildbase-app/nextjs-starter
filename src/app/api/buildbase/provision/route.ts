import { NextRequest, NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { logger } from '@/lib/logger';
import { detect } from '@/tour/progress';

/**
 * A workflow's HTTP Webhook action calls this route.
 *
 * Unlike platform webhooks, a workflow's outbound call is not signed: the
 * platform strips the `authorization` header, so the workflow sends a shared
 * secret in `x-webhook-secret` and we compare it to BUILDBASE_WEBHOOK_SECRET.
 * The platform retries up to five times and ignores non-2xx, so the row key
 * is a hash of the body: a retry lands on the same row.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.BUILDBASE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  }
  const given = request.headers.get('x-webhook-secret') ?? '';
  if (!timingSafeEqual(given, secret)) {
    logger.warn('Provisioning call refused: bad x-webhook-secret');
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const raw = await request.text();
  let data: Record<string, unknown> = {};
  try {
    const parsed = raw ? JSON.parse(raw) : {};
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      data = parsed as Record<string, unknown>;
    }
  } catch {
    return NextResponse.json({ error: 'Body must be JSON' }, { status: 400 });
  }

  const userId = typeof data.userId === 'string' ? data.userId : null;
  const workspaceId =
    typeof data.workspaceId === 'string' ? data.workspaceId : null;
  const id = await bodyHash(raw || '{}');

  try {
    await prisma.webhookEvent.upsert({
      where: { id },
      select: { id: true },
      update: {},
      create: {
        id,
        event: 'workflow.http_webhook',
        timestamp: BigInt(Date.now()),
        workspaceId,
        userId,
        payload: data as Prisma.InputJsonValue,
      },
    });
  } catch (error) {
    logger.error('Provisioning call could not be stored', {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json({ error: 'Storage failed' }, { status: 500 });
  }

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
      detect(person, { kind: 'action', action: 'workflow:called' }, { id })
    )
  );

  return NextResponse.json({ provisioned: true, id });
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
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
