import 'server-only';
import type { ScopedActions } from '@buildbase/sdk';
import type { Prisma } from '@prisma/client';
import { prisma, setAuditContext } from '@/lib/db';
import { logger } from '@/lib/logger';
import { SAMPLE_DOCUMENTS } from './samples';

/**
 * Document service — the demo's own product domain.
 *
 * Used by BOTH the REST routes (/api/documents/*) and the MCP tools, so a
 * human in the dashboard and an AI agent over MCP go through exactly the
 * same code and the same BuildBase metering.
 *
 * Metering on create:
 *   - `bb.usage.record()` against the `documents` quota (plan-based limit)
 *   - `bb.credits.consume()` one credit (prepaid balance)
 * Both are best-effort: a workspace whose plan has no such quota, or no
 * credits, still gets its document — the result explains what happened so
 * the UI can show it. Flip `METERING.strict` to make them blocking.
 */

export const DOCUMENT_STATUSES = [
  'draft',
  'in_review',
  'published',
  'archived',
] as const;
export type DocumentStatus = (typeof DOCUMENT_STATUSES)[number];

export const METERING = {
  quotaSlug: 'documents',
  creditsPerDocument: 1,
  /** When true, quota exhaustion / insufficient credits block creation. */
  strict: false,
} as const;

export interface MeteringResult {
  usage:
    | { recorded: true; used: number; included: number; available: number }
    | { recorded: false; reason: string };
  credits:
    | { consumed: true; amount: number; balanceAfter: number }
    | { consumed: false; reason: string };
}

export interface Actor {
  userId: string;
  name?: string | null;
}

export interface ListOptions {
  status?: DocumentStatus;
  tag?: string;
  q?: string;
  limit?: number;
  cursor?: string;
}

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

function clampLimit(limit?: number) {
  return Math.min(Math.max(limit ?? DEFAULT_LIMIT, 1), MAX_LIMIT);
}

export function toSummary<T extends { content: string }>(doc: T) {
  const { content, ...rest } = doc;
  return {
    ...rest,
    excerpt: content
      .replace(/[#>*`|_-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160),
    wordCount: content.split(/\s+/).filter(Boolean).length,
  };
}

export async function listDocuments(
  workspaceId: string,
  opts: ListOptions = {}
) {
  const limit = clampLimit(opts.limit);
  const where: Prisma.DocumentWhereInput = { workspaceId };
  if (opts.status) where.status = opts.status;
  if (opts.tag) where.tags = { has: opts.tag };
  if (opts.q) {
    where.OR = [
      { title: { contains: opts.q, mode: 'insensitive' } },
      { content: { contains: opts.q, mode: 'insensitive' } },
    ];
  }

  const rows = await prisma.document.findMany({
    where,
    orderBy: { updatedAt: 'desc' },
    take: limit + 1,
    ...(opts.cursor ? { cursor: { id: opts.cursor }, skip: 1 } : {}),
  });

  const hasMore = rows.length > limit;
  const items = (hasMore ? rows.slice(0, limit) : rows).map(toSummary);
  return {
    items,
    nextCursor: hasMore ? items[items.length - 1]?.id : null,
  };
}

export async function getDocument(workspaceId: string, id: string) {
  return prisma.document.findFirst({ where: { id, workspaceId } });
}

export async function getWorkspaceStats(workspaceId: string) {
  const [total, byStatus, tags] = await Promise.all([
    prisma.document.count({ where: { workspaceId } }),
    prisma.document.groupBy({
      by: ['status'],
      where: { workspaceId },
      _count: { _all: true },
    }),
    prisma.document.findMany({
      where: { workspaceId },
      select: { tags: true },
    }),
  ]);
  const tagCounts = new Map<string, number>();
  for (const row of tags) {
    for (const tag of row.tags)
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
  }
  return {
    total,
    byStatus: Object.fromEntries(
      DOCUMENT_STATUSES.map((s) => [
        s,
        byStatus.find((b) => b.status === s)?._count._all ?? 0,
      ])
    ) as Record<DocumentStatus, number>,
    tags: [...tagCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count })),
  };
}

