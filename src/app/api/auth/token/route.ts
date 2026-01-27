import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createAuthToken } from '@/lib/auth';
import {
  authCodeSchema,
  validateBody,
  isValidationError,
} from '@/lib/validation';
import { env } from '@/env';

export async function POST(request: NextRequest) {
  // Validate request body with Zod
  const validationResult = await validateBody(request, authCodeSchema);
  if (isValidationError(validationResult)) {
    return validationResult;
  }

  const { code } = validationResult;

  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_BUILDBASE_SERVER_URL}/api/v1/auth/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          clientId: env.NEXT_PUBLIC_BUILDBASE_CLIENT_ID,
          clientSecret: env.BUILDBASE_CLIENT_SECRET,
          orgId: env.NEXT_PUBLIC_BUILDBASE_ORG_ID,
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: 'Failed to verify token' },
        { status: 401 }
      );
    }

    const responseData = await response.json();
    const responseResult = responseData.data;
    const sessionId = responseResult.sessionId;
    const userData = responseResult.user;
    // Create or update user in database
    const userId = userData.id || userData._id;
    await prisma.user.upsert({
      where: { id: userId },
      update: {
        email: userData.email,
        name: userData.name,
        image: userData.image || null,
        role: userData.role || 'user',
        emailVerified: userData.emailVerified || false,
        timezone: userData.timezone || null,
        language: userData.language || null,
        country: userData.country || null,
        currency: userData.currency || null,
      },
      create: {
        id: userId,
        email: userData.email,
        name: userData.name,
        image: userData.image || null,
        role: userData.role || 'user',
        emailVerified: userData.emailVerified || false,
        timezone: userData.timezone || null,
        language: userData.language || null,
        country: userData.country || null,
        currency: userData.currency || null,
      },
    });

    const token = createAuthToken({
      userId,
      workspaceId: null,
      userRole: userData.role || 'user',
    });

    return NextResponse.json({
      success: true,
      message: 'Token verified successfully',
      sessionId: sessionId,
      token,
      user: userData,
    });
  } catch (error) {
    // Log error safely without exposing sensitive details
    console.error(
      'Auth token exchange error:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
