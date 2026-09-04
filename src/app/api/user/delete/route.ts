import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma, setAuditContext } from '@/lib/db';
import { getSessionUser } from '@/lib/session';
import { logger } from '@/lib/logger';

/**
 * GDPR Data Deletion — Right to Erasure (Article 17)
 * Deletes all personal data associated with the authenticated user.
 * Audit logs are anonymized (userId set to null) rather than deleted for compliance.
 */
export async function DELETE(request: NextRequest) {
  // Identity comes from the session, NOT from a bearer token.
  //
  // A signed token is only as trustworthy as whatever issued it, and this
  // route is irreversible: it erases a user. Reading the id from the session
  // means the only account that can be deleted is the one actually signed in,
  // regardless of what any token claims.
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { userId } = session;

  setAuditContext({
    userId,
    ipAddress:
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      undefined,
    userAgent: request.headers.get('user-agent') || undefined,
    source: 'api',
  });

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Run all deletions in a transaction
    await prisma.$transaction([
      // 1. Remove all workspace memberships
      prisma.userWorkspace.deleteMany({ where: { userId } }),

      // 2. Anonymize audit logs (keep for compliance, remove PII)
      prisma.auditLog.updateMany({
        where: { userId },
        data: {
          userId: null,
          ipAddress: null,
          userAgent: null,
          before: Prisma.DbNull,
          after: Prisma.DbNull,
        },
      }),

      // 3. Delete user record
      prisma.user.delete({ where: { id: userId } }),
    ]);

    // Log the deletion event (with anonymized record since user is now gone)
    await prisma.auditLog.create({
      data: {
        action: 'gdpr_delete',
        model: 'User',
        recordId: userId,
        userId: null,
        ipAddress:
          request.headers.get('x-forwarded-for') ||
          request.headers.get('x-real-ip') ||
          null,
        source: 'api',
      },
    });

    logger.info('GDPR data deletion completed', { userId });

    return NextResponse.json({
      success: true,
      message: 'All personal data has been deleted',
      deletedAt: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('GDPR data deletion failed', {
      userId,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json(
      { success: false, message: 'Failed to delete data' },
      { status: 500 }
    );
  }
}
