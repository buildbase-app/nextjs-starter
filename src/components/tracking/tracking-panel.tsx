'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { useTracking } from '@buildbase/sdk/tracking';
import { openCookieChoices } from '@/components/cookie-consent';
import { Activity, Check, Radio, ShieldCheck, Compass } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getTrackingEvents, subscribeTrackingEvents } from '@/lib/tracking-bus';

const EMPTY: never[] = [];

/**
 * Everything the tracking module exposes to an app, on one page: the
 * consent manifest (built from what is installed, never from the org's
 * whole library), which providers loaded, a custom event, the live log of
 * what the SDK fired, and where this visitor came from.
 */
export function TrackingPanel() {
  const t = useTranslations('tracking');
  const { consent, track, installed, ready, attribution } = useTracking();
  const events = useSyncExternalStore(
    subscribeTrackingEvents,
    getTrackingEvents,
    () => EMPTY
  );
  const [fired, setFired] = useState(0);
  const [tick, setTick] = useState(0);
  // The log is a mutable array; re-render on every push.
  useEffect(() => subscribeTrackingEvents(() => setTick((n) => n + 1)), []);
  void tick;

  const state = consent.state;

  const fire = async () => {
    const n = fired + 1;
    setFired(n);
    track('report_exported', { format: 'csv', rows: 42 * n, source: 'tour' });
    await fetch('/api/tracking/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'report_exported' }),
    }).catch(() => {});
  };

  const installedKeys = Object.keys(installed);
  const attributionEntries = Object.entries(attribution).filter(([, v]) => v);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              <div>
                <CardTitle className="text-base">
                  {t('consent.title')}
                </CardTitle>
                <CardDescription>{t('consent.description')}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {consent.manifest.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                {ready ? t('consent.noTags') : t('loading')}
              </p>
            ) : (
              <ul className="divide-y rounded-lg border">
                {consent.manifest.map((entry) => (
                  <li
                    key={entry.key}
                    className="flex items-center justify-between gap-3 px-3 py-2 text-sm"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{entry.name}</p>
                      <p className="text-muted-foreground truncate text-xs">
                        {entry.vendor}
                        {entry.privacyUrl && (
                          <>
                            {' · '}
                            <a
                              href={entry.privacyUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="underline-offset-4 hover:underline"
                            >
                              {t('consent.privacy')}
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {t(`consent.${entry.category}`)}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
            {/* One consent system: the banner writes the SDK's state, this
                reads it. Changing it reopens the same banner. */}
            <Button size="sm" variant="outline" onClick={openCookieChoices}>
              {t('consent.change')}
            </Button>
            <p className="text-muted-foreground text-xs">
              {t('consent.state')}:{' '}
              <code className="font-mono">
                {state
                  ? `analytics=${state.analytics} marketing=${state.marketing}`
                  : t('consent.unset')}
              </code>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Radio className="h-5 w-5" />
              <div>
                <CardTitle className="text-base">
                  {t('installed.title')}
                </CardTitle>
                <CardDescription>{t('installed.description')}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {installedKeys.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                {ready ? t('installed.none') : t('loading')}
              </p>
            ) : (
              <ul className="flex flex-wrap gap-2">
                {installedKeys.map((key) => (
                  <li key={key}>
                    <Badge>
                      <Check className="h-3 w-3" /> {installed[key]}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
            <div className="rounded-lg border p-3">
              <p className="text-sm font-medium">{t('custom.title')}</p>
              <p className="text-muted-foreground mb-3 text-xs">
                {t('custom.description')}
              </p>
              <Button size="sm" onClick={fire}>
                <Activity className="h-4 w-4" /> {t('custom.button')}
              </Button>
              {fired > 0 && (
                <p className="text-muted-foreground mt-2 text-xs tabular-nums">
                  {t('custom.fired', { count: fired })}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Compass className="h-5 w-5" />
            <div>
              <CardTitle className="text-base">
                {t('attribution.title')}
              </CardTitle>
              <CardDescription>{t('attribution.description')}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {attributionEntries.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {t('attribution.empty')}{' '}
              <code className="font-mono text-xs">
                ?utm_source=demo&amp;utm_campaign=tour
              </code>
            </p>
          ) : (
            <dl className="grid gap-2 sm:grid-cols-2">
              {attributionEntries.map(([k, v]) => (
                <div key={k} className="flex gap-2 text-sm">
                  <dt className="text-muted-foreground font-mono text-xs">
                    {k}
                  </dt>
                  <dd className="truncate font-mono text-xs">{v}</dd>
                </div>
              ))}
            </dl>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{t('log.title')}</CardTitle>
          <CardDescription>{t('log.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <p className="text-muted-foreground py-6 text-center text-sm">
              {t('log.empty')}
            </p>
          ) : (
            <ul className="divide-y rounded-lg border font-mono text-xs">
              {events.map((e) => (
                <li key={e.eventId + e.at} className="px-3 py-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{e.name}</span>
                    <span className="text-muted-foreground">
                      {e.handledBy} · {new Date(e.at).toLocaleTimeString()}
                    </span>
                  </div>
                  <pre className="text-muted-foreground mt-1 overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(e.params)}
                  </pre>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
