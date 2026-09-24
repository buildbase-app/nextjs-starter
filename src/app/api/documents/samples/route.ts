import { NextRequest, NextResponse } from 'next/server';
import { clearSampleDocuments, seedSampleDocuments } from '@/lib/documents';
import { readJson, requireWrite, resolveWorkspace } from '../_shared';

/** POST /api/documents/samples { workspaceId } — load the sample set once. */
export async function POST(request: NextRequest) {
  const body = await readJson(request);
  const resolved = await resolveWorkspace(request, body);
  if (!resolved.ok) return resolved.response;
  const forbidden = await requireWrite(resolved.ctx);
  if (forbidden) return forbidden;
  const { ctx } = resolved;
  const result = await seedSampleDocuments(ctx.workspaceId, {
    userId: ctx.userId,
    name: ctx.name,
  });
  return NextResponse.json(result);
}

/** DELETE /api/documents/samples?workspaceId= — remove the sample rows only. */
export async function DELETE(request: NextRequest) {
  const resolved = await resolveWorkspace(request);
  if (!resolved.ok) return resolved.response;
  const forbidden = await requireWrite(resolved.ctx);
  if (forbidden) return forbidden;
  const { ctx } = resolved;
  const removed = await clearSampleDocuments(ctx.workspaceId, {
    userId: ctx.userId,
    name: ctx.name,
  });
  return NextResponse.json({ removed });
}
