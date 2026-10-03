import { NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/lib/buildbase';

/**
 * Clears this app's session cookie. It does not revoke the platform session,
 * on purpose: the SDK's `signOut()` calls this route first (its `onSignOut`
 * callback) and then revokes the session itself - just this one, or every
 * session the user has with `signOut({ everywhere: true })`. Revoking here
 * first would leave the SDK's revoke holding a dead id, and "sign out
 * everywhere" would end only this browser's session.
 */
export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}
