import { NextRequest, NextResponse } from 'next/server';
import { ApiVersion, WorkspaceApi, isReauthRequired } from '@buildbase/sdk';
import { env } from '@/env';
import { SESSION_COOKIE_NAME } from '@/lib/buildbase';
import { setAuditContext } from '@/lib/db';
import { eraseLocalUser } from '@/lib/account/erase';
import { getSessionContext } from '@/lib/server-auth';
import { logger } from '@/lib/logger';

/**
 * Delete my account - GDPR Right to Erasure (Article 17), on the platform
 * and here.
 *
 * 1. The platform account: `requestAccountDeletion()` with the session from
 *    the httpOnly cookie. Deleting an account needs a sign-in from the last
 *    10 minutes, so an older session is refused `403 reauth_required`. That
 *    refusal goes back to the page as it is, and the page sends the person
 *    to "Confirm it's you" (`requireReverification`), then they press Delete
 *    again. A person who still owns or pays for a workspace with other
 *    members is refused 409 with those workspaces named.
 * 2. This app's copy: erased at once when the platform deleted the account
 *    now. When the organization delays deletions (`deleteAfter`), the
 *    platform's `user.deleted` webhook erases it when the time comes, and
 *    the person can still cancel until then.
 *
 * Identity comes from the session only, never from the request: the only
 * account this can delete is the one signed in.
 */
export async function DELETE(request: NextRequest) {
  const session = await getSessionContext();
  if (!session) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { userId, sessionId } = session;
  const ipAddress =
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    null;

  setAuditContext({
    userId,
    ipAddress: ipAddress ?? undefined,
    userAgent: request.headers.get('user-agent') || undefined,
    source: 'api',
  });

  const api = new WorkspaceApi({
    serverUrl: env.NEXT_PUBLIC_BUILDBASE_SERVER_URL,
    version: ApiVersion.V1,
    orgId: env.NEXT_PUBLIC_BUILDBASE_ORG_ID,
    sessionId,
  });

  let result: { deleteAfter: string | null; deleted: boolean };
  try {
    result = await api.requestAccountDeletion();
  } catch (error) {
    if (isReauthRequired(error)) {
      return NextResponse.json(
        {
          success: false,
          code: 'reauth_required',
          factors: error.factors ?? [],
        },
        { status: 403 }
      );
    }
    const refusal = error as {
      code?: string;
      status?: number;
      workspaces?: { id: string; name: string }[];
      message?: string;
    };
    if (
      refusal.code === 'owns_workspaces' ||
      refusal.code === 'pays_for_workspaces'
    ) {
      return NextResponse.json(
        {
          success: false,
          code: refusal.code,
          workspaces: refusal.workspaces ?? [],
        },
        { status: 409 }
      );
    }
    logger.error('Account deletion refused by the platform', {
      userId,
      code: refusal.code,
      error: refusal.message ?? String(error),
    });
    return NextResponse.json(
      {
        success: false,
        code: refusal.code ?? 'deletion_failed',
        message: 'The account could not be deleted',
      },
      { status: refusal.status && refusal.status >= 400 ? refusal.status : 502 }
    );
  }

  if (!result.deleted) {
    // Scheduled: the platform deletes it at `deleteAfter` and tells us.
    return NextResponse.json(
      { success: true, deleted: false, deleteAfter: result.deleteAfter },
      { status: 202 }
    );
  }

  try {
    await eraseLocalUser(userId, { ipAddress, source: 'api' });
  } catch (error) {
    // The platform account is gone either way; the webhook retries the
    // local erase, so report it and still end the session here.
    logger.error('Local erase after account deletion failed', {
      userId,
      error: error instanceof Error ? error.message : String(error),
    });
  }

  // The platform ended the session with the account: drop the cookie too.
  const response = NextResponse.json({
    success: true,
    deleted: true,
    deletedAt: new Date().toISOString(),
  });
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return response;
}
