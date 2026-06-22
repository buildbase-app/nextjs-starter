import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { MdxRenderer } from '@/components/marketing/mdx/mdx-renderer';
import { TableOfContents } from '@/components/marketing/mdx/table-of-contents';
import { ShareButtons } from '@/components/marketing/share-buttons';
import { RelatedPosts } from '@/components/marketing/related-posts';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { blog } from '@/content/blog';
import { authors, resolveAuthor } from '@/content/authors';
import { defaultLocale, type Locale } from '@/i18n/config';
import { siteUrl } from '@/env';
import { seoConfig } from '@/config/seo';
import { localePath, localeUrl } from '@/lib/i18n-url';
import { buildMarketingMetadata } from '@/lib/seo/marketing-metadata';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

function toIsoDate(value: string): string {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toISOString();
}

interface BlogPostPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const slugs = await blog.getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const localeTyped = locale as Locale;
  const post = await blog.getPostBySlug(localeTyped, slug);
  if (!post) return {};

  const supportedLocales = await blog.getSupportedLocales(slug);

  const authorProfile = authors.getBySlug(post.author);
  return buildMarketingMetadata({
    path: `/blog/${slug}`,
    locale: localeTyped,
    title: post.title,
    description: post.description,
    type: 'article',
    image: post.image,
    supportedLocales,
    publishedTime: toIsoDate(post.date),
    modifiedTime: post.updated ? toIsoDate(post.updated) : undefined,
    authors: [authorProfile?.name ?? post.author],
    articleTags: post.tags,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;
  const localeTyped = locale as Locale;
  const t = await getTranslations({ locale: localeTyped, namespace: 'blog' });

  const post = await blog.getPostBySlug(localeTyped, slug);

  if (!post) {
    if (localeTyped !== defaultLocale) {
      const defaultPost = await blog.getPostBySlug(defaultLocale, slug);
      if (defaultPost) {
        redirect(localePath(defaultLocale, `/blog/${slug}`));
      }
    }
    notFound();
  }

  const postUrl = `/blog/${slug}`;
  const publishedIso = toIsoDate(post.date);
  const modifiedIso = post.updated ? toIsoDate(post.updated) : publishedIso;
  const authorResolved = resolveAuthor(post.author);
  const authorProfile = authors.getBySlug(post.author);
  const relatedPosts = await blog.getRelatedPosts(slug, localeTyped);
  const fullUrl = localeUrl(siteUrl, localeTyped, postUrl);

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        url={localeUrl(siteUrl, localeTyped, postUrl)}
        image={post.image}
        datePublished={publishedIso}
        dateModified={modifiedIso}
        author={authorResolved}
        publisher={{
          name: seoConfig.publisher.name,
          logo: seoConfig.publisher.logo,
        }}
        wordCount={post.bodyRaw.trim().split(/\s+/).filter(Boolean).length}
        articleSection={post.category}
        keywords={post.tags}
        inLanguage={localeTyped}
      />
      <BreadcrumbJsonLd
        items={[
          { name: t('label'), url: localePath(localeTyped, '/blog') },
          { name: post.title, url: localePath(localeTyped, postUrl) },
        ]}
      />
      <article className="mx-auto max-w-3xl px-6 pt-16 pb-16 md:pt-24">
        <nav className="text-muted-foreground mb-8 text-sm">
          <Link
            href="/blog"
            className="hover:text-foreground transition-colors"
          >
            {t('label')}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{post.title}</span>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={`/blog/category/${post.category.toLowerCase()}`}
            className="text-primary font-mono text-xs tracking-wider uppercase hover:underline"
          >
            {post.category}
          </Link>
          <span className="text-muted-foreground font-mono text-xs">
            {post.date} · {post.readingTime}
          </span>
        </div>

        <h1 className="text-foreground mt-4 text-3xl font-bold tracking-tight md:text-5xl">
          {post.title}
        </h1>
        <p className="text-muted-foreground mt-6 text-base leading-relaxed md:text-lg">
          {post.description}
        </p>

        {/* Author byline — links to profile page */}
        <div className="border-border mt-8 flex items-center gap-3 border-t pt-6">
          <Link
            href={`/blog/authors/${post.author}`}
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            {authorProfile?.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={authorProfile.avatar}
                alt={authorProfile.name}
                className="border-border size-10 rounded-full border object-cover"
              />
            ) : (
              <div className="bg-primary/20 border-border flex size-10 items-center justify-center rounded-full border">
                <span className="text-foreground font-mono text-xs">
                  {(authorProfile?.name ?? post.author)
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
            )}
            <div>
              <span className="text-foreground text-sm font-medium">
                {authorProfile?.name ?? post.author}
              </span>
              {authorProfile?.role ? (
                <p className="text-muted-foreground text-xs">
                  {authorProfile.role}
                </p>
              ) : null}
            </div>
          </Link>
        </div>

        {/* Tags */}
        {post.tags.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <Link
                key={t}
                href={`/blog/tag/${t.toLowerCase()}`}
                className="bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-full px-3 py-1 text-sm transition-colors"
              >
                #{t}
              </Link>
            ))}
          </div>
        ) : null}

        {/* Table of contents + body */}
        <div className="mt-12">
          <TableOfContents />
          <MdxRenderer code={post.bodyCode} />
        </div>

        {/* Share */}
        <div className="border-border mt-12 border-t pt-6">
          <ShareButtons url={fullUrl} title={post.title} />
        </div>

        {/* Related posts */}
        <RelatedPosts posts={relatedPosts} />
      </article>
    </>
  );
}
