import { NextRequest, NextResponse } from 'next/server';
import { verifyClientJwt, extractBearerToken } from '@buildbase/sdk';
import { prisma } from '@/lib/db';
import { env } from '@/env';
import { logger } from '@/lib/logger';
import { verifyAuthToken } from '@/lib/auth';

/**
 * Application Profile URL (`applicationProfileUrl` / userinfo).
 *
 * Called by OAuth2 clients (agents, Zapier, n8n, …) to learn who the token
 * belongs to. Accepts either:
 *   - one of OUR access tokens (web or agent, signed with SYSTEM_SECRET), or
 *   - a BuildBase-signed JWT (signed with the shared client secret).
 *
 * Both are verified with the algorithm pinned to HS256 and `exp` required.
 */
export async function GET(request: NextRequest) {
  try {
    const bearer = extractBearerToken(request.headers.get('authorization'));
    if (!bearer) {
      return NextResponse.json(
        { success: false, message: 'Missing authorization header' },
        { status: 401 }
      );
    }

    let userId: string | null = null;

    const appToken = verifyAuthToken(bearer);
    if (appToken) userId = appToken.userId;

    if (!userId) {
      try {
        const decoded = verifyClientJwt(
          bearer,
          env.BUILDBASE_OAUTH2_CLIENT_SECRET || env.BUILDBASE_CLIENT_SECRET
        );
        const id = decoded.id ?? decoded.sub;
        userId = typeof id === 'string' ? id : null;
      } catch {
        // Neither token type is valid
      }
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
        emailVerified: true,
        timezone: true,
        language: true,
        country: true,
        currency: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    logger.error('OAuth2 profile endpoint failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
