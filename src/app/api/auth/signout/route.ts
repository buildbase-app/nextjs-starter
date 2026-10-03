import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ApiVersion, AuthApi } from '@buildbase/sdk';
import { env } from '@/env';
import { SESSION_COOKIE_NAME } from '@/lib/buildbase';
import { logger } from '@/lib/logger';

export async function POST() {
  // Revoke the platform session, not just this browser's cookie. Clearing the
  // cookie alone leaves the session valid for the rest of its TTL, so anyone
  // who still holds the id stays signed in. `logout` is idempotent and answers
  // for an id that has already expired.
  const sessionId = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  if (sessionId) {
    try {
      await new AuthApi({
        serverUrl: env.NEXT_PUBLIC_BUILDBASE_SERVER_URL,
        version: ApiVersion.V1,
      }).logout(sessionId);
    } catch (error) {
      // Sign the browser out regardless; the session still ends at its TTL.
      logger.warn('Platform session revoke failed on sign-out', {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

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
