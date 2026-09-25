import { NextRequest, NextResponse } from 'next/server';
import { adminFetch } from '@/lib/buildbase-admin';
import { detect } from '@/tour/progress';
import { adminErrorResponse, requireSessionAndAdmin } from '../modules-shared';

export interface LinkRow {
  _id: string;
  name: string;
  url: string;
  linkId: string;
  archived: boolean;
  createdAt: string;
  /** Filled in here from the analytics collection. */
  clicks: number;
  /** Where a click lands: the platform's redirect for this org. */
  shortUrl: string;
}

const SERVER = (process.env.NEXT_PUBLIC_BUILDBASE_SERVER_URL ?? '').replace(
  /\/$/,
  ''
);
const ORG = process.env.NEXT_PUBLIC_BUILDBASE_ORG_ID ?? '';

async function clicksFor(linkId: string): Promise<number> {
  try {
    const r = await adminFetch<{ totalDocs?: number; docs?: unknown[] }>(
      'links-analytics',
      { query: { filter: { linkId }, limit: 1 } }
    );
    return r?.totalDocs ?? r?.docs?.length ?? 0;
  } catch {
    return 0;
  }
}

/** GET /api/links - the org's links with their click counts. */
export async function GET() {
  const gate = await requireSessionAndAdmin();
  if (!gate.ok) return gate.response;
  try {
    const result = await adminFetch<{ docs: LinkRow[] } | LinkRow[]>('links', {
      query: {
        limit: 50,
        sort: { createdAt: -1 },
        filter: { archived: false },
      },
    });
    const docs = Array.isArray(result) ? result : (result?.docs ?? []);
    const links = await Promise.all(
      docs.map(async (l) => ({
        ...l,
        clicks: await clicksFor(l.linkId),
        shortUrl: `${SERVER}/api/redirect/${ORG}/${l.linkId}`,
      }))
    );
    // A click on any link the app made is the trace the tour looks for.
    if (links.some((l) => l.clicks > 0)) {
      await detect(gate.session.userId, {
        kind: 'action',
        action: 'link:clicked',
      });
    }
    return NextResponse.json({ links });
  } catch (error) {
    return adminErrorResponse(error);
  }
}

/** POST /api/links { name, url } */
export async function POST(request: NextRequest) {
  const gate = await requireSessionAndAdmin();
  if (!gate.ok) return gate.response;
  const body = (await request.json().catch(() => ({}))) as {
    name?: string;
    url?: string;
  };
  const name = body.name?.trim();
  const url = body.url?.trim();
  if (!name || !url || !/^https?:\/\//i.test(url)) {
    return NextResponse.json(
      { error: 'name and an http(s) url are required' },
      { status: 400 }
    );
  }
  try {
    const created = await adminFetch<LinkRow>('links', {
      method: 'POST',
      body: { name, url },
    });
    await detect(
      gate.session.userId,
      { kind: 'action', action: 'link:created' },
      { linkId: created?.linkId }
    );
    return NextResponse.json(
      {
        link: {
          ...created,
          clicks: 0,
          shortUrl: `${SERVER}/api/redirect/${ORG}/${created.linkId}`,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return adminErrorResponse(error);
  }
}
