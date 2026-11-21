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
  const write = client.auditLog
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
  // Not awaited, so the write never slows the request. On Cloudflare, work left
  // running after the response is cancelled unless registered with waitUntil.
  cloudflareRequestContext()?.ctx?.waitUntil(write);
}

function createPrismaClient(pool: Pool) {
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

// Read DATABASE_URL directly from process.env so the Pool always uses the
// live value — env.DATABASE_URL is captured at module evaluation time and
// can be undefined on the first Turbopack compile before .env.local loads.
function databaseUrl(): string | undefined {
  return process.env.DATABASE_URL ?? env.DATABASE_URL;
}

/**
 * The Cloudflare request context, when running on Cloudflare Workers.
 *
 * The OpenNext adapter (`npm run cf:deploy`) exposes `{ env, ctx, cf }` for the
 * current request on this global. On Vercel, Docker and `next dev` it is
 * undefined. Read it directly rather than importing @opennextjs/cloudflare, so
 * the Node build never pulls the adapter in.
 */
interface CloudflareRequestContext {
  env: { HYPERDRIVE?: { connectionString: string } };
  ctx?: { waitUntil(promise: Promise<unknown>): void };
}

function cloudflareRequestContext(): CloudflareRequestContext | undefined {
  return (globalThis as Record<symbol, unknown>)[
    Symbol.for('__cloudflare-context__')
  ] as CloudflareRequestContext | undefined;
}

// A Worker cannot reuse a socket opened while serving another request, so on
// Cloudflare each request gets its own client. Keyed on the request's context
// object, which the adapter creates afresh for every request.
const clientPerRequest = new WeakMap<object, PrismaClient>();

function clientForCloudflare(ctx: CloudflareRequestContext): PrismaClient {
  let client = clientPerRequest.get(ctx);
  if (!client) {
    client = createPrismaClient(
      new Pool({
        // Hyperdrive pools connections at Cloudflare's edge when bound;
        // otherwise connect straight to the database.
        connectionString: ctx.env.HYPERDRIVE?.connectionString ?? databaseUrl(),
        // Workers cap concurrent outbound connections per request.
        max: 5,
      })
    );
    clientPerRequest.set(ctx, client);
  }
  return client;
}

// Vercel, Docker and local dev: one long-lived pool for the whole process.
function clientForNode(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient(
      new Pool({ connectionString: databaseUrl() })
    );
  }
  return globalForPrisma.prisma;
}

function currentClient(): PrismaClient {
  const cf = cloudflareRequestContext();
  return cf ? clientForCloudflare(cf) : clientForNode();
}

/**
 * The Prisma client. Resolves to the right client on every access, so the
 * same import works on Vercel, Docker and Cloudflare Workers.
 */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = currentClient();
    const value = Reflect.get(client, prop, client);
    return typeof value === 'function' ? value.bind(client) : value;
  },
});
