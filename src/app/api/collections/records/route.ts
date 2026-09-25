import { NextRequest, NextResponse } from 'next/server';
import { AdminApiError, hasAdminApi } from '@/lib/buildbase-admin';
import { getSessionContext } from '@/lib/server-auth';
import { deleteRecord, getCollectionView } from '@/lib/platform/collections';
import { detect } from '@/tour/progress';

/** DELETE /api/collections/records?id=<recordId> */
export async function DELETE(request: NextRequest) {
  const session = await getSessionContext();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!hasAdminApi()) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }
  const id = request.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }
  const view = await getCollectionView();
  if (!view?.version) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }
  try {
    await deleteRecord(view.collection._id, view.version._id, id);
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 500;
    return NextResponse.json({ error: 'Could not delete' }, { status });
  }
  await detect(session.userId, {
    kind: 'action',
    action: 'collection:record-deleted',
  });
  return NextResponse.json({ ok: true });
}
