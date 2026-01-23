import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_SECRET = process.env.SYSTEM_SECRET || 'system_secret';

export async function POST(request: NextRequest) {
  const { code } = await request.json();

  if (!code) {
    return NextResponse.json({ success: false, message: 'No code provided' });
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
      return NextResponse.json({
        success: false,
        message: 'Failed to verify token',
      });
    }

    const responseData = await response.json();
    const responseResult = responseData.data;
    const sessionId = responseResult.sessionId;
    const userData = responseResult.user;

    const tokenData = jwt.sign(
      {
        sessionId: sessionId,
        user: userData,
      },
      SYSTEM_SECRET
    );

    return NextResponse.json({
      success: true,
      message: 'Token verified successfully',
      sessionId: sessionId,
      token: tokenData,
      user: userData,
    });
  } catch (error) {
    console.error('Auth token exchange error:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to verify token',
    });
  }
}
