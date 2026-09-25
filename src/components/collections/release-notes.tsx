'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Database, RefreshCw, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Field {
  slug: string;
  title: string;
  type: string;
  required?: boolean;
}

interface View {
  collection: { _id: string; name: string; slug: string };
  version: {
    _id: string;
    name: string;
    version: number;
    live: boolean;
    fields: Field[];
  } | null;
  records: Array<{
    _id: string;
    data: Record<string, unknown>;
    createdAt: string;
  }>;
}

/**
 * Records of the live version of the `release-notes` collection. The
 * columns are the version's fields, so publishing a new version with an
 * extra field in the console adds a column here without a deploy.
 */
export function ReleaseNotes() {
  const t = useTranslations('collections');
  const [view, setView] = useState<View | null>(null);
  const [state, setState] = useState<
    'loading' | 'ready' | 'missing' | 'unconfigured'
  >('loading');
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch('/api/collections');
    if (res.status === 503) return setState('unconfigured');
    if (!res.ok) return setState('missing');
    setView((await res.json()) as View);
    setState('ready');
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const remove = async (id: string) => {
    setBusy(id);
    try {
      const res = await fetch(
        `/api/collections/records?id=${encodeURIComponent(id)}`,
        { method: 'DELETE' }
      );
      if (res.ok) {
        toast.success(t('toast.deleted'));
        await load();
      } else {
        toast.error(t('toast.deleteFailed'));
      }
    } finally {
      setBusy(null);
    }
  };

  if (state === 'loading')
    return <p className="text-muted-foreground text-sm">{t('loading')}</p>;
  if (state !== 'ready' || !view) {
    return (
      <Card>
        <CardContent className="space-y-2 pt-6 text-sm">
          <p className="font-medium">{t('missing.title')}</p>
          <p className="text-muted-foreground">
            {state === 'unconfigured'
              ? t('missing.token')
              : t('missing.collection')}
          </p>
          <code className="bg-muted block rounded px-2 py-1 font-mono text-xs">
            node scripts/seed-org.mjs collections
          </code>
        </CardContent>
      </Card>
    );
  }

  const fields = view.version?.fields ?? [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-2">
        <div>
          <CardTitle className="flex items-center gap-2 text-base">
            <Database className="h-4 w-4" /> {view.collection.name}
            <Badge variant="outline" className="font-mono text-[11px]">
              {view.collection.slug}
            </Badge>
          </CardTitle>
          <CardDescription>
            {view.version
              ? t('liveVersion', {
                  version: view.version.version,
                  name: view.version.name,
                  fields: fields.length,
                })
              : t('noLiveVersion')}
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={() => void load()}>
          <RefreshCw className="h-4 w-4" />
          <span className="sr-only">{t('refresh')}</span>
        </Button>
      </CardHeader>
      <CardContent>
        {view.records.length === 0 ? (
          <p className="text-muted-foreground py-6 text-center text-sm">
            {t('empty')}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b text-start text-xs">
                  {fields.map((f) => (
                    <th
                      key={f.slug}
                      className="py-2 pe-3 text-start font-medium"
                    >
                      {f.title}
                      <span className="ms-1 font-mono text-[10px] font-normal opacity-70">
                        {f.type}
                      </span>
                    </th>
                  ))}
                  <th className="py-2 font-medium">
                    <span className="sr-only">{t('actions')}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {view.records.map((r) => (
                  <tr key={r._id} className="border-b align-top last:border-0">
                    {fields.map((f) => (
                      <td key={f.slug} className="max-w-xs py-2 pe-3">
                        <span className="line-clamp-3">
                          {formatValue(r.data[f.slug], f.type)}
                        </span>
                      </td>
                    ))}
                    <td className="py-2 text-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={busy === r._id}
                        onClick={() => void remove(r._id)}
                        aria-label={t('delete')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-muted-foreground mt-4 text-xs">{t('hint')}</p>
      </CardContent>
    </Card>
  );
}

function formatValue(value: unknown, type: string): string {
  if (value === undefined || value === null || value === '') return '';
  if (type === 'date') {
    const d = new Date(String(value));
    return Number.isNaN(d.getTime()) ? String(value) : d.toLocaleDateString();
  }
  if (type === 'bool') return value ? '✓' : '✗';
  if (type === 'rich-text')
    return String(value)
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  return String(value);
}
