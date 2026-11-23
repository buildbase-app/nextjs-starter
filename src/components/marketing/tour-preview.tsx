import { getLocale, getTranslations } from 'next-intl/server';
import { ChevronDown } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { tourGroups, tourTasks } from '@/tour/text';

/**
 * The tour, read before signing in: every group and every task, as a
 * numbered index (the tour is a sequence, so the numbers carry meaning).
 * Each group is a native <details>, so the whole list is in the HTML for
 * readers and crawlers, opens with the keyboard and needs no JavaScript.
 * Content is the catalog's text; only the chrome is translated.
 */
export async function TourPreview() {
  const [t, locale] = await Promise.all([getTranslations('tour'), getLocale()]);
  const groups = tourGroups(locale);
  const tasks = tourTasks(locale);

  return (
    <section id="tour" className="w-full scroll-mt-20 border-b">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:py-28 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <h2 className="text-foreground text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl">
              {t('homeTitle')}
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md text-lg text-pretty">
              {t('homeSubtitle', {
                total: tasks.length,
                groups: groups.length,
              })}
            </p>
            <Button asChild size="lg" className="mt-8 h-11 px-6">
              <Link href="/dashboard/tour">{t('homeCta')}</Link>
            </Button>
          </div>
        </div>

        <ol className="border-t lg:col-span-8">
          {groups.map((group, i) => {
            const groupTasks = tasks.filter((task) => task.group === group.id);
            return (
              <li key={group.id} className="border-b">
                <details className="group/row">
                  <summary className="hover:bg-muted/60 focus-visible:ring-ring flex cursor-pointer list-none items-baseline gap-4 rounded-sm px-2 py-4 transition-colors focus-visible:ring-2 focus-visible:outline-none md:gap-6 [&::-webkit-details-marker]:hidden">
                    <span className="text-muted-foreground w-6 shrink-0 font-mono text-xs tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="text-foreground block font-medium md:text-lg">
                        {group.title}
                      </span>
                      <span className="text-muted-foreground mt-0.5 block text-sm text-pretty">
                        {group.summary}
                      </span>
                    </span>
                    <span className="text-muted-foreground shrink-0 font-mono text-xs tabular-nums">
                      {groupTasks.length}
                    </span>
                    <ChevronDown
                      aria-hidden
                      className="text-muted-foreground size-4 shrink-0 translate-y-0.5 transition-transform duration-200 group-open/row:rotate-180"
                    />
                  </summary>
                  <ul className="grid gap-x-8 gap-y-1 px-2 ps-12 pt-1 pb-5 sm:grid-cols-2 md:ps-14">
                    {groupTasks.map((task) => (
                      <li key={task.id}>
                        <Link
                          href={`/dashboard/tour?task=${task.id}`}
                          className="text-foreground hover:text-link block py-1 text-sm leading-snug underline-offset-4 hover:underline"
                        >
                          {task.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
