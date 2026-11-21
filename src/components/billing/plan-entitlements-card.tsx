'use client';

import { useTranslations } from 'next-intl';
import {
  useEntitlement,
  useLimit,
  useSaaSAuth,
  useSaaSWorkspaces,
  WhenEntitled,
} from '@buildbase/sdk/react';
import { CheckCircle2, CircleHelp, Download, Lock } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

/**
 * The slugs this demo's plans carry in the console's catalog: three features,
 * the `documents` quota and the `max-users` limit. Your own plans name your
 * own slugs; nothing here is special to BuildBase.
 */
const FEATURE_SLUGS = ['advanced-exports', 'document-sharing', 'e-signatures'];
const QUOTA_SLUG = 'documents';
const LIMIT_SLUG = 'max-users';

type T = ReturnType<typeof useTranslations<'entitlements'>>;

function StateBadge({ state, t }: { state: string; t: T }) {
  if (state === 'granted') {
    return (
      <Badge className="gap-1">
        <CheckCircle2 className="h-3 w-3" />
        {t('state.granted')}
      </Badge>
    );
  }
  if (state === 'locked') {
    return (
      <Badge variant="secondary" className="gap-1">
        <Lock className="h-3 w-3" />
        {t('state.locked')}
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="gap-1">
      <CircleHelp className="h-3 w-3" />
      {t('state.unknown')}
    </Badge>
  );
}

/** One slug, one hook call: `useEntitlement` answers features and quotas alike. */
function EntitlementRow({ slug, t }: { slug: string; t: T }) {
  const e = useEntitlement(slug);
  let detail = '—';
  if (e.kind === 'quota') {
    detail = e.unlimited
      ? t('detail.unlimited')
      : t('detail.quota', {
          used: e.used ?? 0,
          limit: e.limit ?? 0,
          remaining: e.remaining ?? 0,
        });
  }
  return (
    <tr className="border-b last:border-0" data-slug={slug}>
      <td className="py-2 pr-3 font-mono text-xs">{slug}</td>
      <td className="text-muted-foreground px-3 py-2 text-xs">
        {e.loading ? '…' : t(`kind.${e.kind}`)}
      </td>
      <td className="px-3 py-2">
        {e.loading ? '…' : <StateBadge state={e.state} t={t} />}
      </td>
      <td className="text-muted-foreground px-3 py-2 text-xs">{detail}</td>
      <td className="text-muted-foreground py-2 pl-3 text-xs">
        {e.source ? t(`source.${e.source}`) : '—'}
      </td>
    </tr>
  );
}

/** A limit needs the count you have now: the workspace's members here. */
function LimitRow({ current, t }: { current: number; t: T }) {
  const l = useLimit(LIMIT_SLUG, { current });
  const detail = l.loading
    ? '…'
    : l.unlimited
      ? t('detail.unlimited')
      : l.limit === null
        ? '—'
        : t('detail.limit', {
            used: current,
            limit: l.limit,
            remaining: l.remaining ?? 0,
          });
  return (
    <tr className="border-b last:border-0" data-slug={LIMIT_SLUG}>
      <td className="py-2 pr-3 font-mono text-xs">{LIMIT_SLUG}</td>
      <td className="text-muted-foreground px-3 py-2 text-xs">
        {t('kind.limit')}
      </td>
      <td className="px-3 py-2">
        {l.loading ? (
          '…'
        ) : l.reached ? (
          <Badge variant="destructive">{t('pressure.reached')}</Badge>
        ) : l.pressure === 'nearing' ? (
          <Badge variant="secondary">{t('pressure.nearing')}</Badge>
        ) : (
          <StateBadge state={l.limit === null ? 'unknown' : 'granted'} t={t} />
        )}
      </td>
      <td className="text-muted-foreground px-3 py-2 text-xs">{detail}</td>
      <td className="text-muted-foreground py-2 pl-3 text-xs">
        {l.source ? t(`source.${l.source}`) : '—'}
      </td>
    </tr>
  );
}

/**
 * Entitlement checks by slug: what the workspace's plan (plus any add-on or
 * grant on top) allows, answered by the server's composed entitlement rather
 * than by reading plan names. `useEntitlement` and `useLimit` fail open: only
 * an explicit no locks, and nothing locks while loading.
 */
export function PlanEntitlementsCard() {
  const t = useTranslations('entitlements');
  const { currentWorkspace } = useSaaSWorkspaces();
  const { openPlanPicker } = useSaaSAuth();
  const members = currentWorkspace?.users?.length ?? 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t('title')}</CardTitle>
        <CardDescription>
          {t('description')}{' '}
          <code className="text-xs">useEntitlement(slug)</code>,{' '}
          <code className="text-xs">useLimit(slug, {'{ current }'})</code>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-b text-left text-xs">
                <th className="py-2 pr-3 font-medium">{t('columns.slug')}</th>
                <th className="px-3 py-2 font-medium">{t('columns.kind')}</th>
                <th className="px-3 py-2 font-medium">{t('columns.answer')}</th>
                <th className="px-3 py-2 font-medium">{t('columns.detail')}</th>
                <th className="py-2 pl-3 font-medium">{t('columns.source')}</th>
              </tr>
            </thead>
            <tbody>
              {FEATURE_SLUGS.map((slug) => (
                <EntitlementRow key={slug} slug={slug} t={t} />
              ))}
              <EntitlementRow slug={QUOTA_SLUG} t={t} />
              <LimitRow current={members} t={t} />
            </tbody>
          </table>
        </div>

        <div className="border-border flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4">
          <div>
            <p className="text-sm font-medium">{t('gate.title')}</p>
            <p className="text-muted-foreground text-xs">
              <code>{'<WhenEntitled slug="advanced-exports">'}</code>
            </p>
          </div>
          <WhenEntitled
            slug="advanced-exports"
            fallbackComponent={
              <Button size="sm" variant="outline" onClick={openPlanPicker}>
                <Lock className="mr-2 h-4 w-4" />
                {t('gate.upgrade')}
              </Button>
            }
          >
            <span className="flex items-center gap-1.5 text-sm text-green-700 dark:text-green-400">
              <Download className="h-4 w-4" />
              {t('gate.included')}
            </span>
          </WhenEntitled>
        </div>
      </CardContent>
    </Card>
  );
}
