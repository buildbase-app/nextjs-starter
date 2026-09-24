'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ListChecks } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TOUR_TASKS, taskById } from '@/tour/catalog';

/** The dashboard's pointer into the tour: how far, and what comes next. */
export function TourProgressCard() {
  const t = useTranslations('tour');
  const [done, setDone] = useState<Set<string> | null>(null);

  useEffect(() => {
    fetch('/api/tour')
      .then((r) => (r.ok ? r.json() : { progress: [] }))
      .then((d: { progress: { taskId: string }[] }) =>
        setDone(new Set(d.progress.map((p) => p.taskId)))
      )
      .catch(() => setDone(new Set()));
  }, []);

  const total = TOUR_TASKS.length;
  const count = done?.size ?? 0;
  const next = done ? TOUR_TASKS.find((task) => !done.has(task.id)) : undefined;
  const pct = Math.round((count / total) * 100);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardDescription>{t('dashboardCard')}</CardDescription>
          <CardTitle className="text-2xl tabular-nums">
            {t('progress', { done: count, total })}
          </CardTitle>
        </div>
        <ListChecks className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
          <div
            className="bg-primary h-full rounded-full transition-[width]"
            style={{ width: `${pct}%` }}
          />
        </div>
        {next && (
          <p className="text-muted-foreground text-sm">
            {t('next')}: {taskById(next.id)?.title}
          </p>
        )}
        <Button asChild size="sm" variant="outline">
          <Link
            href={next ? `/dashboard/tour?task=${next.id}` : '/dashboard/tour'}
          >
            {t('dashboardCta')}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
