import { NextRequest, NextResponse } from 'next/server';
import { adminFetch } from '@/lib/buildbase-admin';
import { detect } from '@/tour/progress';
import {
  adminErrorResponse,
  requireSessionAndAdmin,
} from '../../modules-shared';

/** PATCH /api/links/:id { url } - the short link keeps its id, the destination moves. */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const gate = await requireSessionAndAdmin();
  if (!gate.ok) return gate.response;
  const { id } = await params;
  const body = (await request.json().catch(() => ({}))) as { url?: string };
  const url = body.url?.trim();
  if (!url || !/^https?:\/\//i.test(url)) {
    return NextResponse.json(
      { error: 'an http(s) url is required' },
      { status: 400 }
    );
  }
  try {
    const updated = await adminFetch<unknown>(`links/${id}`, {
      method: 'PATCH',
      body: { url },
    });
    await detect(
      gate.session.userId,
      { kind: 'action', action: 'link:updated' },
      { id }
    );
    return NextResponse.json({ link: updated });
  } catch (error) {
    return adminErrorResponse(error);
  }
}
