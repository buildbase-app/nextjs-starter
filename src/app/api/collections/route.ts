import { NextResponse } from 'next/server';
import { hasAdminApi } from '@/lib/buildbase-admin';
import { getSessionContext } from '@/lib/server-auth';
import { getCollectionView } from '@/lib/platform/collections';
import { detect } from '@/tour/progress';

/** The release-notes collection: live version, fields and records. */
export async function GET() {
  const session = await getSessionContext();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!hasAdminApi()) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }
  const view = await getCollectionView();
  if (!view) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }
  await detect(session.userId, { kind: 'action', action: 'collection:viewed' });
  return NextResponse.json(view);
}
