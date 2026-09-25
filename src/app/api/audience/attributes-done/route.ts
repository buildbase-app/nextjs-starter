import { NextRequest, NextResponse } from 'next/server';
import { getSessionContext } from '@/lib/server-auth';
import { detect } from '@/tour/progress';

/**
 * POST /api/audience/attributes-done { keys: string[] }
 * The attributes themselves are written by the SDK from the browser, as the
 * user; this only records that it happened, for the tour.
 */
export async function POST(request: NextRequest) {
  const session = await getSessionContext();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = (await request.json().catch(() => ({}))) as { keys?: string[] };
  const keys = Array.isArray(body.keys) ? body.keys.map(String) : [];
  const action = keys.some((k) =>
    ['country', 'timezone', 'currency'].includes(k)
  )
    ? 'attributes:locale'
    : 'attributes:updated';
  const done = await detect(
    session.userId,
    { kind: 'action', action },
    { keys }
  );
  return NextResponse.json({ ok: true, done });
}
