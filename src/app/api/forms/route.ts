import { NextResponse } from 'next/server';
import { AdminApiError, hasAdminApi } from '@/lib/buildbase-admin';
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
  let fields;
  try {
    fields = await getFields(form.publicId);
  } catch (error) {
    // The platform serves fields only for a published form; say so rather
    // than surfacing its 404 as a 500.
    if (error instanceof AdminApiError && error.status === 404) {
      return NextResponse.json({ error: 'not_published' }, { status: 404 });
    }
    throw error;
  }
  const submissions = await listSubmissions(form._id).catch(() => []);
  return NextResponse.json({ form, fields, submissions });
}
