import { getTranslations } from 'next-intl/server';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { TOUR_GROUPS, TOUR_TASKS, tasksInGroup } from '@/tour/catalog';

/**
 * The tour, read before signing in: every group and every task title, so a
 * person evaluating BuildBase sees the whole surface up front. Content is
 * the catalog's English; only the chrome is translated.
 */
export async function TourPreview() {
  const t = await getTranslations('tour');

  return (
    <section id="tour" className="w-full max-w-6xl scroll-mt-20 px-6 py-20">
      <div className="mb-10 text-center">
        <h2 className="text-foreground text-3xl font-bold tracking-tight text-balance">
          {t('homeTitle')}
        </h2>
        <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-lg text-pretty">
          {t('homeSubtitle', {
            total: TOUR_TASKS.length,
            groups: TOUR_GROUPS.length,
          })}
        </p>
      </div>

      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOUR_GROUPS.map((group, i) => {
          const tasks = tasksInGroup(group.id);
          return (
            <li
              key={group.id}
              className="bg-card flex flex-col rounded-xl border p-5"
            >
              <div className="mb-3 flex items-baseline gap-2">
                <span className="text-muted-foreground font-mono text-xs tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-semibold">{group.title}</h3>
                <span className="text-muted-foreground ml-auto text-xs tabular-nums">
                  {tasks.length}
                </span>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">
                {group.summary}
              </p>
              <ul className="space-y-1.5">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-start gap-2 text-sm leading-snug"
                  >
                    <CheckCircle2 className="text-muted-foreground/40 mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <Link
                      href={`/dashboard/tour?task=${task.id}`}
                      className="hover:text-primary"
                    >
                      {task.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>

      <div className="mt-10 text-center">
        <Button asChild size="lg">
          <Link href="/dashboard/tour">
            {t('homeCta')} <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
