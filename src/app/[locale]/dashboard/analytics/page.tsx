'use client';

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
  const creditDebits = transactions.filter((t) => t.amount < 0).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Workspace metrics pulled live from the BuildBase SDK
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Plan</CardDescription>
            <Zap className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {subLoading ? '…' : (subscription?.plan?.name ?? 'None')}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              {subscription?.subscription?.subscriptionStatus ??
                'no subscription'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Team members</CardDescription>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{seatStatus.memberCount}</p>
            <p className="text-muted-foreground mt-1 text-xs">
              {seatStatus.maxUsers === 0
                ? 'unlimited seats'
                : `${seatStatus.maxUsers} max seats`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Quotas tracked</CardDescription>
            <BarChart3 className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {quotaLoading ? '…' : slugs.length}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              {totalConsumed.toLocaleString()} total units consumed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Credit debits</CardDescription>
            <TrendingUp className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {txLoading ? '…' : creditDebits}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              consumption events recorded
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quota consumption</CardTitle>
          <CardDescription>
            Per-quota usage from{' '}
            <code className="text-xs">useAllQuotaUsage()</code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {quotaLoading ? (
            <p className="text-muted-foreground text-sm">Loading…</p>
          ) : slugs.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No quotas configured for this workspace.
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
          <CardTitle className="text-base">Workspace feature flags</CardTitle>
          <CardDescription>
            Feature states from{' '}
            <code className="text-xs">currentWorkspace.features</code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!currentWorkspace?.features ||
          Object.keys(currentWorkspace.features).length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No feature flags configured.
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
          <CardTitle className="text-base">Plan limits</CardTitle>
          <CardDescription>
            Limits snapshot from{' '}
            <code className="text-xs">currentWorkspace.limits</code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!currentWorkspace?.limits ||
          Object.keys(currentWorkspace.limits).length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No plan limits configured.
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
                    {value === null ? 'unlimited' : value.toLocaleString()}
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
