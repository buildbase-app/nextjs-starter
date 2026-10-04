import { NextRequest, NextResponse } from 'next/server';
import { ApiVersion, WorkspaceApi } from '@buildbase/sdk';
import { env } from '@/env';
import { getWorkspaceContext, type WorkspaceContext } from '@/lib/server-auth';
import { detect } from '@/tour/progress';

/**
 * The signed-in member's own notification settings in one workspace: the
 * events they may manage, the workspace default per event, and the member's
 * choices over it. Run on the
 * server with the session from the httpOnly cookie, so the browser never
 * holds the session id. A `null` channel goes back to the workspace default;
 * an event the workspace marked required answers 409.
 */
function workspaceApi(ctx: WorkspaceContext) {
  return new WorkspaceApi({
    serverUrl: env.NEXT_PUBLIC_BUILDBASE_SERVER_URL,
    version: ApiVersion.V1,
    orgId: env.NEXT_PUBLIC_BUILDBASE_ORG_ID,
    sessionId: ctx.sessionId,
  });
}

async function member(workspaceId: string | null) {
  if (!workspaceId) {
    return {
      error: NextResponse.json(
        { error: 'workspaceId is required' },
        { status: 400 }
      ),
    };
  }
  const ctx = await getWorkspaceContext(workspaceId);
  if (!ctx) {
    return {
      error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }
  return { ctx };
}

function failure(error: unknown) {
  const e = error as { status?: unknown; code?: unknown };
  const status =
    e?.code === 'NOTIFICATION_PREFERENCE_REQUIRED'
      ? 409
      : typeof e?.status === 'number'
        ? e.status
        : 500;
  const message =
    error instanceof Error ? error.message : 'Preferences unavailable';
  return NextResponse.json({ error: message }, { status });
}

/** GET /api/notifications/preferences?workspaceId= */
export async function GET(request: NextRequest) {
  const workspaceId = request.nextUrl.searchParams.get('workspaceId');
  const { ctx, error } = await member(workspaceId);
  if (error) return error;
  try {
    // The events a member may manage (enabled and member-managed in the
    // console), then the workspace defaults and the member's own choices
    // over them - the same three reads the SDK's settings screen makes.
    const api = workspaceApi(ctx);
    const [events, prefs] = await Promise.all([
      api.getNotificationEvents(ctx.workspaceId),
      api.getMyNotificationPreferences(ctx.workspaceId),
    ]);
    return NextResponse.json({ events, ...prefs });
  } catch (err) {
    return failure(err);
  }
}

/** PATCH /api/notifications/preferences { workspaceId, preferences } */
export async function PATCH(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as {
    workspaceId?: unknown;
    preferences?: unknown;
  };
  const { ctx, error } = await member(
    typeof body.workspaceId === 'string' ? body.workspaceId : null
  );
  if (error) return error;
  if (!body.preferences || typeof body.preferences !== 'object') {
    return NextResponse.json(
      { error: 'preferences is required' },
      { status: 400 }
    );
  }
  const preferences = body.preferences as Record<
    string,
    { email?: boolean | null; push?: boolean | null }
  >;
  try {
    const api = workspaceApi(ctx);
    // A required event cannot be changed. Checked here so the answer is a
    // clean 409 on any SDK version; the platform refuses it either way.
    const { defaults } = await api.getMyNotificationPreferences(
      ctx.workspaceId
    );
    const locked = Object.keys(preferences).filter(
      (slug) => defaults[slug]?.required
    );
    if (locked.length) {
      return NextResponse.json(
        { error: 'required', events: locked },
        { status: 409 }
      );
    }
    const saved = await api.updateMyNotificationPreferences(
      ctx.workspaceId,
      preferences
    );
    await detect(ctx.userId, {
      kind: 'action',
      action: 'notifications:preferences-saved',
    });
    return NextResponse.json(saved);
  } catch (err) {
    return failure(err);
  }
}