async function meterCreate(
  bb: ScopedActions,
  workspaceId: string,
  documentId: string
): Promise<MeteringResult> {
  const result: MeteringResult = {
    usage: { recorded: false, reason: 'not attempted' },
    credits: { consumed: false, reason: 'not attempted' },
  };

  try {
    const usage = await bb.usage.record(workspaceId, {
      quotaSlug: METERING.quotaSlug,
      quantity: 1,
      source: 'documents',
      idempotencyKey: `doc-create-${documentId}`,
      metadata: { documentId },
    });
    result.usage = {
      recorded: true,
      used: usage.used,
      included: usage.included,
      available: usage.available,
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    result.usage = { recorded: false, reason };
    if (METERING.strict) throw error;
    logger.debug('Usage not recorded for document create', {
      workspaceId,
      reason,
    });
  }

  try {
    const credits = await bb.credits.consume(workspaceId, {
      amount: METERING.creditsPerDocument,
      description: 'Document created',
      idempotencyKey: `doc-create-${documentId}`,
      metadata: { documentId },
    });
    result.credits = {
      consumed: true,
      amount: credits.consumed,
      balanceAfter: credits.balanceAfter,
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    result.credits = { consumed: false, reason };
    if (METERING.strict) throw error;
    logger.debug('Credits not consumed for document create', {
      workspaceId,
      reason,
    });
  }

  return result;
}

export interface CreateInput {
  title: string;
  content: string;
  status?: DocumentStatus;
  tags?: string[];
}

export async function createDocument(
  bb: ScopedActions,
  workspaceId: string,
  actor: Actor,
  input: CreateInput,
  options: { source?: string; isSample?: boolean } = {}
) {
  setAuditContext({
    userId: actor.userId,
    workspaceId,
    source: options.source ?? 'api',
  });

  const doc = await prisma.document.create({
    data: {
      workspaceId,
      title: input.title.trim(),
      content: input.content,
      status: input.status ?? 'draft',
      tags: normaliseTags(input.tags),
      createdById: actor.userId,
      createdByName: actor.name ?? null,
      isSample: options.isSample ?? false,
    },
  });

  const metering = options.isSample
    ? null
    : await meterCreate(bb, workspaceId, doc.id);

  return { document: doc, metering };
}

export interface UpdateInput {
  title?: string;
  content?: string;
  status?: DocumentStatus;
  tags?: string[];
}

export async function updateDocument(
  workspaceId: string,
  id: string,
  actor: Actor,
  input: UpdateInput,
  source = 'api'
) {
  const existing = await getDocument(workspaceId, id);
  if (!existing) return null;
  setAuditContext({ userId: actor.userId, workspaceId, source });
  return prisma.document.update({
    where: { id },
    data: {
      ...(input.title !== undefined ? { title: input.title.trim() } : {}),
      ...(input.content !== undefined ? { content: input.content } : {}),
      ...(input.status !== undefined ? { status: input.status } : {}),
      ...(input.tags !== undefined ? { tags: normaliseTags(input.tags) } : {}),
      updatedById: actor.userId,
    },
  });
}

export async function deleteDocument(
  workspaceId: string,
  id: string,
  actor: Actor,
  source = 'api'
) {
  const existing = await getDocument(workspaceId, id);
  if (!existing) return false;
  setAuditContext({ userId: actor.userId, workspaceId, source });
  await prisma.document.delete({ where: { id } });
  return true;
}

/** Insert the sample set once per workspace. Returns how many were added. */
export async function seedSampleDocuments(
  workspaceId: string,
  actor: Actor
): Promise<{ inserted: number; alreadySeeded: boolean }> {
  const existing = await prisma.document.count({
    where: { workspaceId, isSample: true },
  });
  if (existing > 0) return { inserted: 0, alreadySeeded: true };

  setAuditContext({ userId: actor.userId, workspaceId, source: 'seed' });
  // Spread updatedAt over the last 30 days so ordering looks lived-in.
  const now = Date.now();
  const rows = SAMPLE_DOCUMENTS.map((s, i) => {
    const ageDays = Math.round((i / SAMPLE_DOCUMENTS.length) * 30);
    const when = new Date(now - ageDays * 86_400_000 - i * 3_600_000);
    return {
      workspaceId,
      title: s.title,
      content: s.content,
      status: s.status,
      tags: s.tags,
      createdById: actor.userId,
      createdByName: actor.name ?? null,
      isSample: true,
      createdAt: when,
      updatedAt: when,
    };
  });
  const result = await prisma.document.createMany({ data: rows });
  return { inserted: result.count, alreadySeeded: false };
}

/** Remove the sample rows only — user-authored documents are untouched. */
export async function clearSampleDocuments(workspaceId: string, actor: Actor) {
  setAuditContext({ userId: actor.userId, workspaceId, source: 'seed' });
  const result = await prisma.document.deleteMany({
    where: { workspaceId, isSample: true },
  });
  return result.count;
}

function normaliseTags(tags?: string[]) {
  if (!tags) return [];
  return [
    ...new Set(tags.map((t) => t.trim().toLowerCase()).filter(Boolean)),
  ].slice(0, 10);
}
