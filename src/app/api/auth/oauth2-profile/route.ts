import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/db';
import { env } from '@/env';
import { logger } from '@/lib/logger';
import { verifyAuthToken } from '@/lib/auth';

/**
 * Application Profile URL — called by third-party services (e.g. Zapier, n8n)
 * to fetch the authenticated user's profile.
 *
 * Accepts either:
 *   - Authorization: Bearer {app token from oauth2-token endpoint}
 *   - Authorization: Bearer {JWT signed with clientSecret from BuildBase}
 *
 * Returns the user profile from the local database.
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Missing authorization header' },
        { status: 401 }
      );
    }

    const bearerToken = authHeader.slice(7);
    let userId: string | null = null;

    // Try verifying as a local app token first (signed with SYSTEM_SECRET)
    const appToken = verifyAuthToken(bearerToken);
    if (appToken) {
      userId = appToken.userId;
    }

    // Fall back to verifying as a BuildBase-signed JWT (clientSecret)
    if (!userId) {
      try {
        const decoded = jwt.verify(
          bearerToken,
          env.BUILDBASE_OAUTH2_CLIENT_SECRET || env.BUILDBASE_CLIENT_SECRET
        ) as { id?: string };
        userId = decoded.id || null;
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

    return NextResponse.json({
      success: true,
      data: user,
    });
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
