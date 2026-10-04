import { NextRequest, NextResponse } from 'next/server';
import { prisma, setAuditContext } from '@/lib/db';
import { logger } from '@/lib/logger';
import { getSessionContext, type SessionContext } from '@/lib/server-auth';
import { detect } from '@/tour/progress';

/**
 * Mirrors SDK lifecycle events into the local database.
 *
 * The browser forwards every event here, so the body is whatever the browser
 * chose to send - it says WHICH user or workspace changed, never what is true
 * about it. Each event re-reads the facts from the platform as the session's
 * user, the same trust model as `server-auth.ts`: a person can only refresh
 * their own profile and the workspaces they belong to.
 */

type EventType =
  | 'user:created'
  | 'user:updated'
  | 'workspace:created'
  | 'workspace:updated'
  | 'workspace:deleted'
  | 'workspace:changed'
  | 'workspace:user-added'
  | 'workspace:user-removed'
  | 'workspace:user-role-changed'
  | 'workspace:invitation-sent'
  | 'workspace:invitation-accepted'
  | 'workspace:invitation-declined'
  | 'workspace:invitation-revoked';

const WORKSPACE_SYNC_EVENTS = new Set<EventType>([
  'workspace:created',
  'workspace:updated',
  'workspace:changed',
  'workspace:user-added',
  'workspace:user-removed',
  'workspace:user-role-changed',
]);

type Outcome = 'ok' | 'forbidden';

/** The workspace an event is about, from either payload shape the SDK sends. */
function workspaceIdOf(data: unknown): string | undefined {
  const d = (data ?? {}) as {
    workspace?: { _id?: unknown };
    workspaceId?: unknown;
  };
  const id = d.workspace?._id ?? d.workspaceId;
  return typeof id === 'string' && id ? id : undefined;
}

/** Mirror the session's own profile - never a user named in the body. */
async function syncSelf(session: SessionContext): Promise<Outcome> {
  const user = await session.bb.users.getProfile();
  const fields = {
    email: user.email,
    name: user.name,
    image: user.image || null,
    role: user.role || 'user',
    // emailVerified is not on the profile; /api/auth/token sets it at login.
    timezone: user.timezone || null,
    language: user.language || null,
    country: user.country || null,
    currency: user.currency || null,
  };
  await prisma.user.upsert({
    where: { id: session.userId },
    update: fields,
    create: { id: session.userId, ...fields },
  });
  return 'ok';
}

/**
 * Re-read a workspace and its member list from the platform and make the
 * local mirror match. Refused unless the session's user is a member.
 */
async function syncWorkspace(
  session: SessionContext,
  workspaceId: string
): Promise<Outcome> {
  let members;
  try {
    members = await session.bb.users.list(workspaceId);
  } catch {
    return 'forbidden';
  }
  const memberId = (m: (typeof members)[number]) =>
    typeof m.user === 'string' ? m.user : (m.user.id ?? m.user._id);
  if (!members.some((m) => memberId(m) === session.userId)) return 'forbidden';

  const workspace = await session.bb.workspace.get(workspaceId);
  await prisma.workspace.upsert({
    where: { id: workspaceId },
    update: { name: workspace.name },
    create: { id: workspaceId, name: workspace.name },
  });

  const ids = members.map(memberId);
  await prisma.$transaction([
    prisma.userWorkspace.deleteMany({
      where: { workspaceId, userId: { notIn: ids } },
    }),
    ...members.map((m) =>
      prisma.userWorkspace.upsert({
        where: { userId_workspaceId: { userId: memberId(m), workspaceId } },
        update: { userRole: m.role },
        create: { userId: memberId(m), workspaceId, userRole: m.role },
      })
    ),
  ]);
  return 'ok';
}

/**
 * Drop a deleted workspace from the mirror. Only a recorded member may, and
 * only once the platform no longer lists the workspace for them.
 */
async function removeWorkspace(
  session: SessionContext,
  workspaceId: string
): Promise<Outcome> {
  const membership = await prisma.userWorkspace.findUnique({
    where: { userId_workspaceId: { userId: session.userId, workspaceId } },
  });
  if (!membership) return 'forbidden';
  const live = await session.bb.workspace.list();
  if (live.some((w) => w._id === workspaceId)) return 'ok';
  await prisma.$transaction([
    prisma.userWorkspace.deleteMany({ where: { workspaceId } }),
    prisma.workspace.deleteMany({ where: { id: workspaceId } }),
  ]);
  return 'ok';
}

export async function POST(request: NextRequest) {
  let eventType: EventType;
  let data: unknown;
  try {
    const body = (await request.json()) as {
      eventType?: unknown;
      data?: unknown;
    };
    if (typeof body?.eventType !== 'string') throw new Error('no eventType');
    eventType = body.eventType as EventType;
    data = body.data;
  } catch {
    return NextResponse.json(
      { success: false, error: 'Expected a JSON body with an eventType' },
      { status: 400 }
    );
  }

  const session = await getSessionContext();
  if (!session) {
    return NextResponse.json(
      { success: false, error: 'Not signed in' },
      { status: 401 }
    );
  }

  const workspaceId = workspaceIdOf(data);
  setAuditContext({
    userId: session.userId,
    workspaceId,
    ipAddress:
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      undefined,
    userAgent: request.headers.get('user-agent') || undefined,
    source: 'event',
  });

  try {
    let outcome: Outcome = 'ok';
    if (eventType === 'user:created' || eventType === 'user:updated') {
      outcome = await syncSelf(session);
    } else if (eventType === 'workspace:deleted') {
      if (workspaceId) outcome = await removeWorkspace(session, workspaceId);
    } else if (WORKSPACE_SYNC_EVENTS.has(eventType)) {
      if (workspaceId) outcome = await syncWorkspace(session, workspaceId);
    } else if (!eventType.startsWith('workspace:invitation-')) {
      // Invitations mirror nothing: membership follows through user-added.
      logger.warn('Unknown event type received', { eventType });
    }

    if (outcome === 'forbidden') {
      return NextResponse.json(
        { success: false, error: 'Not a member of this workspace' },
        { status: 403 }
      );
    }

    // The tour ticks off tasks from the trace they leave.
    await detect(session.userId, { kind: 'sdk-event', event: eventType });

    logger.debug('Event processed successfully', { eventType });
    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('Event handling failed', {
      eventType,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json(
      { success: false, error: 'Failed to process event' },
      { status: 500 }
    );
  }
}
