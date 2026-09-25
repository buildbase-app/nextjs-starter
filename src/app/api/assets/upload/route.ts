import { NextRequest, NextResponse } from 'next/server';
import { adminFetch } from '@/lib/buildbase-admin';
import { detect } from '@/tour/progress';
import {
  adminErrorResponse,
  requireSessionAndAdmin,
} from '../../modules-shared';

/** The platform's own ceiling; refusing here saves a round trip. */
const MAX_BYTES = 5 * 1024 * 1024;

/**
 * POST /api/assets/upload - multipart `file` (+ optional `public`).
 * The browser never holds the org token, so the upload is forwarded from
 * here: same file, same field names the platform expects.
 */
export async function POST(request: NextRequest) {
  const gate = await requireSessionAndAdmin();
  if (!gate.ok) return gate.response;

  const form = await request.formData();
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'file is required' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: 'too_large', message: 'Files are limited to 5 MB' },
      { status: 413 }
    );
  }
  const isPublic = form.get('public') !== 'false';

  const upstream = new FormData();
  upstream.append('file', file, file.name);
  upstream.append('public', isPublic ? 'true' : 'false');

  try {
    const created = await adminFetch<unknown>('assets', {
      method: 'POST',
      body: upstream,
    });
    await detect(
      gate.session.userId,
      { kind: 'action', action: 'asset:uploaded' },
      { name: file.name, size: file.size }
    );
    return NextResponse.json({ asset: created }, { status: 201 });
  } catch (error) {
    return adminErrorResponse(error);
  }
}
