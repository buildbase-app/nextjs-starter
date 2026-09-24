import { NextRequest, NextResponse } from 'next/server';
import { getWorkspaceContext } from '@/lib/server-auth';
import { prisma } from '@/lib/db';

/**
 * The webhooks this app has received for a workspace, newest first, for the
 * events page. Membership is checked against the platform, and events that
 * name no workspace (a user-level event) are included only when they are
 * about the caller.
 */
export async function GET(request: NextRequest) {
  const workspaceId = request.nextUrl.searchParams.get('workspaceId');
  if (!workspaceId) {
    return NextResponse.json(
      { error: 'workspaceId required' },
      { status: 400 }
    );
  }
  const ctx = await getWorkspaceContext(workspaceId);
  if (!ctx) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rows = await prisma.webhookEvent.findMany({
    where: {
      OR: [{ workspaceId }, { workspaceId: null, userId: ctx.userId }],
    },
    orderBy: { receivedAt: 'desc' },
    take: 50,
  });

  return NextResponse.json({
    events: rows.map((r) => ({
      id: r.id,
      event: r.event,
      timestamp: Number(r.timestamp),
      workspaceId: r.workspaceId,
      userId: r.userId,
      payload: r.payload,
      receivedAt: r.receivedAt.toISOString(),
    })),
  });
}
