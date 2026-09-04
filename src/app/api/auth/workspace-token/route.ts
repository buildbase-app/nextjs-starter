import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createAuthToken } from '@/lib/auth';
import { validateBody, isValidationError } from '@/lib/validation/api';
import { getSessionUser, getWorkspaceRole } from '@/lib/session';
import { logger } from '@/lib/logger';

/**
 * Mint a workspace-scoped token for the CURRENT user.
 *
 * Identity and role are derived server-side — from the session cookie and from
 * UserWorkspace respectively. Only the workspace being switched to comes from
 * the caller, and membership in it is verified before anything is signed.
 *
 * Previously this route took userId, workspaceId and userRole straight from the
 * request body with no session check, so an unauthenticated caller could mint a
 * validly-signed token naming any user and any role. Because
 * getAuthTokenFromHeader() then trusts the userId inside that token,
 * /api/user/delete and /api/user/export would act on whoever it named.
 *
 * The rule this restores: a request body carries what the caller WANTS, never
 * who the caller IS.
 */
const bodySchema = z.object({
  workspaceId: z.string().min(1, 'Workspace ID is required'),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionUser();
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const validationResult = await validateBody(request, bodySchema);
    if (isValidationError(validationResult)) {
      return validationResult;
    }
    const { workspaceId } = validationResult;

    // Membership decides the role. A caller cannot name their own.
    const userRole = await getWorkspaceRole(session.userId, workspaceId);
    if (!userRole) {
      logger.warn('Workspace token refused — caller is not a member', {
        userId: session.userId,
        workspaceId,
      });
      return NextResponse.json(
        { success: false, message: 'Forbidden' },
        { status: 403 }
      );
    }

    const token = createAuthToken({
      userId: session.userId,
      workspaceId,
      userRole,
    });

    logger.debug('Workspace token generated', {
      userId: session.userId,
      workspaceId,
      userRole,
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
