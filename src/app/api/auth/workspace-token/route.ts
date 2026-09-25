import { NextRequest, NextResponse } from 'next/server';
import { createAuthToken } from '@/lib/auth';
import { getWorkspaceContext } from '@/lib/server-auth';
import { workspaceTokenSchema } from '@/lib/validation/schemas';
import { validateBody, isValidationError } from '@/lib/validation/api';
import { logger } from '@/lib/logger';

/**
 * Workspace-scoped app token.
 *
 * Called by the client whenever the active workspace changes so that this
 * app's own API routes (GDPR export/delete, documents, …) know which
 * workspace the user is acting in.
 *
 * Security model: the caller is identified by the httpOnly session cookie,
 * and BuildBase confirms the membership + role. The request body only names
 * the workspace — it can never choose a user id or a role.
 */
export async function POST(request: NextRequest) {
  const validationResult = await validateBody(request, workspaceTokenSchema);
  if (isValidationError(validationResult)) {
    return validationResult;
  }

  const { workspaceId } = validationResult;

  try {
    const ctx = await getWorkspaceContext(workspaceId);
    if (!ctx) {
      return NextResponse.json(
        { success: false, message: 'Not signed in or not a workspace member' },
        { status: 401 }
      );
    }

    const token = createAuthToken({
      userId: ctx.userId,
      workspaceId: ctx.workspaceId,
      userRole: ctx.role,
    });

    logger.debug('Workspace token generated', {
      userId: ctx.userId,
      workspaceId: ctx.workspaceId,
      userRole: ctx.role,
    });

    return NextResponse.json({ success: true, token });
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
