import { NextRequest, NextResponse } from 'next/server';
import { getSessionContext } from '@/lib/server-auth';
import { detect } from '@/tour/progress';

/**
 * The browser fired a custom tracking event. The tag vendors already have
 * it; this only lets the tour tick the task, since the server never sees
 * what the SDK sends to GA4 or Meta.
 */
export async function POST(request: NextRequest) {
  const session = await getSessionContext();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = (await request.json().catch(() => ({}))) as {
    name?: string;
    consent?: boolean;
  };
  if (body.consent) {
    await detect(session.userId, {
      kind: 'action',
      action: 'tracking:consent',
    });
  }
  if (typeof body.name === 'string' && body.name) {
    await detect(
      session.userId,
      { kind: 'action', action: 'tracking:event' },
      { name: body.name }
    );
  }
  return NextResponse.json({ ok: true });
}
