import { NextRequest, NextResponse } from 'next/server';
import { deleteDocument, getDocument, updateDocument } from '@/lib/documents';
import {
  asTags,
  isStatus,
  readJson,
  requireWrite,
  resolveWorkspace,
} from '../_shared';

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const resolved = await resolveWorkspace(request);
  if (!resolved.ok) return resolved.response;
  const { id } = await params;
  const document = await getDocument(resolved.ctx.workspaceId, id);
  if (!document) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ document });
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const body = await readJson(request);
  const resolved = await resolveWorkspace(request, body);
  if (!resolved.ok) return resolved.response;
  const { ctx } = resolved;
  const forbidden = await requireWrite(ctx);
  if (forbidden) return forbidden;

  const { id } = await params;
  const title = typeof body.title === 'string' ? body.title.trim() : undefined;
  if (title !== undefined && (!title || title.length > 200)) {
    return NextResponse.json({ error: 'invalid title' }, { status: 400 });
  }
  if (body.status !== undefined && !isStatus(body.status)) {
    return NextResponse.json({ error: 'invalid status' }, { status: 400 });
  }
  const document = await updateDocument(
    ctx.workspaceId,
    id,
    { userId: ctx.userId, name: ctx.name },
    {
      title,
      content: typeof body.content === 'string' ? body.content : undefined,
      status: isStatus(body.status) ? body.status : undefined,
      tags: asTags(body.tags),
    }
  );
  if (!document) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ document });
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const resolved = await resolveWorkspace(request);
  if (!resolved.ok) return resolved.response;
  const { ctx } = resolved;
  const forbidden = await requireWrite(ctx);
  if (forbidden) return forbidden;

  const { id } = await params;
  const removed = await deleteDocument(ctx.workspaceId, id, {
    userId: ctx.userId,
    name: ctx.name,
  });
  if (!removed) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
