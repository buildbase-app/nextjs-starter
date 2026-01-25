import { NextRequest, NextResponse } from 'next/server';
import { createAuthToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, workspaceId, userRole } = body;

    if (!userId || !workspaceId) {
      return NextResponse.json(
        { success: false, message: 'userId and workspaceId are required' },
        { status: 400 }
      );
    }

    const token = createAuthToken({ userId, workspaceId, userRole });

    return NextResponse.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error(
      'Workspace token error:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    return NextResponse.json(
      { success: false, message: 'Failed to generate token' },
      { status: 500 }
    );
  }
}
