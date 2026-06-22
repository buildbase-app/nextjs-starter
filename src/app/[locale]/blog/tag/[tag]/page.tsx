import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { blog } from '@/content/blog';
import type { Locale } from '@/i18n/config';
import { buildMarketingMetadata } from '@/lib/seo/marketing-metadata';
import { localePath } from '@/lib/i18n-url';

interface TagPageProps {
  params: Promise<{ tag: string; locale: string }>;
}

export async function generateStaticParams() {
  // Generate for default locale — other locales are handled by next-intl
  const tags = await blog.getAllTags('en');
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag, locale } = await params;
  const decoded = decodeURIComponent(tag);
  const t = await getTranslations({ locale, namespace: 'blog' });
  return buildMarketingMetadata({
    path: `/blog/tag/${decoded}`,
    locale: locale as Locale,
    title: t('meta.tagTitle', { tag: decoded }),
    description: t('meta.tagDescription', { tag: decoded }),
  });
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag, locale } = await params;
  const localeTyped = locale as Locale;
  const decoded = decodeURIComponent(tag);
  const t = await getTranslations({ locale: localeTyped, namespace: 'blog' });
  const posts = await blog.getPostsByTag(decoded, localeTyped);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <BreadcrumbJsonLd
        items={[
          { name: 'Blog', url: localePath(localeTyped, '/blog') },
          {
            name: `#${decoded}`,
            url: localePath(localeTyped, `/blog/tag/${decoded}`),
          },
        ]}
      />

      <header className="mb-12">
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-foreground mb-4 inline-block text-sm transition-colors"
        >
          {t('allPosts')}
        </Link>
        <h1 className="text-foreground text-3xl font-bold tracking-tight md:text-5xl">
          #{decoded}
        </h1>
        <p className="text-muted-foreground mt-4 text-base md:text-lg">
          {t('postsTaggedCount', { count: posts.length, tag: decoded })}
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="border-border bg-muted rounded-lg border p-12 text-center">
          <p className="text-muted-foreground text-sm">{t('noPostsTag')}</p>
        </div>
      ) : (
        <div className="border-border bg-border flex flex-col gap-px overflow-hidden rounded-lg border">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-background hover:bg-muted group flex flex-col gap-3 p-8 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-primary font-mono text-xs tracking-wider uppercase">
                  {post.category}
                </span>
                <span className="text-muted-foreground font-mono text-xs">
                  {post.date} · {post.readingTime}
                </span>
              </div>
              <h2 className="text-foreground text-xl font-bold tracking-tight md:text-2xl">
                {post.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {post.description}
              </p>
              {post.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        t.toLowerCase() === decoded.toLowerCase()
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
              <span className="text-primary mt-2 inline-flex items-center gap-2 text-sm opacity-0 transition-opacity group-hover:opacity-100">
                {t('readMore')}
                <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
