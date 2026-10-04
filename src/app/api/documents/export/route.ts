import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { detect } from '@/tour/progress';
import { EXPORT_FEATURE } from '@/lib/documents/roles';
import { resolveWorkspace } from '../_shared';

const cell = (value: unknown) => {
  const text =
    value instanceof Date ? value.toISOString() : String(value ?? '');
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

/**
 * GET /api/documents/export?workspaceId= - every document as CSV.
 *
 * A paid feature: the workspace's plan must include `advanced-exports`. The
 * answer comes from the platform (the workspace's own feature map, which a
 * subscription sets), not from the browser, so hiding the button is a
 * courtesy and this check is the rule.
 */
export async function GET(request: NextRequest) {
  const resolved = await resolveWorkspace(request);
  if (!resolved.ok) return resolved.response;
  const { ctx } = resolved;

  const workspace = await ctx.bb.workspace.get(ctx.workspaceId);
  if (!workspace.features?.[EXPORT_FEATURE]) {
    return NextResponse.json(
      { error: 'feature_not_in_plan', feature: EXPORT_FEATURE },
      { status: 403 }
    );
  }

  const rows = await prisma.document.findMany({
    where: { workspaceId: ctx.workspaceId },
    orderBy: { updatedAt: 'desc' },
  });
  const csv = [
    ['id', 'title', 'status', 'tags', 'author', 'updatedAt'].join(','),
    ...rows.map((d) =>
      [d.id, d.title, d.status, d.tags.join(' '), d.createdByName, d.updatedAt]
        .map(cell)
        .join(',')
    ),
  ].join('\n');

  await detect(ctx.userId, { kind: 'action', action: 'documents:exported' });
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="documents-${ctx.workspaceId}.csv"`,
    },
  });
}
