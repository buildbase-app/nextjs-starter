'use client';

import { useTranslations } from 'next-intl';
import {
  useSaaSWorkspaces,
  useSubscription,
  useAllQuotaUsage,
  useSeatStatus,
  useCreditTransactions,
} from '@buildbase/sdk/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Users, Zap } from 'lucide-react';

function MiniBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="bg-muted h-2 w-full rounded-full">
      <div
        className={`h-2 rounded-full transition-all ${color}`}
        style={{ width: `${Math.min(pct, 100)}%` }}
      />
    </div>
  );
}

export default function AnalyticsPage() {
  const t = useTranslations('analytics');
  const { currentWorkspace } = useSaaSWorkspaces();
  const { subscription, loading: subLoading } = useSubscription(
    currentWorkspace?._id ?? ''
  );
  const { quotas, loading: quotaLoading } = useAllQuotaUsage(
    currentWorkspace?._id ?? ''
  );
  const seatStatus = useSeatStatus(currentWorkspace ?? null);
  const { transactions, loading: txLoading } = useCreditTransactions(
    currentWorkspace?._id ?? ''
  );

  const slugs = quotas ? Object.keys(quotas) : [];
  const totalConsumed = slugs.reduce(
    (acc, s) => acc + (quotas?.[s]?.consumed ?? 0),
    0
  );
  const creditDebits = transactions.filter((tx) => tx.amount < 0).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>{t('cards.plan')}</CardDescription>
            <Zap className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {subLoading ? t('loading') : (subscription?.plan?.name ?? 'None')}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              {subscription?.subscription?.subscriptionStatus ??
                t('cards.noSubscription')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>{t('cards.teamMembers')}</CardDescription>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{seatStatus.memberCount}</p>
            <p className="text-muted-foreground mt-1 text-xs">
              {seatStatus.maxUsers === 0
                ? t('cards.unlimitedSeats')
                : t('cards.maxSeats', { n: seatStatus.maxUsers })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>{t('cards.quotasTracked')}</CardDescription>
            <BarChart3 className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {quotaLoading ? t('loading') : slugs.length}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              {t('cards.totalConsumed', { n: totalConsumed.toLocaleString() })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>{t('cards.creditDebits')}</CardDescription>
            <TrendingUp className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {txLoading ? t('loading') : creditDebits}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              {t('cards.consumptionEvents')}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {t('quotaConsumption.title')}
          </CardTitle>
          <CardDescription>
            <code className="text-xs">useAllQuotaUsage()</code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {quotaLoading ? (
            <p className="text-muted-foreground text-sm">{t('loading')}</p>
          ) : slugs.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {t('quotaConsumption.empty')}
            </p>
          ) : (
            <div className="space-y-4">
              {slugs.map((slug) => {
                const q = quotas![slug];
                const pct =
                  q.included > 0
                    ? Math.round((q.consumed / q.included) * 100)
                    : 0;
                const color =
                  pct >= 100
                    ? 'bg-red-500'
                    : pct >= 80
                      ? 'bg-amber-500'
                      : 'bg-green-500';
                return (
                  <div key={slug} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-mono text-xs">{slug}</span>
                      <span className="text-muted-foreground text-xs">
                        {q.consumed.toLocaleString()} /{' '}
                        {q.included.toLocaleString()} ({pct}%)
                      </span>
                    </div>
                    <MiniBar pct={pct} color={color} />
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('featureFlags.title')}</CardTitle>
          <CardDescription>
            <code className="text-xs">currentWorkspace.features</code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!currentWorkspace?.features ||
          Object.keys(currentWorkspace.features).length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {t('featureFlags.empty')}
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {Object.entries(currentWorkspace.features).map(
                ([key, enabled]) => (
                  <Badge
                    key={key}
                    variant={enabled ? 'default' : 'secondary'}
                    className="font-mono text-xs"
                  >
                    {key}
                  </Badge>
                )
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('planLimits.title')}</CardTitle>
          <CardDescription>
            <code className="text-xs">currentWorkspace.limits</code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!currentWorkspace?.limits ||
          Object.keys(currentWorkspace.limits).length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {t('planLimits.empty')}
            </p>
          ) : (
            <div className="divide-y">
              {Object.entries(currentWorkspace.limits).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-2 text-sm"
                >
                  <span className="font-mono text-xs">{key}</span>
                  <span className="text-muted-foreground text-xs">
                    {value === null
                      ? t('planLimits.unlimited')
                      : value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
