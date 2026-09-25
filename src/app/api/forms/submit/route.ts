import { NextRequest, NextResponse } from 'next/server';
import { hasAdminApi } from '@/lib/buildbase-admin';
import { getSessionContext } from '@/lib/server-auth';
import { findForm, submit } from '@/lib/platform/forms';
import { detect } from '@/tour/progress';

/**
 * Forward a submission to the platform's public submit endpoint. The
 * platform validates against the form's live schema and answers 400 with
 * every error at once; this route passes that through and ticks the tour
 * either way, because seeing the refusal is one of its tasks.
 */
export async function POST(request: NextRequest) {
  const session = await getSessionContext();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!hasAdminApi()) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }
  const body = (await request.json().catch(() => null)) as Record<
    string,
    unknown
  > | null;
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }
  const form = await findForm();
  if (!form) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }
  const result = await submit(form.publicId, body);
  if (result.ok) {
    await detect(session.userId, { kind: 'action', action: 'form:submitted' });
    return NextResponse.json({ ok: true, message: result.message });
  }
  if (result.status === 400) {
    await detect(session.userId, { kind: 'action', action: 'form:rejected' });
  }
  return NextResponse.json(
    { ok: false, message: result.message, errors: result.errors ?? [] },
    { status: result.status === 429 ? 429 : 400 }
  );
}
