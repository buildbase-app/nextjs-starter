'use client';

import {
  useSaaSWorkspaces,
  useAllQuotaUsage,
  WhenQuotaExhausted,
  WhenQuotaOverage,
} from '@buildbase/sdk/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingUp } from 'lucide-react';

function QuotaBar({
  consumed,
  included,
}: {
  consumed: number;
  included: number;
}) {
  const pct =
    included > 0 ? Math.min(Math.round((consumed / included) * 100), 100) : 0;
  const color =
    pct >= 100 ? 'bg-red-500' : pct >= 80 ? 'bg-amber-500' : 'bg-green-500';
  return (
    <div className="space-y-1">
      <div className="bg-muted h-2 w-full rounded-full">
        <div
          className={`h-2 rounded-full transition-all ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-muted-foreground text-xs">
        {consumed.toLocaleString()} / {included.toLocaleString()} used ({pct}%)
      </p>
    </div>
  );
}

export default function UsagePage() {
  const { currentWorkspace } = useSaaSWorkspaces();
  const { quotas, loading, error } = useAllQuotaUsage(
    currentWorkspace?._id ?? ''
  );

  const slugs = quotas ? Object.keys(quotas) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quota Usage</h1>
        <p className="text-muted-foreground">
          Live quota consumption pulled via{' '}
          <code className="text-xs">useAllQuotaUsage()</code>
        </p>
      </div>

      {loading && (
        <p className="text-muted-foreground text-sm">Loading quotas...</p>
      )}

      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <CardContent className="pt-6">
            <p className="text-sm text-red-700 dark:text-red-300">
              Failed to load quota data.
            </p>
          </CardContent>
        </Card>
      )}

      {!loading && !error && slugs.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm">
              No quotas configured for this workspace.
            </p>
          </CardContent>
        </Card>
      )}

      {slugs.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {slugs.map((slug) => {
            const q = quotas![slug];
            const isExhausted = q.available !== undefined && q.available <= 0;
            const isOverage = q.hasOverage;

            return (
              <Card key={slug} className={isExhausted ? 'border-red-200' : ''}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-mono text-sm">{slug}</CardTitle>
                    <div className="flex gap-1.5">
                      {isExhausted && (
                        <Badge variant="destructive" className="text-xs">
                          Exhausted
                        </Badge>
                      )}
                      {isOverage && (
                        <Badge
                          variant="outline"
                          className="border-amber-400 text-xs text-amber-700"
                        >
                          Overage
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription>
                    {q.available !== undefined
                      ? `${q.available.toLocaleString()} remaining`
                      : 'Unlimited'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <QuotaBar consumed={q.consumed} included={q.included} />

                  {/* Overage warning */}
                  <WhenQuotaOverage slug={slug}>
                    <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400">
                      <TrendingUp className="h-4 w-4 shrink-0" />
                      <span>
                        In overage by {q.overage?.toLocaleString() ?? 0} units
                        {q.allowOverage ? ' (allowed)' : ''}
                      </span>
                    </div>
                  </WhenQuotaOverage>

                  {/* Exhausted gate demo */}
                  <WhenQuotaExhausted slug={slug}>
                    <div className="flex items-center gap-2 text-sm text-red-700 dark:text-red-400">
                      <AlertTriangle className="h-4 w-4 shrink-0" />
                      <span>
                        Quota exhausted — actions using this quota are blocked
                      </span>
                    </div>
                  </WhenQuotaExhausted>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
