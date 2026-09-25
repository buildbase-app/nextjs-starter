'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ExternalLink,
  Sparkles,
  Terminal,
  MonitorCog,
  FolderCode,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CONSOLE_URL } from '@/tour/catalog';
import { sourceUrl } from '@/config/site';
import { tourGroups, tourTasks } from '@/tour/text';
import type { TourTask } from '@/tour/types';

interface ProgressRow {
  taskId: string;
  source: string;
  completedAt: string;
}

/**
 * The whole tour: every group, every task, and where the person is in it.
 * Progress comes from /api/tour, so it survives a new browser and follows
 * the account, not the device.
 */
export function TourList({ initialOpen }: { initialOpen?: string }) {
  const t = useTranslations('tour');
  const locale = useLocale();
  const groups = useMemo(() => tourGroups(locale), [locale]);
  const tasks = useMemo(() => tourTasks(locale), [locale]);
  const [progress, setProgress] = useState<Map<string, ProgressRow>>(new Map());
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState<string | null>(initialOpen ?? null);
  const [busy, setBusy] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/tour');
      if (!res.ok) return;
      const data = (await res.json()) as { progress: ProgressRow[] };
      setProgress(new Map(data.progress.map((r) => [r.taskId, r])));
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    void refresh();
    // Detection writes progress from the events route; a refetch on focus
    // is how the list catches up without a socket of its own.
    const onFocus = () => void refresh();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [refresh]);

  const toggle = async (task: TourTask, done: boolean) => {
    setBusy(task.id);
    try {
      await fetch(`/api/tour/${task.id}`, { method: done ? 'DELETE' : 'POST' });
      await refresh();
    } finally {
      setBusy(null);
    }
  };

  const doneCount = progress.size;
  const total = tasks.length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  const byGroup = useMemo(() => {
    const m = new Map<string, TourTask[]>();
    for (const task of tasks) {
      const list = m.get(task.group) ?? [];
      list.push(task);
      m.set(task.group, list);
    }
    return m;
  }, [tasks]);

  return (
    <div className="space-y-8">
      <div className="bg-card rounded-xl border p-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium">
            {t('progress', { done: doneCount, total })}
          </p>
          <span className="text-muted-foreground text-sm tabular-nums">
            {pct}%
          </span>
        </div>
        <div
          className="bg-muted mt-3 h-2 w-full overflow-hidden rounded-full"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={doneCount}
        >
          <div
            className="bg-primary h-full rounded-full transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        {loaded && doneCount === total && (
          <p className="text-primary mt-3 flex items-center gap-2 text-sm font-medium">
            <Sparkles className="h-4 w-4" /> {t('allDone')}
          </p>
        )}
      </div>

      {groups.map((group, gi) => {
        const tasks = byGroup.get(group.id) ?? [];
        const groupDone = tasks.filter((x) => progress.has(x.id)).length;
        return (
          <section key={group.id} id={group.id} className="scroll-mt-20">
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  <span className="text-muted-foreground me-2 tabular-nums">
                    {String(gi + 1).padStart(2, '0')}
                  </span>
                  {group.title}
                </h2>
                <p className="text-muted-foreground text-sm">{group.summary}</p>
              </div>
              <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
                {groupDone}/{tasks.length}
              </span>
            </div>
            <ol className="divide-y rounded-xl border">
              {tasks.map((task) => {
                const row = progress.get(task.id);
                const isOpen = open === task.id;
                const blockedBy = (task.requires ?? []).filter(
                  (id) => !progress.has(id)
                );
                return (
                  <li key={task.id} id={task.id} className="scroll-mt-20">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : task.id)}
                      aria-expanded={isOpen}
                      className="hover:bg-muted/50 flex w-full items-center gap-3 px-4 py-3 text-start"
                    >
                      {row ? (
                        <CheckCircle2 className="text-primary h-5 w-5 shrink-0" />
                      ) : (
                        <Circle className="text-muted-foreground/50 h-5 w-5 shrink-0" />
                      )}
                      <span
                        className={cn(
                          'flex-1 text-sm font-medium',
                          row && 'text-muted-foreground line-through'
                        )}
                      >
                        {task.title}
                      </span>
                      {task.detect.kind !== 'manual' && !row && (
                        <Badge
                          variant="outline"
                          className="hidden sm:inline-flex"
                        >
                          {t('detected')}
                        </Badge>
                      )}
                      <ChevronDown
                        className={cn(
                          'text-muted-foreground h-4 w-4 shrink-0 transition-transform',
                          isOpen && 'rotate-180'
                        )}
                      />
                    </button>
                    {isOpen && (
                      <TaskDetail
                        task={task}
                        all={tasks}
                        row={row}
                        blockedBy={blockedBy}
                        busy={busy === task.id}
                        onToggle={() => toggle(task, Boolean(row))}
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}

function TaskDetail({
  task,
  all,
  row,
  blockedBy,
  busy,
  onToggle,
}: {
  task: TourTask;
  all: TourTask[];
  row?: ProgressRow;
  blockedBy: string[];
  busy: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations('tour');
  const { source } = task;

  return (
    <div className="bg-muted/30 space-y-5 border-t px-4 py-5 sm:px-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <h3 className="text-muted-foreground mb-1 text-xs font-semibold tracking-wide uppercase">
            {t('why')}
          </h3>
          <p className="text-sm leading-relaxed">{task.why}</p>
        </div>
        <div>
          <h3 className="text-muted-foreground mb-1 text-xs font-semibold tracking-wide uppercase">
            {t('steps')}
          </h3>
          <ol className="list-decimal space-y-1 pl-5 text-sm leading-relaxed">
            {task.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="grid gap-4 text-sm sm:grid-cols-3">
        {source.sdk && source.sdk.length > 0 && (
          <SourceBlock icon={Terminal} title={t('fromSdk')}>
            {source.sdk.map((s) => (
              <code
                key={s}
                className="bg-background block truncate rounded border px-2 py-1 font-mono text-xs"
                title={s}
              >
                {s}
              </code>
            ))}
          </SourceBlock>
        )}
        {source.console && (
          <SourceBlock icon={MonitorCog} title={t('fromConsole')}>
            <a
              href={`${CONSOLE_URL}${source.console.screen}`}
              target="_blank"
              rel="noreferrer"
              className="text-primary inline-flex items-center gap-1 font-mono text-xs underline-offset-4 hover:underline"
            >
              {source.console.screen}
              <ExternalLink className="h-3 w-3" />
            </a>
            {source.console.note && (
              <p className="text-muted-foreground text-xs">
                {source.console.note}
              </p>
            )}
            {source.console.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={source.console.image}
                alt={source.console.note ?? source.console.screen}
                className="mt-2 w-full rounded-md border"
                loading="lazy"
              />
            )}
          </SourceBlock>
        )}
        {source.app && source.app.length > 0 && (
          <SourceBlock icon={FolderCode} title={t('fromApp')}>
            {source.app.map((s) => (
              <a
                key={s}
                href={sourceUrl(s)}
                target="_blank"
                rel="noreferrer"
                className="text-primary block truncate font-mono text-xs underline-offset-4 hover:underline"
                title={s}
              >
                {s}
              </a>
            ))}
          </SourceBlock>
        )}
      </div>

      {task.code && (
        <figure className="overflow-hidden rounded-lg border">
          <figcaption className="bg-muted text-muted-foreground border-b px-3 py-1.5 font-mono text-xs">
            {task.code.title}
          </figcaption>
          <pre className="bg-background overflow-x-auto p-3 font-mono text-xs leading-relaxed">
            <code>{task.code.body}</code>
          </pre>
        </figure>
      )}

      <div className="flex flex-wrap items-center gap-3">
        {task.href && (
          <Button asChild size="sm">
            <Link href={task.href}>{t('open')}</Link>
          </Button>
        )}
        <Button
          size="sm"
          variant={row ? 'ghost' : 'outline'}
          disabled={busy || (!row && blockedBy.length > 0)}
          onClick={onToggle}
        >
          {row ? t('undo') : t('markDone')}
        </Button>
        {!row && blockedBy.length > 0 && (
          <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
            <Lock className="h-3 w-3" />
            {t('requires')}:{' '}
            {blockedBy
              .map((id) => all.find((x) => x.id === id)?.title ?? id)
              .join(', ')}
          </span>
        )}
        {!row && task.detect.kind === 'manual' && (
          <span className="text-muted-foreground text-xs">{t('manual')}</span>
        )}
        {row && (
          <span className="text-muted-foreground text-xs tabular-nums">
            {new Date(row.completedAt).toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
}

function SourceBlock({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <h4 className="text-muted-foreground flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase">
        <Icon className="h-3.5 w-3.5" /> {title}
      </h4>
      {children}
    </div>
  );
}
