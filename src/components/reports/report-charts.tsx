'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { PieChart, RefreshCw } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ReportSeries } from '@/app/api/reports/route';

interface Payload {
  configured: boolean;
  from?: string;
  to?: string;
  series: ReportSeries[];
  counts: Record<string, unknown> | null;
}

/**
 * Three of the platform's chart endpoints, drawn by hand: a bar per day for
 * the last thirty days. Every module reports the same way (`groupBy` and a
 * `from`/`to` window), so swapping the source is a path change.
 */
export function ReportCharts() {
  const t = useTranslations('reports');
  const [data, setData] = useState<Payload | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/reports');
      setData((await res.json()) as Payload);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const headline = flattenCounts(data?.counts ?? null);

  return (
    <div className="space-y-6">
      {data && !data.configured && (
        <Card>
          <CardContent className="text-muted-foreground py-6 text-center text-sm">
            {t('notConfigured')}
          </CardContent>
        </Card>
      )}

      {headline.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {headline.slice(0, 4).map(([k, v]) => (
            <Card key={k}>
              <CardHeader className="pb-2">
                <CardDescription>
                  {k === 'current' || k === 'previous' ? t(`counts.${k}`) : k}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold tabular-nums">{v}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {data?.from && data?.to
            ? t('window', {
                from: new Date(data.from).toLocaleDateString(),
                to: new Date(data.to).toLocaleDateString(),
              })
            : t('loading')}
        </p>
        <Button variant="ghost" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
          <span className="sr-only">{t('refresh')}</span>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {(data?.series ?? []).map((s) => (
          <Card key={s.key}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                <CardTitle className="text-base">
                  {t(`series.${s.key}.title`)}
                </CardTitle>
              </div>
              <CardDescription>
                {t(`series.${s.key}.description`)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-2xl font-bold tabular-nums">{s.total}</p>
              {s.error ? (
                <p className="text-muted-foreground text-xs">
                  {t('unavailable')}: {s.error}
                </p>
              ) : (
                <BarChart points={s.points} />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function BarChart({ points }: { points: { label: string; value: number }[] }) {
  const W = 320;
  const H = 120;
  const padB = 18;
  const max = Math.max(1, ...points.map((p) => p.value));
  const n = Math.max(1, points.length);
  const bw = W / n;
  const first = points[0]?.label ?? '';
  const last = points[points.length - 1]?.label ?? '';
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label={`${points.length} days, peak ${max}`}
    >
      <line
        x1="0"
        y1={H - padB}
        x2={W}
        y2={H - padB}
        stroke="currentColor"
        strokeOpacity="0.2"
      />
      {points.map((p, i) => {
        const h = ((H - padB - 6) * p.value) / max;
        return (
          <rect
            key={p.label + i}
            x={i * bw + 1}
            y={H - padB - h}
            width={Math.max(1, bw - 2)}
            height={h}
            rx="1"
            fill="currentColor"
            className="text-primary"
          >
            <title>{`${p.label}: ${p.value}`}</title>
          </rect>
        );
      })}
      <text x="0" y={H - 4} fontSize="9" fill="currentColor" fillOpacity="0.6">
        {first.slice(0, 10)}
      </text>
      <text
        x={W}
        y={H - 4}
        fontSize="9"
        textAnchor="end"
        fill="currentColor"
        fillOpacity="0.6"
      >
        {last.slice(0, 10)}
      </text>
    </svg>
  );
}

function flattenCounts(
  counts: Record<string, unknown> | null
): [string, string][] {
  if (!counts) return [];
  const out: [string, string][] = [];
  const walk = (obj: Record<string, unknown>, prefix: string) => {
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === 'number') out.push([prefix + k, v.toLocaleString()]);
      else if (
        v &&
        typeof v === 'object' &&
        !Array.isArray(v) &&
        out.length < 8
      )
        walk(v as Record<string, unknown>, `${prefix}${k}.`);
    }
  };
  walk(counts, '');
  return out;
}
