'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Copy, ExternalLink, RefreshCw, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { NotConfigured } from './not-configured';
import type { LinkRow } from '@/app/api/links/route';

interface ChartPoint {
  time?: string;
  label?: string;
  date?: string;
  x?: string;
  value?: number;
  count?: number;
  y?: number;
}

function pointsOf(chart: unknown): { label: string; value: number }[] {
  const raw = Array.isArray(chart)
    ? chart
    : ((chart as { data?: unknown[]; docs?: unknown[] } | null)?.data ??
      (chart as { docs?: unknown[] } | null)?.docs ??
      []);
  return (raw as ChartPoint[]).map((p) => ({
    label: String(p.time ?? p.label ?? p.date ?? p.x ?? ''),
    value: Number(p.value ?? p.count ?? p.y ?? 0),
  }));
}

/** Short links made from the app, with the clicks the platform counted. */
export function LinksPanel() {
  const t = useTranslations('links');
  const [links, setLinks] = useState<LinkRow[]>([]);
  const [chart, setChart] = useState<{ label: string; value: number }[]>([]);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [editing, setEditing] = useState<{ id: string; url: string } | null>(
    null
  );
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const [l, c] = await Promise.all([
        fetch('/api/links'),
        fetch('/api/links/chart'),
      ]);
      if (l.status === 503) {
        setConfigured(false);
        return;
      }
      if (l.ok) setLinks(((await l.json()) as { links: LinkRow[] }).links);
      if (c.ok)
        setChart(pointsOf(((await c.json()) as { chart: unknown }).chart));
    } catch {
      toast.error(t('loadFailed'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !url) setUrl(window.location.origin);
  }, [url]);

  const create = async () => {
    setBusy(true);
    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, url }),
      });
      if (!res.ok) throw new Error(String(res.status));
      toast.success(t('created'));
      setName('');
      await load();
    } catch {
      toast.error(t('loadFailed'));
    } finally {
      setBusy(false);
    }
  };

  const saveDestination = async () => {
    if (!editing) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/links/${editing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: editing.url }),
      });
      if (!res.ok) throw new Error(String(res.status));
      toast.success(t('updated'));
      setEditing(null);
      await load();
    } catch {
      toast.error(t('loadFailed'));
    } finally {
      setBusy(false);
    }
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t('copied'));
    } catch {
      /* clipboard refused: the URL is visible on the row */
    }
  };

  if (!configured) return <NotConfigured text={t('notConfigured')} />;

  const max = Math.max(1, ...chart.map((p) => p.value));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Link2 className="h-4 w-4" /> {t('create')}
          </CardTitle>
          <CardDescription>{t('createHint')}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 sm:flex-row">
          <Input
            id="link-name"
            placeholder={t('name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            id="link-url"
            placeholder={t('url')}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            disabled={busy || !name.trim() || !url.trim()}
            onClick={create}
          >
            {t('createButton')}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base">{t('yourLinks')}</CardTitle>
            <CardDescription>{t('clicksHint')}</CardDescription>
          </div>
          <Button size="sm" variant="outline" onClick={() => load()}>
            <RefreshCw className="h-3.5 w-3.5" /> {t('refresh')}
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground text-sm">…</p>
          ) : links.length === 0 ? (
            <p className="text-muted-foreground text-sm">{t('empty')}</p>
          ) : (
            <ul className="divide-y">
              {links.map((l) => (
                <li
                  key={l._id}
                  className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 space-y-1">
                    <p className="truncate font-medium">{l.name}</p>
                    <p className="text-muted-foreground truncate font-mono text-xs">
                      {l.shortUrl}
                    </p>
                    {editing?.id === l._id ? (
                      <div className="flex gap-2">
                        <Input
                          id={`link-dest-${l._id}`}
                          value={editing.url}
                          onChange={(e) =>
                            setEditing({ id: l._id, url: e.target.value })
                          }
                        />
                        <Button
                          size="sm"
                          disabled={busy}
                          onClick={saveDestination}
                        >
                          {t('save')}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditing(null)}
                        >
                          {t('cancel')}
                        </Button>
                      </div>
                    ) : (
                      <p className="text-muted-foreground truncate text-xs">
                        → {l.url}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-sm font-semibold tabular-nums">
                      {l.clicks}{' '}
                      <span className="text-muted-foreground font-normal">
                        {t('clicks')}
                      </span>
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copy(l.shortUrl)}
                      aria-label={t('copy')}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <a href={l.shortUrl} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-3.5 w-3.5" /> {t('follow')}
                      </a>
                    </Button>
                    {editing?.id !== l._id && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditing({ id: l._id, url: l.url })}
                      >
                        {t('changeDestination')}
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('chart')}</CardTitle>
          <CardDescription>{t('chartHint')}</CardDescription>
        </CardHeader>
        <CardContent>
          {chart.length === 0 || chart.every((p) => p.value === 0) ? (
            <p className="text-muted-foreground text-sm">{t('chartEmpty')}</p>
          ) : (
            <svg
              role="img"
              aria-label={t('chart')}
              viewBox={`0 0 ${chart.length * 28} 120`}
              className="h-32 w-full max-w-xl"
            >
              {chart.map((p, i) => {
                const h = Math.round((p.value / max) * 90);
                return (
                  <g key={p.label + i}>
                    <rect
                      x={i * 28 + 4}
                      y={100 - h}
                      width={20}
                      height={h}
                      rx={3}
                      className="fill-primary"
                    />
                    <text
                      x={i * 28 + 14}
                      y={114}
                      textAnchor="middle"
                      fontSize="8"
                      className="fill-muted-foreground"
                    >
                      {p.label.slice(0, 5)}
                    </text>
                  </g>
                );
              })}
            </svg>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
