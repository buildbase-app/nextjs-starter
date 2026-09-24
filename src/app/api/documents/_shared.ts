import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import {
  canWrite,
  getWorkspaceContext,
  type WorkspaceContext,
} from '@/lib/server-auth';
import { detect } from '@/tour/progress';
import { DOCUMENT_STATUSES, type DocumentStatus } from '@/lib/documents';

/**
 * Every documents route resolves the caller the same way: the workspace
 * comes from the request (`?workspaceId=` or the JSON body), the membership
 * and role come from the platform. A non-member and a signed-out visitor
 * look the same from outside: 401.
 */
export async function resolveWorkspace(
  request: NextRequest,
  body?: Record<string, unknown>
): Promise<
  { ok: true; ctx: WorkspaceContext } | { ok: false; response: NextResponse }
> {
  const workspaceId =
    request.nextUrl.searchParams.get('workspaceId') ??
    (typeof body?.workspaceId === 'string' ? body.workspaceId : null);
  if (!workspaceId) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'workspaceId is required' },
        { status: 400 }
      ),
    };
  }
  const ctx = await getWorkspaceContext(workspaceId);
  if (!ctx) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }
  return { ok: true, ctx };
}

/**
 * Writes need a writing role. A viewer who tries anyway gets 403 and, as a
 * side effect, ticks the tour task about exactly that.
 */
export async function requireWrite(
  ctx: WorkspaceContext
): Promise<NextResponse | null> {
  if (canWrite(ctx.role)) return null;
  await detect(
    ctx.userId,
    { kind: 'action', action: 'permission:refused' },
    {
      role: ctx.role,
    }
  );
  return NextResponse.json(
    { error: 'Forbidden', role: ctx.role },
    { status: 403 }
  );
}

export async function readJson(
  request: NextRequest
): Promise<Record<string, unknown>> {
  try {
    const body = await request.json();
    return body && typeof body === 'object' ? body : {};
  } catch {
    return {};
  }
}

export function isStatus(value: unknown): value is DocumentStatus {
  return (
    typeof value === 'string' &&
    (DOCUMENT_STATUSES as readonly string[]).includes(value)
  );
}

export function asTags(value: unknown): string[] | undefined {
  if (value === undefined) return undefined;
  if (Array.isArray(value))
    return value.filter((v): v is string => typeof v === 'string');
  if (typeof value === 'string') return value.split(',').map((v) => v.trim());
  return undefined;
}
