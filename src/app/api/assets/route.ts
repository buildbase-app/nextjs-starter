import { NextResponse } from 'next/server';
import { adminFetch } from '@/lib/buildbase-admin';
import { adminErrorResponse, requireSessionAndAdmin } from '../modules-shared';

export interface AssetRow {
  _id: string;
  name: string;
  uniqueName: string;
  mimeType: string;
  size: number;
  public: boolean;
  bucket?: { name?: string; url?: string; path?: string };
  image?: { width?: number; height?: number };
  createdAt: string;
}

/** GET /api/assets - the organization's files, newest first. */
export async function GET() {
  const gate = await requireSessionAndAdmin();
  if (!gate.ok) return gate.response;
  try {
    const result = await adminFetch<{ docs: AssetRow[] } | AssetRow[]>(
      'assets',
      { query: { limit: 50, sort: { createdAt: -1 } } }
    );
    const docs = Array.isArray(result) ? result : (result?.docs ?? []);
    return NextResponse.json({ assets: docs });
  } catch (error) {
    return adminErrorResponse(error);
  }
}
