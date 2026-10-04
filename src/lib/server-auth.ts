import 'server-only';
import { auth, settings, withSession } from '@/lib/buildbase';
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

export interface WorkspaceContext extends SessionContext, MemberGrants {
  workspaceId: string;
  /** The caller's role inside the workspace (owner / admin / member / …). */
  role: string;
}

/** What the platform says a member may do in one workspace. */
export interface MemberGrants {
  role: string;
  isOwner: boolean;
  /** Platform keys (`workspace:*`) and the organization's own keys. */
  permissions: Set<string>;
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

  const grants = await resolveMemberGrants(
    session.bb,
    workspaceId,
    session.userId
  );
  if (!grants) return null;

  return { ...session, workspaceId, ...grants };
}

/**
 * The member's role and permissions in a workspace, as the platform resolves
 * them: the organization's custom roles and the keys it granted to each in
 * the console. Null when the user is not a member. Falls back to the member
 * list on a server too old to answer, with no keys granted.
 */
export async function resolveMemberGrants(
  bb: ReturnType<typeof withSession>,
  workspaceId: string,
  userId: string
): Promise<MemberGrants | null> {
  try {
    const answer = await bb.workspace.permissions(workspaceId);
    if (!answer.role) return null;
    return {
      role: answer.role,
      isOwner: answer.isOwner,
      permissions: new Set(answer.permissions),
    };
  } catch (error) {
    logger.debug('Workspace permissions lookup failed, using the role', {
      workspaceId,
      error: error instanceof Error ? error.message : String(error),
    });
    const role = await resolveWorkspaceRole(bb, workspaceId, userId);
    return role ? { role, isOwner: false, permissions: new Set() } : null;
  }
}

/** The organization's own permission keys, re-read at most once a minute. */
let catalogue: { keys: Set<string>; at: number } | null = null;
async function organizationKeys(): Promise<Set<string>> {
  if (catalogue && Date.now() - catalogue.at < 60_000) return catalogue.keys;
  try {
    const org = await settings.get();
    const defined = org.workspace?.customPermissions ?? [];
    catalogue = { keys: new Set(defined.map((p) => p.key)), at: Date.now() };
  } catch {
    catalogue = { keys: new Set(), at: Date.now() };
  }
  return catalogue.keys;
}

/**
 * Whether a member may do something the app guards with its own key
 * (`app:documents:create`). The owner always may. Otherwise the platform's
 * answer decides - which is what makes a custom role made in the console
 * work here. A key the organization has not defined yet falls back to the
 * role rule, so an org that never opened the permissions screen still works.
 */
export async function hasAppPermission(
  grants: MemberGrants,
  key: string
): Promise<boolean> {
  if (grants.isOwner || grants.permissions.has(key)) return true;
  if ((await organizationKeys()).has(key)) return false;
  return canWrite(grants.role);
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
