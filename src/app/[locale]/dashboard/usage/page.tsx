'use client';

import { useState } from 'react';
import {
  useSaaSWorkspaces,
  useAllQuotaUsage,
  useRecordUsage,
  useUsageLogs,
  WhenQuotaExhausted,
  WhenQuotaOverage,
  WhenQuotaThreshold,
} from '@buildbase/sdk/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertTriangle, TrendingUp, History, PlusCircle } from 'lucide-react';

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

function UsageLogsPanel({ workspaceId }: { workspaceId: string }) {
  const { logs, loading } = useUsageLogs(workspaceId, undefined, { limit: 10 });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <History className="h-5 w-5" />
        <div>
          <CardTitle className="text-base">Usage log</CardTitle>
          <CardDescription>
            Recent entries via <code className="text-xs">useUsageLogs()</code>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground text-sm">Loading logs…</p>
        ) : logs.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No usage logs yet. Record some usage below to see entries here.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left font-medium">Quota</th>
                  <th className="pb-2 text-right font-medium">Quantity</th>
                  <th className="hidden pb-2 text-left font-medium md:table-cell">
                    Source
                  </th>
                  <th className="pb-2 text-right font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {logs.map((log) => (
                  <tr key={log._id}>
                    <td className="py-2 font-mono text-xs">{log.quotaSlug}</td>
                    <td className="py-2 text-right font-mono text-xs">
                      {log.quantity}
                    </td>
                    <td className="text-muted-foreground hidden py-2 text-xs md:table-cell">
                      {log.source ?? '—'}
                    </td>
                    <td className="text-muted-foreground py-2 text-right text-xs">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function RecordUsagePanel({ workspaceId }: { workspaceId: string }) {
  const { recordUsage, loading } = useRecordUsage(workspaceId);
  const [slug, setSlug] = useState('');
  const [qty, setQty] = useState('1');
  const [msg, setMsg] = useState('');

  const handleRecord = async () => {
    const quantity = parseInt(qty, 10);
    if (!slug.trim() || isNaN(quantity) || quantity <= 0) return;
    setMsg('');
    try {
      await recordUsage({ quotaSlug: slug.trim(), quantity });
      setMsg(`Recorded ${quantity} unit(s) for "${slug}".`);
    } catch {
      setMsg('Failed to record usage.');
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <PlusCircle className="h-5 w-5" />
        <div>
          <CardTitle className="text-base">Record usage</CardTitle>
          <CardDescription>
            Manually record via{' '}
            <code className="text-xs">useRecordUsage()</code>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            placeholder="quota slug (e.g. api_calls)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="flex-1"
          />
          <Input
            type="number"
            placeholder="quantity"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="w-28"
            min="1"
          />
          <Button onClick={handleRecord} disabled={loading || !slug.trim()}>
            {loading ? 'Recording…' : 'Record'}
          </Button>
        </div>
        {msg && (
          <p
            className={`text-sm ${msg.startsWith('Failed') ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}
          >
            {msg}
          </p>
        )}
      </CardContent>
    </Card>
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
          Live quota consumption via{' '}
          <code className="text-xs">useAllQuotaUsage()</code>,{' '}
          <code className="text-xs">useRecordUsage()</code>,{' '}
          <code className="text-xs">useUsageLogs()</code>
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
            const pct =
              q.included > 0 ? Math.round((q.consumed / q.included) * 100) : 0;

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

                  {/* 80% threshold warning */}
                  <WhenQuotaThreshold slug={slug} threshold={80}>
                    <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400">
                      <AlertTriangle className="h-4 w-4 shrink-0" />
                      <span>
                        Over 80% used ({pct}%) — WhenQuotaThreshold fired
                      </span>
                    </div>
                  </WhenQuotaThreshold>

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

      {/* Record usage */}
      {currentWorkspace?._id && (
        <RecordUsagePanel workspaceId={currentWorkspace._id} />
      )}

      {/* Usage logs */}
      {currentWorkspace?._id && (
        <UsageLogsPanel workspaceId={currentWorkspace._id} />
      )}
    </div>
  );
}
