import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MdxRenderer } from '@/components/marketing/mdx/mdx-renderer';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { changelog } from '@/content/changelog';
import { type Locale } from '@/i18n/config';
import { siteUrl } from '@/env';
import { seoConfig } from '@/config/seo';
import { localePath, localeUrl } from '@/lib/i18n-url';
import { buildMarketingMetadata } from '@/lib/seo/marketing-metadata';
import { Link } from '@/i18n/routing';

interface ChangelogEntryPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const slugs = await changelog.getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

const KIND_TOKENS: Record<string, string> = {
  New: 'text-green-600',
  Improved: 'text-primary',
  Fixed: 'text-yellow-600',
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

function toIsoDate(value: string): string {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toISOString();
}

export async function generateMetadata({
  params,
}: ChangelogEntryPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const entry = await changelog.getBySlug(slug);
  if (!entry) return {};

  return buildMarketingMetadata({
    path: `/changelog/${slug}`,
    locale: locale as Locale,
    title: entry.title,
    description: entry.description,
    type: 'article',
    publishedTime: toIsoDate(entry.date),
  });
}

export default async function ChangelogEntryPage({
  params,
}: ChangelogEntryPageProps) {
  const { slug, locale } = await params;
  const entry = await changelog.getBySlug(slug);

  if (!entry) notFound();

  const localeTyped = locale as Locale;
  const path = `/changelog/${slug}`;
  const publishedIso = toIsoDate(entry.date);

  return (
    <>
      <ArticleJsonLd
        title={entry.title}
        description={entry.description}
        url={localeUrl(siteUrl, localeTyped, path)}
        datePublished={publishedIso}
        author={{ name: seoConfig.brand.name }}
        inLanguage={localeTyped}
        articleSection="Changelog"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Changelog', url: localePath(localeTyped, '/changelog') },
          { name: entry.title, url: localePath(localeTyped, path) },
        ]}
      />

      <article className="mx-auto max-w-3xl px-6 pt-16 pb-16 md:pt-24">
        <nav className="text-muted-foreground mb-8 text-sm">
          <Link
            href="/changelog"
            className="hover:text-foreground transition-colors"
          >
            Changelog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{entry.title}</span>
        </nav>

        <header className="flex flex-wrap items-center gap-3">
          <time
            dateTime={entry.date}
            className="text-muted-foreground font-mono text-xs tracking-wider uppercase"
          >
            {formatDate(entry.date, localeTyped)}
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

        <h1 className="text-foreground mt-3 text-3xl font-bold tracking-tight md:text-5xl">
          {entry.title}
        </h1>

        <p className="text-muted-foreground mt-4 text-base leading-relaxed md:text-lg">
          {entry.description}
        </p>

        <ul className="border-border divide-border bg-card mt-10 divide-y overflow-hidden rounded-lg border">
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

        {entry.body?.code ? (
          <div className="mt-12">
            <MdxRenderer code={entry.body.code} />
          </div>
        ) : null}
      </article>
    </>
  );
}
