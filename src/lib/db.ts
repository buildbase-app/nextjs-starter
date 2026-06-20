import 'server-only';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { env } from '@/env';
import { logger } from '@/lib/logger';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Log all models except AuditLog itself (prevents infinite recursion)
const EXCLUDED_MODELS = ['AuditLog'];

// Audit context — set per-request before DB operations
interface AuditContext {
  userId?: string;
  workspaceId?: string;
  ipAddress?: string;
  userAgent?: string;
  source?: string; // 'api' | 'event' | 'system'
}

let _auditContext: AuditContext = {};

export function setAuditUser(userId: string | undefined) {
  _auditContext.userId = userId;
}

export function setAuditWorkspace(workspaceId: string | undefined) {
  _auditContext.workspaceId = workspaceId;
}

export function setAuditContext(ctx: Partial<AuditContext>) {
  _auditContext = { ..._auditContext, ...ctx };
}

export function clearAuditContext() {
  _auditContext = {};
}

function getRecordId(record: Record<string, unknown> | null): string | null {
  if (!record) return null;
  if (record.id) return String(record.id);
  // Composite key for UserWorkspace
  if (record.userId && record.workspaceId) {
    return `${record.userId}:${record.workspaceId}`;
  }
  return null;
}

function writeAuditLog(
  client: PrismaClient,
  action: string,
  model: string,
  recordId: string,
  before: unknown,
  after: unknown
) {
  client.auditLog
    .create({
      data: {
        action,
        model,
        recordId,
        userId: _auditContext.userId ?? null,
        workspaceId: _auditContext.workspaceId ?? null,
        ipAddress: _auditContext.ipAddress ?? null,
        userAgent: _auditContext.userAgent ?? null,
        source: _auditContext.source ?? null,
        before: before ? JSON.parse(JSON.stringify(before)) : null,
        after: after ? JSON.parse(JSON.stringify(after)) : null,
      },
    })
    .catch((err: unknown) => {
      logger.error('Failed to write audit log', { error: err, model, action });
    });
}

function createPrismaClient() {
  // Read DATABASE_URL directly from process.env so the Pool always uses the
  // live value — env.DATABASE_URL is captured at module evaluation time and
  // can be undefined on the first Turbopack compile before .env.local loads.
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL ?? env.DATABASE_URL,
  });
  const adapter = new PrismaPg(pool);
  const base = new PrismaClient({ adapter });

  return base.$extends({
    query: {
      $allOperations({ model, operation, args, query }) {
        if (!model || EXCLUDED_MODELS.includes(model)) {
          return query(args);
        }

        if (operation === 'create') {
          return query(args).then((result) => {
            const recordId = getRecordId(
              result as Record<string, unknown> | null
            );
            if (recordId) {
              writeAuditLog(base, 'create', model, recordId, null, result);
            }
            return result;
          });
        }

        if (operation === 'update') {
          return query(args).then((result) => {
            const recordId = getRecordId(
              result as Record<string, unknown> | null
            );
            if (recordId) {
              writeAuditLog(base, 'update', model, recordId, null, result);
            }
            return result;
          });
        }

        if (operation === 'delete') {
          return query(args).then((result) => {
            const recordId = getRecordId(
              result as Record<string, unknown> | null
            );
            if (recordId) {
              writeAuditLog(base, 'delete', model, recordId, result, null);
            }
            return result;
          });
        }

        if (operation === 'upsert') {
          return query(args).then((result) => {
            const recordId = getRecordId(
              result as Record<string, unknown> | null
            );
            if (recordId) {
              writeAuditLog(base, 'upsert', model, recordId, null, result);
            }
            return result;
          });
        }

        return query(args);
      },
    },
  }) as unknown as PrismaClient;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
