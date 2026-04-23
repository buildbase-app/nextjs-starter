import { locales, defaultLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';

/**
 * Generic per-page content loader.
 *
 * Every marketing page under `src/content/pages/{page}/{locale}.mdx`
 * exposes the same interface by wrapping its Contentlayer document
 * array with `createPageLoader`.
 *
 * Fallback rule: if the requested locale has no translation, the
 * default-locale version is served.
 */
export interface PageContentLoader<T> {
  get(locale: Locale): Promise<T | null>;
  getSupportedLocales(): Promise<Locale[]>;
}

interface LocalizedDoc {
  locale: string;
}

function isKnownLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function createPageLoader<T extends LocalizedDoc>(
  allDocs: readonly T[]
): PageContentLoader<T> {
  const native = allDocs.filter((d) => isKnownLocale(d.locale));

  return {
    async get(locale) {
      const match = native.find((d) => d.locale === locale);
      if (match) return match;
      if (locale !== defaultLocale) {
        return native.find((d) => d.locale === defaultLocale) ?? null;
      }
      return null;
    },

    async getSupportedLocales() {
      return native.map((d) => d.locale as Locale);
    },
  };
}
