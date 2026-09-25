'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSaaSWorkspaces } from '@buildbase/sdk/react';
import { ChevronDown, RefreshCw, ShieldCheck, Webhook } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WebhookRow {
  id: string;
  event: string;
  timestamp: number;
  workspaceId: string | null;
  userId: string | null;
  payload: unknown;
  receivedAt: string;
}

/**
 * Webhooks the platform delivered to this app for the current workspace.
 * Every row here passed the signature check in /api/webhooks/buildbase;
 * a forged delivery is refused before it is stored, so there is nothing
 * unverified to show.
 */
export function WebhookEventsCard() {
  const t = useTranslations('events');
  const { currentWorkspace } = useSaaSWorkspaces();
  const workspaceId = currentWorkspace?._id;
  const [rows, setRows] = useState<WebhookRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!workspaceId) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/webhooks/list?workspaceId=${encodeURIComponent(workspaceId)}`
      );
      if (!res.ok) return;
      const data = (await res.json()) as { events: WebhookRow[] };
      setRows(data.events);
    } finally {
      setLoading(false);
    }
  }, [workspaceId]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Webhook className="h-5 w-5" />
          <div>
            <CardTitle className="text-base">{t('webhooks.title')}</CardTitle>
            <CardDescription>{t('webhooks.description')}</CardDescription>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
          <span className="sr-only">{t('webhooks.refresh')}</span>
        </Button>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center text-sm">
            {t('webhooks.empty')}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b text-left text-xs">
                  <th className="py-2 pr-3 font-medium">
                    {t('webhooks.event')}
                  </th>
                  <th className="py-2 pr-3 font-medium">
                    {t('webhooks.when')}
                  </th>
                  <th className="py-2 pr-3 font-medium">
                    {t('webhooks.received')}
                  </th>
                  <th className="py-2 pr-3 font-medium">
                    {t('webhooks.signature')}
                  </th>
                  <th className="py-2 font-medium">
                    <span className="sr-only">{t('webhooks.payload')}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const isOpen = open === row.id;
                  return (
                    <tr
                      key={row.id}
                      className="group border-b align-top last:border-0"
                    >
                      <td className="py-2 pr-3">
                        <Badge variant="outline" className="font-mono text-xs">
                          {row.event}
                        </Badge>
                        {isOpen && (
                          <pre className="bg-muted mt-2 max-w-xl overflow-x-auto rounded-md p-2 font-mono text-xs">
                            {JSON.stringify(row.payload, null, 2)}
                          </pre>
                        )}
                      </td>
                      <td className="text-muted-foreground py-2 pr-3 text-xs whitespace-nowrap tabular-nums">
                        {new Date(row.timestamp * 1000).toLocaleString()}
                      </td>
                      <td className="text-muted-foreground py-2 pr-3 text-xs whitespace-nowrap tabular-nums">
                        {new Date(row.receivedAt).toLocaleTimeString()}
                      </td>
                      <td className="py-2 pr-3">
                        <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          {t('webhooks.verified')}
                        </span>
                      </td>
                      <td className="py-2 text-right">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-label={t('webhooks.payload')}
                          onClick={() => setOpen(isOpen ? null : row.id)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 transition-transform',
                              isOpen && 'rotate-180'
                            )}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
