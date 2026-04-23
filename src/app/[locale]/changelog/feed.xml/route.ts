import RSS from 'rss';
import { changelog } from '@/content/changelog';
import { defaultLocale, type Locale } from '@/i18n/config';
import { siteUrl } from '@/env';
import { seoConfig } from '@/config/seo';
import { localeUrl } from '@/lib/i18n-url';

export const dynamic = 'force-static';
export const revalidate = 3600; // 1 hour

interface RouteContext {
  params: Promise<{ locale: string }>;
}

export async function GET(_req: Request, ctx: RouteContext) {
  const { locale } = await ctx.params;
  const localeTyped = (locale ?? defaultLocale) as Locale;
  const entries = await changelog.getAll();

  const changelogUrl = localeUrl(siteUrl, localeTyped, '/changelog');
  const feedUrl = localeUrl(siteUrl, localeTyped, '/changelog/feed.xml');

  const feed = new RSS({
    title: `${seoConfig.brand.name} Changelog`,
    description: `Latest updates and releases from ${seoConfig.brand.name}.`,
    site_url: changelogUrl,
    feed_url: feedUrl,
    language: localeTyped,
    image_url: `${siteUrl}${seoConfig.brand.logo}`,
  });

  for (const entry of entries) {
    feed.item({
      title: entry.title,
      description: entry.description,
      url: localeUrl(siteUrl, localeTyped, `/changelog/${entry.slug}`),
      guid: `${siteUrl}/changelog/${entry.slug}`,
      date: new Date(entry.date),
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
