import 'server-only';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db';
import { logger } from '@/lib/logger';

/**
 * Erase this app's own copy of a person (GDPR Article 17): their workspace
 * memberships and their user row, with their audit entries kept but stripped
 * of anything that identifies them. Used when the person deletes their
 * account here, and when the platform reports `user.deleted` (an account
 * deleted later, from the console, or swept as an idle guest).
 *
 * Returns false when there was nothing to erase.
 */
export async function eraseLocalUser(
  userId: string,
  meta: { ipAddress?: string | null; source: 'api' | 'webhook' }
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });
  if (!user) return false;

  await prisma.$transaction([
    prisma.userWorkspace.deleteMany({ where: { userId } }),
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
    prisma.user.delete({ where: { id: userId } }),
  ]);

  await prisma.auditLog.create({
    data: {
      action: 'gdpr_delete',
      model: 'User',
      recordId: userId,
      userId: null,
      ipAddress: meta.ipAddress ?? null,
      source: meta.source,
    },
  });

  logger.info('Local account data erased', { userId, source: meta.source });
  return true;
}
