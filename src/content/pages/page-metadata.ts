import type { Metadata } from 'next';
import { defaultLocale, type Locale, getOgLocale } from '@/i18n/config';
import { siteUrl } from '@/env';
import { seoConfig } from '@/config/seo';
import { localeUrl } from '@/lib/i18n-url';
import type { PageContentLoader } from './page-loader';

interface PageMetaOptions {
  /** Path under the site root, e.g. `/about`. Not locale-prefixed. */
  path: string;
  /** Locale from `await params`. */
  locale: Locale;
  /** The page's content loader. */
  loader: PageContentLoader<{
    locale: string;
    heroTitle: string;
    heroDescription: string;
    seoTitle?: string;
    seoDescription?: string;
  }>;
}

/**
 * Build SEO metadata for a marketing page backed by the content layer.
 *
 * - `title` / `description` come from the loaded content (falls back to
 *   default locale when the requested one is untranslated).
 * - `alternates.languages` lists only locales with a real translation.
 * - `x-default` points at the default-locale URL when present, else the
 *   first available locale.
 * - `canonical` is the native-locale URL when a translation exists,
 *   otherwise the default-locale URL so Google consolidates the
 *   fallback render instead of flagging duplicate content.
 */
export async function buildPageMetadata({
  path,
  locale,
  loader,
}: PageMetaOptions): Promise<Metadata> {
  const content = await loader.get(locale);
  if (!content) return {};

  const supported = await loader.getSupportedLocales();

  const languages: Record<string, string> = {};
  for (const loc of supported) {
    languages[loc] = localeUrl(siteUrl, loc, path);
  }
  const xDefaultLocale = supported.includes(defaultLocale)
    ? defaultLocale
    : supported[0];
  if (xDefaultLocale) {
    languages['x-default'] = localeUrl(siteUrl, xDefaultLocale, path);
  }

  const isNative = supported.includes(locale);
  const canonicalLocale = isNative ? locale : defaultLocale;
  const canonicalUrl = localeUrl(siteUrl, canonicalLocale, path);
  const ogImageUrl = `${siteUrl}/og.png`;

  const title = content.seoTitle ?? content.heroTitle;
  const description = content.seoDescription ?? content.heroDescription;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: getOgLocale(canonicalLocale),
      url: canonicalUrl,
      siteName: seoConfig.brand.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${seoConfig.brand.name}: ${title}`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: seoConfig.defaults.twitterCard,
      title,
      description,
      images: [ogImageUrl],
      ...(seoConfig.social.twitter && {
        site: seoConfig.social.twitter,
        creator: seoConfig.social.twitter,
      }),
    },
  };
}
