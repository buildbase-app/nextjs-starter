/**
 * Session endpoint — reads httpOnly cookie and returns sessionId.
 * Called by the SDK's getSession callback on page refresh.
 * Same pattern as next-auth's /api/auth/session.
 */

import { NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/lib/buildbase';

export async function GET() {
  // Dynamic import to avoid issues with cookies() in route handlers
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null;

  return NextResponse.json({ sessionId });
}
