import { NextResponse } from 'next/server';
import { adminFetch } from '@/lib/buildbase-admin';
import {
  adminErrorResponse,
  requireSessionAndAdmin,
} from '../../modules-shared';

/** GET /api/links/chart - clicks per day for the last 14 days, all links. */
export async function GET() {
  const gate = await requireSessionAndAdmin();
  if (!gate.ok) return gate.response;
  const to = new Date();
  const from = new Date(to.getTime() - 14 * 24 * 60 * 60 * 1000);
  try {
    const chart = await adminFetch<unknown>('links-analytics/chart', {
      // The chart validator wants `filter` as a nested object, which the
      // server's query parser only builds from bracket keys.
      query: {
        groupBy: 'day',
        'filter[from]': from.toISOString(),
        'filter[to]': to.toISOString(),
      },
    });
    return NextResponse.json({ chart, from, to });
  } catch (error) {
    return adminErrorResponse(error);
  }
}
