import { NextRequest, NextResponse } from 'next/server';
import { getSessionContext } from '@/lib/server-auth';

/**
 * Your backend's side of a permission check.
 *
 * The browser's `can()` decides what to show; it cannot decide what happens,
 * because anyone can change what their browser believes. So before acting,
 * this route asks BuildBase what the signed-in member may do in the
 * workspace, and the server answers from the same rules the console set.
 *
 * GET  ?workspaceId=...                  -> { role, isOwner, permissions }
 * POST { workspaceId, permission }       -> 200 when allowed, 403 when not
 */

const KEY = /^[a-z0-9][a-z0-9._:-]{0,63}$/;

export async function GET(request: NextRequest) {
  const session = await getSessionContext();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const workspaceId = request.nextUrl.searchParams.get('workspaceId');
  if (!workspaceId) {
    return NextResponse.json(
      { error: 'workspaceId is required' },
      { status: 400 }
    );
  }
  try {
    return NextResponse.json(
      await session.bb.workspace.permissions(workspaceId)
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed' },
      { status: 502 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getSessionContext();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as {
    workspaceId?: unknown;
    permission?: unknown;
  } | null;
  const workspaceId =
    typeof body?.workspaceId === 'string' ? body.workspaceId : '';
  const permission =
    typeof body?.permission === 'string' ? body.permission : '';
  if (!workspaceId || !KEY.test(permission)) {
    return NextResponse.json(
      { error: 'workspaceId and a permission key are required' },
      { status: 400 }
    );
  }

  const allowed = await session.bb.workspace.can(workspaceId, permission);
  if (!allowed) {
    return NextResponse.json({ allowed: false, permission }, { status: 403 });
  }
  // This is where the real work would go: export the report, publish the
  // document. It runs only because the server said yes.
  return NextResponse.json({ allowed: true, permission });
}
