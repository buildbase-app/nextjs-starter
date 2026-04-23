import { defaultLocale, type Locale } from '@/i18n/config';

/**
 * Build a full absolute URL with locale prefix.
 *
 * Default locale has NO prefix (matches `localePrefix: 'as-needed'`
 * in `src/i18n/routing.ts`). Non-default locales get `/{locale}{path}`.
 *
 * Single source of truth for all URL generation — sitemaps, hreflang,
 * canonical, RSS, redirects.
 */
export function localeUrl(
  baseUrl: string,
  locale: Locale,
  path: string
): string {
  const suffix = path === '/' ? '' : path;
  if (locale === defaultLocale) {
    return `${baseUrl}${suffix || '/'}`;
  }
  return `${baseUrl}/${locale}${suffix}`;
}

/**
 * Path-only variant for server-side redirects and internal links.
 * No base URL — returns `/path` or `/{locale}/path`.
 */
export function localePath(locale: Locale, path: string): string {
  if (locale === defaultLocale) {
    return path || '/';
  }
  return `/${locale}${path}`;
}
