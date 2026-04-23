import type { Metadata } from 'next';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { BlogJsonLd } from '@/components/seo/json-ld';
import { blog } from '@/content/blog';
import { resolveAuthor } from '@/content/authors';
import type { Locale } from '@/i18n/config';
import { buildMarketingMetadata } from '@/lib/seo/marketing-metadata';
import { BlogSearch } from '@/components/marketing/blog-search';
import { RssButton } from '@/components/marketing/rss-button';

const POSTS_PER_PAGE = 10;

interface BlogIndexPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: BlogIndexPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { page } = await searchParams;
  const localeTyped = locale as Locale;
  const currentPage = Math.max(1, parseInt(page ?? '1', 10) || 1);

  const allPosts = await blog.getAllPosts(localeTyped);
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const base = buildMarketingMetadata({
    path: '/blog',
    locale: localeTyped,
    title: safePage > 1 ? `Blog — Page ${safePage}` : 'Blog',
    description: 'Latest posts, tutorials, and updates from our team.',
    alternatesTypes: {
      'application/rss+xml': '/blog/feed.xml',
    },
  });

  return {
    ...base,
    // Page 2+ should not be indexed — Google follows links to individual
    // posts but doesn't need duplicate list pages in the index.
    // (Google deprecated rel=prev/next in 2019; noindex+follow is the
    // recommended approach for paginated lists.)
    ...(safePage > 1 && {
      robots: { index: false, follow: true },
    }),
  };
}

export default async function BlogIndexPage({
  params,
  searchParams,
}: BlogIndexPageProps) {
  const { locale } = await params;
  const { page } = await searchParams;
  const localeTyped = locale as Locale;

  const currentPage = Math.max(1, parseInt(page ?? '1', 10) || 1);

  const [allPosts, allTags, allCategories] = await Promise.all([
    blog.getAllPosts(localeTyped),
    blog.getAllTags(localeTyped),
    blog.getAllCategories(localeTyped),
  ]);

  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <BlogJsonLd
        posts={allPosts.map((p) => ({
          slug: p.slug,
          title: p.title,
          description: p.description,
          datePublished: p.date,
          dateModified: p.updated,
          author: resolveAuthor(p.author),
          image: p.image,
        }))}
      />

      <header className="mb-12">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-primary font-mono text-xs tracking-wider uppercase">
              Blog
            </p>
            <h1 className="text-foreground mt-2 text-3xl font-bold tracking-tight md:text-5xl">
              Latest Posts
            </h1>
            <p className="text-muted-foreground mt-4 text-base md:text-lg">
              Updates, tutorials, and insights from our team.
            </p>
          </div>
          <div className="mt-2 flex shrink-0 gap-2">
            <BlogSearch />
            <RssButton href="/blog/feed.xml" />
          </div>
        </div>
      </header>

      {/* Category + tag filter chips */}
      {allCategories.length > 0 || allTags.length > 0 ? (
        <div className="mb-8 flex flex-wrap gap-2">
          {allCategories.map((cat) => (
            <Link
              key={`cat-${cat}`}
              href={`/blog/category/${cat.toLowerCase()}`}
              className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-3 py-1 text-sm font-medium transition-colors"
            >
              {cat}
            </Link>
          ))}
          {allTags.map((tag) => (
            <Link
              key={`tag-${tag}`}
              href={`/blog/tag/${tag}`}
              className="bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-full px-3 py-1 text-sm transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      ) : null}

      {posts.length === 0 ? (
        <div className="border-border bg-muted rounded-lg border p-12 text-center">
          <p className="text-muted-foreground text-sm">
            No posts yet. Check back soon!
          </p>
        </div>
      ) : (
        <>
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
                        className="bg-muted text-muted-foreground rounded-full px-2 py-0.5 text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
                <span className="text-primary mt-2 inline-flex items-center gap-2 text-sm opacity-0 transition-opacity group-hover:opacity-100">
                  Read more
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 ? (
            <nav
              className="mt-8 flex items-center justify-center gap-2"
              aria-label="Blog pagination"
            >
              {safePage > 1 ? (
                <Link
                  href={safePage === 2 ? '/blog' : `/blog?page=${safePage - 1}`}
                  className="border-border text-muted-foreground hover:text-foreground hover:border-foreground inline-flex items-center gap-1 rounded-md border px-3 py-2 text-sm transition-colors"
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </Link>
              ) : (
                <span className="border-border text-muted-foreground/40 inline-flex cursor-not-allowed items-center gap-1 rounded-md border px-3 py-2 text-sm">
                  <ChevronLeft className="size-4" />
                  Previous
                </span>
              )}

              <span className="text-muted-foreground px-3 text-sm">
                Page {safePage} of {totalPages}
              </span>

              {safePage < totalPages ? (
                <Link
                  href={`/blog?page=${safePage + 1}`}
                  className="border-border text-muted-foreground hover:text-foreground hover:border-foreground inline-flex items-center gap-1 rounded-md border px-3 py-2 text-sm transition-colors"
                >
                  Next
                  <ChevronRight className="size-4" />
                </Link>
              ) : (
                <span className="border-border text-muted-foreground/40 inline-flex cursor-not-allowed items-center gap-1 rounded-md border px-3 py-2 text-sm">
                  Next
                  <ChevronRight className="size-4" />
                </span>
              )}
            </nav>
          ) : null}
        </>
      )}
    </div>
  );
}
