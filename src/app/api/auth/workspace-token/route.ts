import { NextRequest, NextResponse } from 'next/server';
import { createAuthToken } from '@/lib/auth';
import {
  workspaceTokenSchema,
  validateBody,
  isValidationError,
} from '@/lib/validation';
import { logger } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    // Validate request body with Zod
    const validationResult = await validateBody(request, workspaceTokenSchema);
    if (isValidationError(validationResult)) {
      return validationResult;
    }

    const { userId, workspaceId, userRole } = validationResult;

    const token = createAuthToken({ userId, workspaceId, userRole });

    logger.debug('Workspace token generated', {
      userId,
      workspaceId,
      userRole,
    });

    return NextResponse.json({
      success: true,
      token,
    });
  } catch (error) {
    logger.error('Workspace token generation failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json(
      { success: false, message: 'Failed to generate token' },
      { status: 500 }
    );
  }
}
