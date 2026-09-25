import { NextResponse } from 'next/server';
import { hasAdminApi } from '@/lib/buildbase-admin';
import { getSessionContext } from '@/lib/server-auth';
import { findForm, getFields, listSubmissions } from '@/lib/platform/forms';

/** The contact form: its fields (public) and the latest submissions (token). */
export async function GET() {
  const session = await getSessionContext();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!hasAdminApi()) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }
  const form = await findForm();
  if (!form) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }
  const [fields, submissions] = await Promise.all([
    getFields(form.publicId),
    listSubmissions(form._id).catch(() => []),
  ]);
  return NextResponse.json({ form, fields, submissions });
}
