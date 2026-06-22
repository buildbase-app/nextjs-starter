import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { JsonLdScript } from 'next-seo';
import { Link } from '@/i18n/routing';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { MdxRenderer } from '@/components/marketing/mdx/mdx-renderer';
import { authors, buildAuthorJsonLd } from '@/content/authors';
import { blog } from '@/content/blog';
import type { Locale } from '@/i18n/config';
import { buildMarketingMetadata } from '@/lib/seo/marketing-metadata';
import { localePath } from '@/lib/i18n-url';
import { getTranslations } from 'next-intl/server';

interface AuthorPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  return authors.getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const author = authors.getBySlug(slug);
  if (!author) return {};

  return buildMarketingMetadata({
    path: `/blog/authors/${slug}`,
    locale: locale as Locale,
    title: author.name,
    description: author.bio,
    image: author.avatar,
  });
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug, locale } = await params;
  const localeTyped = locale as Locale;
  const t = await getTranslations({ locale: localeTyped, namespace: 'blog' });

  const author = authors.getBySlug(slug);
  if (!author) notFound();

  const posts = await blog.getPostsByAuthor(slug, localeTyped);
  const personJsonLd = buildAuthorJsonLd(author);

  const socialLinks = [
    author.website && { label: 'Website', href: author.website },
    author.twitter && {
      label: 'X / Twitter',
      href: `https://x.com/${author.twitter.replace(/^@/, '')}`,
    },
    author.github && {
      label: 'GitHub',
      href: `https://github.com/${author.github}`,
    },
    author.linkedin && {
      label: 'LinkedIn',
      href: `https://linkedin.com/in/${author.linkedin}`,
    },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <JsonLdScript data={personJsonLd} scriptKey={`person-${slug}`} />
      <BreadcrumbJsonLd
        items={[
          { name: t('label'), url: localePath(localeTyped, '/blog') },
          {
            name: author.name,
            url: localePath(localeTyped, `/blog/authors/${slug}`),
          },
        ]}
      />

      {/* Author Profile Header */}
      <header className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-start">
        {author.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={author.avatar}
            alt={author.name}
            className="border-border size-24 shrink-0 rounded-full border object-cover"
          />
        ) : (
          <div className="bg-primary/20 border-border flex size-24 shrink-0 items-center justify-center rounded-full border">
            <span className="text-foreground text-2xl font-bold">
              {author.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <h1 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
            {author.name}
          </h1>
          {author.role ? (
            <p className="text-primary font-mono text-sm">{author.role}</p>
          ) : null}
          <p className="text-muted-foreground text-base leading-relaxed">
            {author.bio}
          </p>

          {socialLinks.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground text-sm underline underline-offset-4"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      {/* Author Bio (MDX body) */}
      {author.bodyCode ? (
        <section className="border-border mb-12 border-t pt-8">
          <MdxRenderer code={author.bodyCode} />
        </section>
      ) : null}

      {/* Posts by this author */}
      <section>
        <h2 className="text-foreground mb-6 text-2xl font-bold tracking-tight">
          {t('postsByAuthor', { name: author.name })}
        </h2>

        {posts.length === 0 ? (
          <div className="border-border bg-muted rounded-lg border p-12 text-center">
            <p className="text-muted-foreground text-sm">
              {t('noPostsAuthor')}
            </p>
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
                <h3 className="text-foreground text-xl font-bold tracking-tight md:text-2xl">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {post.description}
                </p>
                <span className="text-primary mt-2 inline-flex items-center gap-2 text-sm opacity-0 transition-opacity group-hover:opacity-100">
                  {t('readMore')}
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
