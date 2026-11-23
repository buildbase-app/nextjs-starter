import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { SiteShell } from '@/components/site-shell';
import { TourMap } from '@/components/marketing/tour-map';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/config';
import { buildMarketingMetadata } from '@/lib/seo/marketing-metadata';
import { tourGroups } from '@/tour/text';
import { TASK_ORDER, decodeProgress, tourColumns } from '@/tour/share';

interface ProgressPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ d?: string | string[] }>;
}

/** One code from the query; anything else counts as an empty map. */
function codeFrom(d: string | string[] | undefined): string {
  return typeof d === 'string' ? d : '';
}

export async function generateMetadata({
  params,
  searchParams,
}: ProgressPageProps): Promise<Metadata> {
  const [{ locale }, { d }] = await Promise.all([params, searchParams]);
  const code = codeFrom(d);
  const done = decodeProgress(code);
  const t = await getTranslations({ locale, namespace: 'home.tourMap' });
  const title = t('progress', { done: done.size, total: TASK_ORDER.length });
  const image = `/api/og/tour?d=${encodeURIComponent(code)}&locale=${locale}`;
  return {
    ...buildMarketingMetadata({
      path: `/tour/progress?d=${encodeURIComponent(code)}`,
      locale: locale as Locale,
      title,
      description: t('pageDescription'),
      image,
    }),
    // A personal snapshot with endless variants: shareable, not indexable.
    robots: { index: false, follow: true },
  };
}

/**
 * What a shared progress link opens: the sharer's map, filled where they
 * are done, and the way to start your own. The code in `?d=` is the whole
 * state (see src/tour/share-code.ts); no account is looked up.
 */
export default async function TourProgressPage({
  params,
  searchParams,
}: ProgressPageProps) {
  const [{ locale }, { d }] = await Promise.all([params, searchParams]);
  setRequestLocale(locale);
  const done = decodeProgress(codeFrom(d));
  const t = await getTranslations('home.tourMap');
  const titles = new Map<string, string>(
    tourGroups(locale).map((g) => [g.id, g.title])
  );
  const columns = tourColumns().map((c) => ({
    ...c,
    title: titles.get(c.id) ?? c.id,
  }));

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 md:pt-24">
        <h1 className="font-display text-foreground max-w-[16ch] text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02] text-balance">
          {t('progress', { done: done.size, total: TASK_ORDER.length })}
        </h1>
        <p className="text-muted-foreground mt-5 max-w-xl text-lg text-pretty">
          {t('pageDescription')}
        </p>
        <TourMap
          className="mt-12"
          scale={2}
          columns={columns}
          total={TASK_ORDER.length}
          order={TASK_ORDER}
          shared={[...done]}
        />
        <Button asChild size="lg" className="mt-10 h-11 px-6">
          <Link href="/dashboard/tour">{t('pageCta')}</Link>
        </Button>
      </div>
    </SiteShell>
  );
}
