'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('usage');
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
        {consumed.toLocaleString()} / {included.toLocaleString()}{' '}
        {t('quotaCard.used')} ({pct}%)
      </p>
    </div>
  );
}

function UsageLogsPanel({ workspaceId }: { workspaceId: string }) {
  const t = useTranslations('usage');
  const { logs, loading } = useUsageLogs(workspaceId, undefined, { limit: 10 });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <History className="h-5 w-5" />
        <div>
          <CardTitle className="text-base">{t('logs.title')}</CardTitle>
          <CardDescription>{t('logs.description')}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-muted-foreground text-sm">{t('logs.loading')}</p>
        ) : logs.length === 0 ? (
          <p className="text-muted-foreground text-sm">{t('logs.empty')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="pb-2 text-left font-medium">
                    {t('logs.table.quota')}
                  </th>
                  <th className="pb-2 text-right font-medium">
                    {t('logs.table.quantity')}
                  </th>
                  <th className="hidden pb-2 text-left font-medium md:table-cell">
                    {t('logs.table.source')}
                  </th>
                  <th className="pb-2 text-right font-medium">
                    {t('logs.table.date')}
                  </th>
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
  const t = useTranslations('usage');
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
      setMsg(t('record.success', { qty: quantity, slug: slug.trim() }));
    } catch {
      setMsg(t('record.failed'));
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <PlusCircle className="h-5 w-5" />
        <div>
          <CardTitle className="text-base">{t('record.title')}</CardTitle>
          <CardDescription>{t('record.description')}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            placeholder={t('record.slugPlaceholder')}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="flex-1"
          />
          <Input
            type="number"
            placeholder={t('record.qtyPlaceholder')}
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="w-28"
            min="1"
          />
          <Button onClick={handleRecord} disabled={loading || !slug.trim()}>
            {loading ? t('record.recording') : t('record.record')}
          </Button>
        </div>
        {msg && (
          <p
            className={`text-sm ${msg === t('record.failed') ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}
          >
            {msg}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function UsagePage() {
  const t = useTranslations('usage');
  const { currentWorkspace } = useSaaSWorkspaces();
  const { quotas, loading, error } = useAllQuotaUsage(
    currentWorkspace?._id ?? ''
  );

  const slugs = quotas ? Object.keys(quotas) : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      {loading && (
        <p className="text-muted-foreground text-sm">{t('loading')}</p>
      )}

      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <CardContent className="pt-6">
            <p className="text-sm text-red-700 dark:text-red-300">
              {t('error')}
            </p>
          </CardContent>
        </Card>
      )}

      {!loading && !error && slugs.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-sm">{t('empty')}</p>
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
                          {t('quotaCard.exhausted')}
                        </Badge>
                      )}
                      {isOverage && (
                        <Badge
                          variant="outline"
                          className="border-amber-400 text-xs text-amber-700"
                        >
                          {t('quotaCard.overage')}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription>
                    {q.available !== undefined
                      ? t('quotaCard.remaining', {
                          count: q.available.toLocaleString(),
                        })
                      : t('quotaCard.unlimited')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <QuotaBar consumed={q.consumed} included={q.included} />

                  <WhenQuotaThreshold slug={slug} threshold={80}>
                    <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400">
                      <AlertTriangle className="h-4 w-4 shrink-0" />
                      <span>{t('quotaCard.threshold', { pct })}</span>
                    </div>
                  </WhenQuotaThreshold>

                  <WhenQuotaOverage slug={slug}>
                    <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400">
                      <TrendingUp className="h-4 w-4 shrink-0" />
                      <span>
                        {t('quotaCard.overageMsg', {
                          count: q.overage?.toLocaleString() ?? 0,
                        })}
                        {q.allowOverage
                          ? ` ${t('quotaCard.overageAllowed')}`
                          : ''}
                      </span>
                    </div>
                  </WhenQuotaOverage>

                  <WhenQuotaExhausted slug={slug}>
                    <div className="flex items-center gap-2 text-sm text-red-700 dark:text-red-400">
                      <AlertTriangle className="h-4 w-4 shrink-0" />
                      <span>{t('quotaCard.exhaustedMsg')}</span>
                    </div>
                  </WhenQuotaExhausted>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {currentWorkspace?._id && (
        <RecordUsagePanel workspaceId={currentWorkspace._id} />
      )}

      {currentWorkspace?._id && (
        <UsageLogsPanel workspaceId={currentWorkspace._id} />
      )}
    </div>
  );
}
