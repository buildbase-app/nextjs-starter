import 'server-only';
import { auth, withSession } from '@/lib/buildbase';
import { logger } from '@/lib/logger';

/**
 * Server-side identity helpers.
 *
 * Every protected API route in this app resolves the caller the same way:
 *   1. read the httpOnly `bb-session-id` cookie (set by /api/auth/token)
 *   2. hand it to the SDK's `withSession()` so BuildBase itself answers
 *      "who is this?" and "is this user a member of that workspace?"
 *
 * Nothing about identity or role is ever trusted from the request body —
 * the platform is the source of truth. This is the same trust model the
 * MCP server uses (`ctx.bb` is a `withSession()` client), so a route handler
 * and an MCP tool can share the same helpers.
 */

export interface SessionContext {
  sessionId: string;
  userId: string;
  email: string;
  name: string;
  /** Session-scoped SDK actions — every call runs as this user. */
  bb: ReturnType<typeof withSession>;
}

export interface WorkspaceContext extends SessionContext {
  workspaceId: string;
  /** The caller's role inside the workspace (owner / admin / member / …). */
  role: string;
}

/** Resolve the caller from the session cookie. Returns null when signed out. */
export async function getSessionContext(): Promise<SessionContext | null> {
  const session = await auth();
  if (!session?.sessionId) return null;

  const bb = withSession(session.sessionId);
  try {
    const profile = await bb.users.getProfile();
    return {
      sessionId: session.sessionId,
      userId: profile.id ?? profile._id,
      email: profile.email,
      name: profile.name,
      bb,
    };
  } catch (error) {
    // An expired/revoked session is not an error worth paging anyone about.
    logger.debug('Session cookie present but profile lookup failed', {
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
}

/**
 * Resolve the caller AND verify they belong to `workspaceId`.
 * Returns null when signed out or not a member.
 */
export async function getWorkspaceContext(
  workspaceId: string
): Promise<WorkspaceContext | null> {
  const session = await getSessionContext();
  if (!session) return null;

  const role = await resolveWorkspaceRole(
    session.bb,
    workspaceId,
    session.userId
  );
  if (!role) return null;

  return { ...session, workspaceId, role };
}

/**
 * Look up the role a user holds in a workspace via the platform.
 * Works with any session-scoped client — route handlers pass `session.bb`,
 * MCP tools pass `ctx.bb`.
 */
export async function resolveWorkspaceRole(
  bb: ReturnType<typeof withSession>,
  workspaceId: string,
  userId: string
): Promise<string | null> {
  try {
    const members = await bb.users.list(workspaceId);
    const me = members.find((m) => {
      const id =
        typeof m.user === 'string' ? m.user : (m.user.id ?? m.user._id);
      return id === userId;
    });
    return me?.role ?? null;
  } catch (error) {
    logger.debug('Workspace membership lookup failed', {
      workspaceId,
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
}

/** Roles allowed to mutate workspace-owned data in this app. */
export const WRITE_ROLES = new Set(['owner', 'admin', 'member', 'editor']);

export function canWrite(role: string): boolean {
  return WRITE_ROLES.has(role);
}
