import { NextRequest, NextResponse } from 'next/server';
import { prisma, setAuditContext } from '@/lib/db';
import { getAuthTokenFromHeader } from '@/lib/auth';
import { logger } from '@/lib/logger';

/**
 * GDPR Data Export — Right of Access (Article 15)
 * Returns all personal data associated with the authenticated user.
 */
export async function GET(request: NextRequest) {
  const token = await getAuthTokenFromHeader();
  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { userId } = token;

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
    // Fetch all user data
    const [user, workspaceMemberships, auditLogs] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.userWorkspace.findMany({
        where: { userId },
      }),
      prisma.auditLog.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Fetch workspace details for memberships
    const workspaceIds = workspaceMemberships.map((m) => m.workspaceId);
    const workspaces = await prisma.workspace.findMany({
      where: { id: { in: workspaceIds } },
    });

    const exportData = {
      exportedAt: new Date().toISOString(),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        role: user.role,
        emailVerified: user.emailVerified,
        timezone: user.timezone,
        language: user.language,
        country: user.country,
        currency: user.currency,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      workspaces: workspaceMemberships.map((m) => {
        const ws = workspaces.find((w) => w.id === m.workspaceId);
        return {
          workspaceId: m.workspaceId,
          workspaceName: ws?.name ?? null,
          role: m.userRole,
          joinedAt: m.createdAt,
        };
      }),
      auditLogs: auditLogs.map((log) => ({
        id: log.id,
        action: log.action,
        model: log.model,
        recordId: log.recordId,
        ipAddress: log.ipAddress,
        userAgent: log.userAgent,
        source: log.source,
        createdAt: log.createdAt,
      })),
    };

    logger.info('GDPR data export requested', { userId });

    return NextResponse.json({
      success: true,
      data: exportData,
    });
  } catch (error) {
    logger.error('GDPR data export failed', {
      userId,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json(
      { success: false, message: 'Failed to export data' },
      { status: 500 }
    );
  }
}
