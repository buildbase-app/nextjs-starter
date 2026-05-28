import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma, setAuditContext } from '@/lib/db';
import { createAuthToken } from '@/lib/auth';
import { env } from '@/env';
import { logger } from '@/lib/logger';

/**
 * Application Token URL — called by the BuildBase OAuth2 server
 * during token exchange to get an app-specific token for the user.
 *
 * BuildBase sends:
 *   - Authorization: Bearer {JWT signed with clientSecret}
 *   - JWT payload: { id, email, name, role, emailVerified, image, ... }
 *
 * This endpoint:
 *   1. Verifies the JWT using the shared clientSecret
 *   2. Upserts the user in the local database
 *   3. Creates a local auth token (JWT signed with SYSTEM_SECRET)
 *   4. Returns { success: true, token: string, message: string }
 */
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, token: '', message: 'Missing authorization header' },
        { status: 401 }
      );
    }

    const bearerToken = authHeader.slice(7);

    // Verify the JWT using the shared client secret
    let userData: {
      id: string;
      email: string;
      name: string;
      role: string;
      emailVerified: boolean;
      image?: string;
      blocked?: boolean;
    };

    try {
      userData = jwt.verify(
        bearerToken,
        env.BUILDBASE_OAUTH2_CLIENT_SECRET || env.BUILDBASE_CLIENT_SECRET
      ) as typeof userData;
    } catch {
      return NextResponse.json(
        { success: false, token: '', message: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    if (userData.blocked) {
      return NextResponse.json(
        { success: false, token: '', message: 'User is blocked' },
        { status: 403 }
      );
    }

    // Upsert user in local database
    const userId = userData.id;
    setAuditContext({
      userId,
      ipAddress:
        request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        undefined,
      userAgent: request.headers.get('user-agent') || undefined,
      source: 'oauth2-token',
    });

    await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        id: userId,
        name: userData.name,
        image: userData.image || null,
        role: userData.role || 'user',
        emailVerified: userData.emailVerified || false,
      },
      create: {
        id: userId,
        email: userData.email,
        name: userData.name,
        image: userData.image || null,
        role: userData.role || 'user',
        emailVerified: userData.emailVerified || false,
      },
    });

    // Create a local auth token
    const token = createAuthToken({
      userId,
      workspaceId: null,
      userRole: userData.role || 'user',
    });

    return NextResponse.json({
      success: true,
      token,
      message: 'Token created successfully',
    });
  } catch (error) {
    logger.error('OAuth2 token endpoint failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json(
      { success: false, token: '', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
