import { NextResponse } from 'next/server';
import { createNextWebhookHandler } from '@buildbase/sdk/server/next';

/**
 * Content webhooks: an edit in the console (a doc, an FAQ, a testimonial,
 * rich content) arrives here signed, and the SDK calls `revalidateTag` for
 * exactly what changed, so the help pages read through
 * `src/lib/platform/content.ts` refresh on the next request.
 *
 * Register `<site>/api/webhooks/content` in the console under Settings →
 * Webhooks, subscribed to the content events, and put its signing secret in
 * `BUILDBASE_CONTENT_WEBHOOK_SECRET` (or reuse `BUILDBASE_WEBHOOK_SECRET` when
 * one endpoint carries everything). A bad signature is a 401.
 */
const secret =
  process.env.BUILDBASE_CONTENT_WEBHOOK_SECRET ??
  process.env.BUILDBASE_WEBHOOK_SECRET;

const handler = secret ? createNextWebhookHandler({ secret }) : null;

export async function POST(request: Request) {
  if (!handler) {
    return NextResponse.json(
      { error: 'Content webhook not configured' },
      { status: 503 }
    );
  }
  return handler(request);
}
