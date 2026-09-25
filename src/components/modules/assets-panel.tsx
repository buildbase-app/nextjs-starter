'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { ExternalLink, Lock, LockOpen, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NotConfigured } from './not-configured';
import type { AssetRow } from '@/app/api/assets/route';

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Files stored by the platform for this organization: upload one (the
 * server forwards it with the token), see it listed, flip it private.
 */
export function AssetsPanel() {
  const t = useTranslations('assets');
  const [assets, setAssets] = useState<AssetRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/assets');
      if (res.status === 503) {
        setConfigured(false);
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { assets: AssetRow[] };
      setAssets(data.assets);
    } catch {
      toast.error(t('loadFailed'));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void load();
  }, [load]);

  const upload = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error(t('tooLarge'));
      return;
    }
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file, file.name);
      form.append('public', 'true');
      const res = await fetch('/api/assets/upload', {
        method: 'POST',
        body: form,
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as {
          message?: string;
        };
        throw new Error(err.message ?? String(res.status));
      }
      toast.success(t('uploaded'));
      await load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('loadFailed'));
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const setVisibility = async (asset: AssetRow, makePublic: boolean) => {
    setBusy(asset._id);
    try {
      const res = await fetch(`/api/assets/${asset._id}/visibility`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ public: makePublic }),
      });
      if (!res.ok) throw new Error(String(res.status));
      toast.success(makePublic ? t('nowPublic') : t('nowPrivate'));
      await load();
    } catch {
      toast.error(t('loadFailed'));
    } finally {
      setBusy(null);
    }
  };

  if (!configured) return <NotConfigured text={t('notConfigured')} />;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Upload className="h-4 w-4" /> {t('upload')}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <input
            ref={fileRef}
            id="asset-file"
            type="file"
            accept="image/*,.pdf,.txt,.csv,.json"
            className="text-sm"
            disabled={uploading}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void upload(f);
            }}
          />
          <span className="text-muted-foreground text-xs">
            {uploading ? t('uploading') : t('limit')}
          </span>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-3 text-lg font-semibold">
          {t('gallery')}{' '}
          <span className="text-muted-foreground text-sm font-normal tabular-nums">
            {assets.length}
          </span>
        </h2>
        {loading ? (
          <p className="text-muted-foreground text-sm">…</p>
        ) : assets.length === 0 ? (
          <p className="text-muted-foreground text-sm">{t('empty')}</p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {assets.map((a) => {
              const url = a.bucket?.url;
              const isImage = a.mimeType?.startsWith('image/');
              return (
                <li
                  key={a._id}
                  className="bg-card flex flex-col overflow-hidden rounded-lg border"
                >
                  <div className="bg-muted flex aspect-video items-center justify-center overflow-hidden">
                    {isImage && url && a.public ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={url}
                        alt={a.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-muted-foreground font-mono text-xs">
                        {a.mimeType}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 p-3 text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-medium" title={a.name}>
                        {a.name}
                      </span>
                      <Badge variant={a.public ? 'secondary' : 'outline'}>
                        {a.public ? t('public') : t('private')}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-xs tabular-nums">
                      {formatBytes(a.size)}
                      {a.image?.width
                        ? ` · ${a.image.width}×${a.image.height}`
                        : ''}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {url && (
                        <Button asChild size="sm" variant="outline">
                          <a href={url} target="_blank" rel="noreferrer">
                            <ExternalLink className="h-3.5 w-3.5" />{' '}
                            {t('openUrl')}
                          </a>
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={busy === a._id}
                        onClick={() => setVisibility(a, !a.public)}
                      >
                        {a.public ? (
                          <Lock className="h-3.5 w-3.5" />
                        ) : (
                          <LockOpen className="h-3.5 w-3.5" />
                        )}
                        {a.public ? t('makePrivate') : t('makePublic')}
                      </Button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
