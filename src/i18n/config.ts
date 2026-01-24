export const locales = [
  'en',
  'hi',
  'es',
  'fr',
  'de',
  'ja',
  'zh',
  'ar',
] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// Display names for language switcher
export const localeNames: Record<Locale, string> = {
  en: 'English',
  hi: 'हिन्दी',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  ja: '日本語',
  zh: '中文',
  ar: 'العربية',
};

// OpenGraph locale format (for social sharing metadata)
export const ogLocales: Record<Locale, string> = {
  en: 'en_US',
  hi: 'hi_IN',
  es: 'es_ES',
  fr: 'fr_FR',
  de: 'de_DE',
  ja: 'ja_JP',
  zh: 'zh_CN',
  ar: 'ar_SA',
};

// RTL languages
export const rtlLocales: Locale[] = ['ar'];

export function isRtlLocale(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

// Get OpenGraph locale format
export function getOgLocale(locale: Locale): string {
  return ogLocales[locale] || 'en_US';
}

// Get alternate OpenGraph locales (for og:locale:alternate)
export function getAlternateOgLocales(currentLocale: Locale): string[] {
  return Object.values(ogLocales).filter((l) => l !== ogLocales[currentLocale]);
}
