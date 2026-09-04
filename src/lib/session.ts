import 'server-only';
import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME, users } from '@/lib/buildbase';
import { prisma } from '@/lib/db';

/**
 * Server-side identity, derived from the httpOnly session cookie.
 *
 * This is the ONLY trustworthy source of "who is calling". Identity supplied in
 * a request body is a claim, not a fact — anyone can type a different user id.
 */
export interface SessionUser {
  userId: string;
  email: string;
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const jar = await cookies();
  const sessionId = jar.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionId) return null;

  try {
    // getSessionId() reads the same cookie, so this resolves the session
    // server-side against BuildBase rather than trusting anything the caller
    // sent us.
    const profile = await users.getProfile();
    if (!profile?._id || !profile.email) return null;
    return { userId: String(profile._id), email: profile.email };
  } catch {
    return null;
  }
}

/**
 * The caller's role in a workspace, read from the database.
 *
 * Returns null when they are not a member — which is the check that stops one
 * user minting a token for a workspace they have nothing to do with.
 */
export async function getWorkspaceRole(
  userId: string,
  workspaceId: string
): Promise<string | null> {
  const membership = await prisma.userWorkspace.findUnique({
    where: { userId_workspaceId: { userId, workspaceId } },
    select: { userRole: true },
  });
  return membership?.userRole ?? null;
}
