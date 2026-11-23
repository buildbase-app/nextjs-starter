import { getTranslations } from 'next-intl/server';
import { locales } from '@/i18n/config';
import { TOUR_GROUP_IDS, TOUR_TASKS } from '@/tour/catalog';

/**
 * The demo's numbers as one sentence rather than a row of stat tiles: each
 * number is counted from the code (the catalog, the locale list), never
 * typed by hand, so the line cannot go stale.
 */
export async function StatsSection() {
  const t = await getTranslations('home');

  return (
    <section className="w-full border-b">
      <p className="text-muted-foreground mx-auto max-w-7xl px-6 py-10 text-lg leading-relaxed text-pretty md:py-12 md:text-2xl md:leading-snug">
        {t.rich('facts', {
          tasks: TOUR_TASKS.length,
          groups: TOUR_GROUP_IDS.length,
          languages: locales.length,
          n: (chunks) => (
            <span className="font-display text-foreground text-[1.3em] leading-none tabular-nums">
              {chunks}
            </span>
          ),
        })}
      </p>
    </section>
  );
}
