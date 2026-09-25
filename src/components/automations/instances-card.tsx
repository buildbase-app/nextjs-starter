'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { RefreshCw, Workflow, Webhook } from 'lucide-react';
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

interface Instance {
  id: string;
  workflow: string;
  version: number | null;
  status: string;
  event: string | null;
  startedAt: string | null;
  completedAt: string | null;
  completed: number;
  failed: number;
  current: string[];
  error: string | null;
}
interface Call {
  id: string;
  payload: unknown;
  receivedAt: string;
}
interface Payload {
  configured: boolean;
  error?: string;
  instances: Instance[];
  calls: Call[];
}

const STATUS_STYLE: Record<string, string> = {
  running: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200',
  completed:
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200',
  failed: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200',
  paused: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200',
};

/**
 * Your workflow runs. There is no "trigger a workflow" call: the app causes
 * events (a sign-up, a form submission) and the platform runs whatever is
 * published for them. This lists what ran for you, and the calls a workflow
 * made back into this app.
 */
export function InstancesCard() {
  const t = useTranslations('automations');
  const [data, setData] = useState<Payload | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/automations');
      const body = (await res.json()) as Payload;
      setData(body);
    } catch {
      setData({ configured: true, error: 'network', instances: [], calls: [] });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <Workflow className="h-5 w-5" />
            <div>
              <CardTitle className="text-base">{t('runs.title')}</CardTitle>
              <CardDescription>{t('runs.description')}</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
            <span className="sr-only">{t('refresh')}</span>
          </Button>
        </CardHeader>
        <CardContent>
          {data && !data.configured ? (
            <p className="text-muted-foreground py-6 text-center text-sm">
              {t('notConfigured')}
            </p>
          ) : data?.error ? (
            <p className="text-destructive py-6 text-center text-sm">
              {t('error')}: {data.error}
            </p>
          ) : !data || data.instances.length === 0 ? (
            <p className="text-muted-foreground py-6 text-center text-sm">
              {loading ? t('loading') : t('runs.empty')}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-muted-foreground text-left text-xs">
                  <tr>
                    <th className="py-2 pr-3 font-medium">
                      {t('runs.workflow')}
                    </th>
                    <th className="py-2 pr-3 font-medium">{t('runs.event')}</th>
                    <th className="py-2 pr-3 font-medium">
                      {t('runs.status')}
                    </th>
                    <th className="py-2 pr-3 font-medium">{t('runs.nodes')}</th>
                    <th className="py-2 font-medium">{t('runs.started')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {data.instances.map((i) => (
                    <tr key={i.id}>
                      <td className="py-2 pr-3 font-medium">
                        {i.workflow}
                        {i.version != null && (
                          <span className="text-muted-foreground ml-1 text-xs">
                            v{i.version}
                          </span>
                        )}
                      </td>
                      <td className="py-2 pr-3 font-mono text-xs">{i.event}</td>
                      <td className="py-2 pr-3">
                        <Badge
                          variant="outline"
                          className={cn(
                            'border-transparent',
                            STATUS_STYLE[i.status]
                          )}
                        >
                          {i.status}
                        </Badge>
                        {i.error && (
                          <p className="text-destructive mt-1 text-xs">
                            {i.error}
                          </p>
                        )}
                      </td>
                      <td className="py-2 pr-3 tabular-nums">
                        {i.completed}
                        {i.failed > 0 && (
                          <span className="text-destructive">
                            {' '}
                            / {i.failed}
                          </span>
                        )}
                      </td>
                      <td className="py-2 whitespace-nowrap tabular-nums">
                        {i.startedAt
                          ? new Date(i.startedAt).toLocaleString()
                          : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Webhook className="h-5 w-5" />
            <div>
              <CardTitle className="text-base">{t('calls.title')}</CardTitle>
              <CardDescription>{t('calls.description')}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!data || data.calls.length === 0 ? (
            <p className="text-muted-foreground py-6 text-center text-sm">
              {t('calls.empty')}
            </p>
          ) : (
            <ul className="divide-y rounded-lg border">
              {data.calls.map((c) => (
                <li key={c.id} className="px-3 py-2 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <code className="text-muted-foreground font-mono text-xs">
                      {c.id.slice(0, 12)}
                    </code>
                    <span className="text-muted-foreground text-xs tabular-nums">
                      {new Date(c.receivedAt).toLocaleString()}
                    </span>
                  </div>
                  <pre className="mt-1 overflow-x-auto font-mono text-xs whitespace-pre-wrap">
                    {JSON.stringify(c.payload)}
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
