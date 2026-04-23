import RSS from 'rss';
import { blog } from '@/content/blog';
import { defaultLocale, type Locale } from '@/i18n/config';
import { siteUrl } from '@/env';
import { seoConfig } from '@/config/seo';
import { localeUrl } from '@/lib/i18n-url';
import { resolveAuthor } from '@/content/authors';

export const dynamic = 'force-static';
export const revalidate = 3600; // 1 hour

interface RouteContext {
  params: Promise<{ locale: string }>;
}

export async function GET(_req: Request, ctx: RouteContext) {
  const { locale } = await ctx.params;
  const localeTyped = (locale ?? defaultLocale) as Locale;
  const posts = await blog.getAllPosts(localeTyped);

  const blogUrl = localeUrl(siteUrl, localeTyped, '/blog');
  const feedUrl = localeUrl(siteUrl, localeTyped, '/blog/feed.xml');

  const feed = new RSS({
    title: `${seoConfig.brand.name} Blog`,
    description: seoConfig.brand.description,
    site_url: blogUrl,
    feed_url: feedUrl,
    language: localeTyped,
    image_url: `${siteUrl}${seoConfig.brand.logo}`,
  });

  for (const post of posts) {
    const author = resolveAuthor(post.author);
    feed.item({
      title: post.title,
      description: post.description,
      url: localeUrl(siteUrl, localeTyped, `/blog/${post.slug}`),
      guid: `${siteUrl}/blog/${post.slug}`,
      date: new Date(post.date),
      author: author.name,
      categories: [post.category, ...post.tags],
      ...(post.image && {
        enclosure: {
          url: post.image.startsWith('http')
            ? post.image
            : `${siteUrl}${post.image}`,
          type: 'image/png',
        },
      }),
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
