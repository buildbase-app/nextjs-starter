import 'server-only';
import { prisma } from '@/lib/db';
import { logger } from '@/lib/logger';
import { TOUR_TASKS, taskById } from './catalog';
import type { Prisma } from '@prisma/client';
import type { TourDetection } from './types';

export interface TourProgressRow {
  taskId: string;
  source: string;
  completedAt: string;
}

export async function getProgress(userId: string): Promise<TourProgressRow[]> {
  const rows = await prisma.tourProgress.findMany({
    where: { userId },
    orderBy: { completedAt: 'asc' },
  });
  return rows.map((r) => ({
    taskId: r.taskId,
    source: r.source,
    completedAt: r.completedAt.toISOString(),
  }));
}

/** Tick one task. Idempotent: a task completed twice keeps its first time. */
export async function completeTask(
  userId: string,
  taskId: string,
  source: 'detected' | 'manual',
  meta?: Record<string, unknown>
): Promise<boolean> {
  if (!taskById(taskId)) return false;
  try {
    await prisma.tourProgress.upsert({
      where: { userId_taskId: { userId, taskId } },
      create: {
        userId,
        taskId,
        source,
        meta: (meta ?? undefined) as Prisma.InputJsonValue | undefined,
      },
      update: {},
    });
    return true;
  } catch (error) {
    logger.warn('Tour: could not record progress', { userId, taskId, error });
    return false;
  }
}

export async function uncompleteTask(userId: string, taskId: string) {
  await prisma.tourProgress.deleteMany({ where: { userId, taskId } });
}

/**
 * Tick every task whose detection matches what just happened. Called from
 * the events route (SDK events), the webhook route and the app's own
 * actions, so a task completes the moment its trace appears.
 */
export async function detect(
  userId: string,
  what: Exclude<TourDetection, { kind: 'manual' }>,
  meta?: Record<string, unknown>
): Promise<string[]> {
  const done: string[] = [];
  for (const task of TOUR_TASKS) {
    const d = task.detect;
    if (d.kind !== what.kind) continue;
    const key = 'event' in d ? d.event : d.action;
    const seen = 'event' in what ? what.event : what.action;
    // '*' on an event-kind task means "any event of this kind"; the
    // webhook-received task uses it, since which event arrives first is
    // whatever the platform sends first.
    if (key !== seen && !(key === '*' && 'event' in d)) continue;
    if (await completeTask(userId, task.id, 'detected', meta))
      done.push(task.id);
  }
  return done;
}
