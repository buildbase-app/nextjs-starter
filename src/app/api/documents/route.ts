import { NextRequest, NextResponse } from 'next/server';
import {
  createDocument,
  getWorkspaceStats,
  listDocuments,
  QuotaExhaustedError,
} from '@/lib/documents';
import {
  asTags,
  isStatus,
  readJson,
  requireWrite,
  resolveWorkspace,
} from './_shared';

/** GET /api/documents?workspaceId=&status=&tag=&q=&limit=&cursor= */
export async function GET(request: NextRequest) {
  const resolved = await resolveWorkspace(request);
  if (!resolved.ok) return resolved.response;
  const { ctx } = resolved;

  const params = request.nextUrl.searchParams;
  const status = params.get('status');
  const limit = Number(params.get('limit'));
  const [list, stats] = await Promise.all([
    listDocuments(ctx.workspaceId, {
      status: isStatus(status) ? status : undefined,
      tag: params.get('tag') ?? undefined,
      q: params.get('q') ?? undefined,
      cursor: params.get('cursor') ?? undefined,
      limit: Number.isFinite(limit) && limit > 0 ? limit : undefined,
    }),
    getWorkspaceStats(ctx.workspaceId),
  ]);
  return NextResponse.json({ ...list, stats, role: ctx.role });
}

/** POST /api/documents  { workspaceId, title, content, status?, tags? } */
export async function POST(request: NextRequest) {
  const body = await readJson(request);
  const resolved = await resolveWorkspace(request, body);
  if (!resolved.ok) return resolved.response;
  const { ctx } = resolved;

  const forbidden = await requireWrite(ctx);
  if (forbidden) return forbidden;

  const title = typeof body.title === 'string' ? body.title.trim() : '';
  if (!title || title.length > 200) {
    return NextResponse.json(
      { error: 'title is required (max 200 characters)' },
      { status: 400 }
    );
  }
  const content = typeof body.content === 'string' ? body.content : '';
  if (content.length > 50_000) {
    return NextResponse.json({ error: 'content too long' }, { status: 400 });
  }

  try {
    const result = await createDocument(
      ctx.bb,
      ctx.workspaceId,
      { userId: ctx.userId, name: ctx.name },
      {
        title,
        content,
        status: isStatus(body.status) ? body.status : undefined,
        tags: asTags(body.tags),
      },
      { source: 'api' }
    );
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof QuotaExhaustedError) {
      return NextResponse.json(
        {
          error: 'quota_exhausted',
          quotaSlug: error.quotaSlug,
          included: error.included,
          consumed: error.consumed,
        },
        { status: 402 }
      );
    }
    throw error;
  }
}
