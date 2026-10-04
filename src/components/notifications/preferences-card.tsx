'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Lock, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Channel = 'email' | 'push';
interface Default {
  email?: boolean;
  push?: boolean;
  required?: boolean;
}
interface Prefs {
  events: { slug: string; name: string; description?: string }[];
  defaults: Record<string, Default>;
  mine: Record<string, { email?: boolean; push?: boolean }>;
}

/**
 * Each member's own channels per notification type, over the workspace
 * defaults. The platform reads the member's choice first, then the default;
 * a type the workspace marked required cannot be changed (409).
 */
export function PreferencesCard({ workspaceId }: { workspaceId?: string }) {
  const t = useTranslations('account.preferences');
  const [prefs, setPrefs] = useState<Prefs | null>(null);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);

  const [reload, setReload] = useState(0);

  useEffect(() => {
    if (!workspaceId) return;
    let cancelled = false;
    fetch(`/api/notifications/preferences?workspaceId=${workspaceId}`)
      .then(async (res) => {
        if (cancelled) return;
        setError(!res.ok);
        if (res.ok) setPrefs(await res.json());
      })
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, [workspaceId, reload]);

  const save = async (
    slug: string,
    channel: Channel,
    value: boolean | null
  ) => {
    setSaving(slug);
    const res = await fetch('/api/notifications/preferences', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workspaceId,
        preferences: { [slug]: { [channel]: value } },
      }),
    });
    setSaving(null);
    if (!res.ok) {
      toast.error(res.status === 409 ? t('required') : t('failed'));
      return;
    }
    // PATCH answers defaults and choices; the event list does not change.
    const saved = (await res.json()) as Omit<Prefs, 'events'>;
    setPrefs((prev) => ({ events: prev?.events ?? [], ...saved }));
    toast.success(t('saved'));
  };

  // Every event the member may manage, plus any the workspace configured.
  const names = new Map(
    (prefs?.events ?? []).map((e) => [e.slug, e.name] as const)
  );
  const slugs = prefs
    ? [...new Set([...names.keys(), ...Object.keys(prefs.defaults)])].sort()
    : [];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <SlidersHorizontal className="h-5 w-5" />
        <div>
          <CardTitle className="text-base">{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-sm text-red-600">{t('failed')}</p>
        ) : !prefs ? (
          <p className="text-muted-foreground text-sm">{t('loading')}</p>
        ) : slugs.length === 0 ? (
          <p className="text-muted-foreground text-sm">{t('empty')}</p>
        ) : (
          <div className="divide-y">
            {slugs.map((slug) => {
              const def = prefs.defaults[slug] ?? {};
              const mine = prefs.mine[slug] ?? {};
              return (
                <div
                  key={slug}
                  className="flex flex-wrap items-center justify-between gap-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{names.get(slug) ?? slug}</span>
                    <span className="text-muted-foreground font-mono text-xs">
                      {slug}
                    </span>
                    {def.required && (
                      <Badge variant="secondary" className="gap-1 text-xs">
                        <Lock className="h-3 w-3" />
                        {t('requiredBadge')}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    {(['email', 'push'] as const).map((channel) => {
                      const own = mine[channel];
                      const effective = own ?? def[channel] !== false;
                      return (
                        <label
                          key={channel}
                          className="flex items-center gap-1.5 text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={effective}
                            disabled={!!def.required || saving === slug}
                            onChange={(e) =>
                              save(slug, channel, e.target.checked)
                            }
                          />
                          {t(channel)}
                          {own !== undefined && !def.required && (
                            <button
                              type="button"
                              title={t('useDefault')}
                              aria-label={t('useDefault')}
                              disabled={saving === slug}
                              onClick={() => save(slug, channel, null)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <RotateCcw className="h-3 w-3" />
                            </button>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="mt-2"
          disabled={!workspaceId}
          onClick={() => setReload((n) => n + 1)}
        >
          {t('refresh')}
        </Button>
      </CardContent>
    </Card>
  );
}
