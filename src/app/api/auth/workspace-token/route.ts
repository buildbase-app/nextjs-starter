import { NextRequest, NextResponse } from 'next/server';
import { createAuthToken } from '@/lib/auth';
import {
  workspaceTokenSchema,
  validateBody,
  isValidationError,
} from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    // Validate request body with Zod
    const validationResult = await validateBody(request, workspaceTokenSchema);
    if (isValidationError(validationResult)) {
      return validationResult;
    }

    const { userId, workspaceId, userRole } = validationResult;

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
