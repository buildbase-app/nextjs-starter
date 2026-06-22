import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ItemListJsonLd } from '@/components/seo/json-ld';
import { changelog } from '@/content/changelog';
import { RssButton } from '@/components/marketing/rss-button';
import type { Locale } from '@/i18n/config';
import { buildMarketingMetadata } from '@/lib/seo/marketing-metadata';

export const dynamic = 'force-static';

interface ChangelogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ChangelogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'changelog' });
  return buildMarketingMetadata({
    path: '/changelog',
    locale: locale as Locale,
    title: t('meta.title'),
    description: t('meta.description'),
    alternatesTypes: {
      'application/rss+xml': '/changelog/feed.xml',
    },
  });
}

const KIND_TOKENS: Record<string, string> = {
  New: 'text-success',
  Improved: 'text-primary',
  Fixed: 'text-warning',
  Breaking: 'text-destructive',
};

function formatDate(iso: string, locale: string): string {
  try {
    return new Date(iso).toLocaleDateString(locale, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default async function ChangelogPage({ params }: ChangelogPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'changelog' });
  const entries = await changelog.getAll();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <ItemListJsonLd
        name="Changelog"
        url="/changelog"
        items={entries.map((e) => ({
          name: e.title,
          url: `/changelog/${e.slug}`,
          description: e.description,
        }))}
      />
      <header className="mb-12">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-primary font-mono text-xs tracking-wider uppercase">
              {t('label')}
            </p>
            <h1 className="text-foreground mt-2 text-3xl font-bold tracking-tight md:text-5xl">
              {t('heading')}
            </h1>
            <p className="text-muted-foreground mt-4 text-base md:text-lg">
              {t('description')}
            </p>
          </div>
          <div className="mt-2 shrink-0">
            <RssButton href="/changelog/feed.xml" label={t('rssLabel')} />
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-16">
        {entries.map((entry) => (
          <article key={entry.slug} className="flex flex-col gap-5">
            <header className="flex flex-wrap items-center gap-3">
              <time
                dateTime={entry.date}
                className="text-muted-foreground font-mono text-xs tracking-wider uppercase"
              >
                {formatDate(entry.date, locale)}
              </time>
              {entry.tag ? (
                <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                  {entry.tag}
                </span>
              ) : null}
              {entry.version ? (
                <span className="text-muted-foreground font-mono text-xs">
                  v{entry.version}
                </span>
              ) : null}
              <span className="text-muted-foreground font-mono text-xs">
                {entry.readingTime}
              </span>
            </header>

            <Link
              href={`/changelog/${entry.slug}`}
              className="text-foreground hover:text-primary text-2xl font-bold tracking-tight transition-colors md:text-3xl"
            >
              {entry.title}
            </Link>

            <p className="text-muted-foreground text-base leading-relaxed">
              {entry.description}
            </p>

            <ul className="border-border divide-border bg-card divide-y overflow-hidden rounded-lg border">
              {entry.highlights.map((h) => (
                <li
                  key={`${entry.slug}-${h.title}`}
                  className="flex flex-col gap-2 p-5"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`${KIND_TOKENS[h.kind] ?? 'text-muted-foreground'} font-mono text-xs tracking-wider uppercase`}
                    >
                      {h.kind}
                    </span>
                    <span className="text-foreground text-sm font-medium">
                      {h.title}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {h.body}
                  </p>
                </li>
              ))}
            </ul>

            <Link
              href={`/changelog/${entry.slug}`}
              className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm"
            >
              {t('permalink')}
              <ArrowRight className="size-4" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
