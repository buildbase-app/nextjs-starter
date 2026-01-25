import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createAuthToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body' },
      { status: 400 }
    );
  }

  const { code } = body;

  // Input validation
  if (!code || typeof code !== 'string') {
    return NextResponse.json(
      { success: false, message: 'Invalid or missing code parameter' },
      { status: 400 }
    );
  }

  // Validate code format (alphanumeric, reasonable length)
  if (!/^[a-zA-Z0-9_-]{10,256}$/.test(code)) {
    return NextResponse.json(
      { success: false, message: 'Invalid code format' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BUILDBASE_SERVER_URL}/api/v1/auth/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          clientId: process.env.NEXT_PUBLIC_BUILDBASE_CLIENT_ID,
          clientSecret: process.env.BUILDBASE_CLIENT_SECRET,
          orgId: process.env.NEXT_PUBLIC_BUILDBASE_ORG_ID,
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
