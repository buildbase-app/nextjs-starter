import { NextResponse } from 'next/server';
import { AdminApiError, adminFetch, hasAdminApi } from '@/lib/buildbase-admin';
import { getSessionContext } from '@/lib/server-auth';
import { detect } from '@/tour/progress';

export interface ChartPoint {
  label: string;
  value: number;
}
export interface ReportSeries {
  key: 'users' | 'forms' | 'links';
  points: ChartPoint[];
  total: number;
  /** null when the source could not be read (e.g. no `contact` form yet). */
  error: string | null;
}

/**
 * A few of the platform's per-module chart endpoints, for the last 30 days.
 * Every chart endpoint wants `groupBy` and `filter={from,to}`; the shapes of
 * the rows differ a little per module, so they are normalized here.
 */
export async function GET() {
  const session = await getSessionContext();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!hasAdminApi()) {
    return NextResponse.json({ configured: false, series: [], counts: null });
  }

  const to = new Date();
  const from = new Date(to.getTime() - 30 * 24 * 60 * 60 * 1000);
  const query = {
    groupBy: 'day',
    filter: { from: from.toISOString(), to: to.toISOString() },
  };

  const [users, forms, links, counts] = await Promise.all([
    series('users', () => adminFetch('users/chart', { query })),
    series('forms', async () => {
      const list = await adminFetch<{
        docs?: { _id: string; slug?: string; title?: string; name?: string }[];
      }>('forms', { query: { $limit: 50 } });
      const docs = Array.isArray(list) ? list : (list?.docs ?? []);
      const form =
        docs.find((f) => f.slug === 'contact') ??
        docs.find((f) => /contact/i.test(f.title ?? f.name ?? '')) ??
        docs[0];
      if (!form) throw new AdminApiError(404, 'No form yet');
      return adminFetch(`forms/${form._id}/submissions/chart`, { query });
    }),
    series('links', () => adminFetch('links-analytics/chart', { query })),
    adminFetch('users/counts', {
      query: { previous: true, filter: query.filter },
    }).catch(() => null),
  ]);

  await detect(session.userId, { kind: 'action', action: 'reports:viewed' });
  return NextResponse.json({
    configured: true,
    from: from.toISOString(),
    to: to.toISOString(),
    series: [users, forms, links],
    counts,
  });
}

async function series(
  key: ReportSeries['key'],
  load: () => Promise<unknown>
): Promise<ReportSeries> {
  try {
    const points = normalize(await load());
    return {
      key,
      points,
      total: points.reduce((n, p) => n + p.value, 0),
      error: null,
    };
  } catch (error) {
    return {
      key,
      points: [],
      total: 0,
      error: error instanceof Error ? error.message : 'Failed',
    };
  }
}

/** The chart middleware returns `{ time, value }` rows; older modules differ, so read what is there. */
function normalize(raw: unknown): ChartPoint[] {
  const rows: unknown[] = Array.isArray(raw)
    ? raw
    : raw && typeof raw === 'object'
      ? ((
          raw as {
            data?: unknown[];
            docs?: unknown[];
            labels?: string[];
            values?: number[];
          }
        ).data ??
        (raw as { docs?: unknown[] }).docs ??
        zip(raw as { labels?: string[]; values?: number[] }))
      : [];
  return rows
    .map((r) => {
      if (!r || typeof r !== 'object') return null;
      const o = r as Record<string, unknown>;
      const label = String(
        o.time ?? o.date ?? o.label ?? o._id ?? o.x ?? o.day ?? ''
      );
      const value = Number(o.count ?? o.value ?? o.y ?? o.total ?? 0);
      return label
        ? { label, value: Number.isFinite(value) ? value : 0 }
        : null;
    })
    .filter((p): p is ChartPoint => p !== null);
}

function zip(raw: { labels?: string[]; values?: number[] }): unknown[] {
  if (!Array.isArray(raw.labels) || !Array.isArray(raw.values)) return [];
  return raw.labels.map((label, i) => ({ label, value: raw.values?.[i] ?? 0 }));
}
