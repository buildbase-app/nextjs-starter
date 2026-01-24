import { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/i18n/config';

const baseUrl = process.env.SITE_URL || 'https://example.com';

// Define your public pages here (pages that should be indexed)
const publicPages = [
  '', // home page
  // Add more public pages here as needed
  // '/about',
  // '/pricing',
  // '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const page of publicPages) {
    // Create alternates object for hreflang
    const languages: Record<string, string> = {};
    for (const locale of locales) {
      const localePath = locale === defaultLocale ? page : `/${locale}${page}`;
      languages[locale] = `${baseUrl}${localePath || '/'}`;
    }

    // Add entry for default locale (no prefix)
    sitemapEntries.push({
      url: `${baseUrl}${page || '/'}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: page === '' ? 1.0 : 0.8,
      alternates: {
        languages,
      },
    });

    // Add entries for other locales (with prefix)
    for (const locale of locales) {
      if (locale !== defaultLocale) {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}${page}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: page === '' ? 1.0 : 0.8,
          alternates: {
            languages,
          },
        });
      }
    }
  }

  return sitemapEntries;
}
