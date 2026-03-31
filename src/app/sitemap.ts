import { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/i18n/config';
import { siteUrl } from '@/env';

const baseUrl = siteUrl;

type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

interface PageConfig {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
  lastModified?: Date;
}

// =============================================================================
// STATIC PAGES CONFIGURATION
// Add your public pages here with their SEO settings
// =============================================================================
const staticPages: PageConfig[] = [
  {
    path: '', // Home page
    priority: 1.0,
    changeFrequency: 'weekly',
  },
  {
    path: '/pricing',
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  // Uncomment and add pages as you create them:
  // {
  //   path: '/about',
  //   priority: 0.8,
  //   changeFrequency: 'monthly',
  // },
  // {
  //   path: '/contact',
  //   priority: 0.7,
  //   changeFrequency: 'monthly',
  // },
  // {
  //   path: '/blog',
  //   priority: 0.8,
  //   changeFrequency: 'daily',
  // },
  // {
  //   path: '/features',
  //   priority: 0.8,
  //   changeFrequency: 'monthly',
  // },
  // {
  //   path: '/docs',
  //   priority: 0.7,
  //   changeFrequency: 'weekly',
  // },
  // {
  //   path: '/privacy',
  //   priority: 0.3,
  //   changeFrequency: 'yearly',
  // },
  // {
  //   path: '/terms',
  //   priority: 0.3,
  //   changeFrequency: 'yearly',
  // },
];

// =============================================================================
// DYNAMIC PAGES FETCHING
// Fetch dynamic content (blog posts, products, etc.) from your data source
// =============================================================================
async function getDynamicPages(): Promise<PageConfig[]> {
  const dynamicPages: PageConfig[] = [];

  // Example: Fetch blog posts from CMS or database
  // try {
  //   const posts = await fetch(`${process.env.API_URL}/posts`).then(r => r.json());
  //   for (const post of posts) {
  //     dynamicPages.push({
  //       path: `/blog/${post.slug}`,
  //       priority: 0.6,
  //       changeFrequency: 'monthly',
  //       lastModified: new Date(post.updatedAt),
  //     });
  //   }
  // } catch (error) {
  //   console.error('Failed to fetch blog posts for sitemap:', error);
  // }

  // Example: Fetch products
  // try {
  //   const products = await fetch(`${process.env.API_URL}/products`).then(r => r.json());
  //   for (const product of products) {
  //     dynamicPages.push({
  //       path: `/products/${product.slug}`,
  //       priority: 0.7,
  //       changeFrequency: 'weekly',
  //       lastModified: new Date(product.updatedAt),
  //     });
  //   }
  // } catch (error) {
  //   console.error('Failed to fetch products for sitemap:', error);
  // }

  return dynamicPages;
}

// =============================================================================
// SITEMAP GENERATOR
// Generates entries for all locales with proper hreflang alternates
// =============================================================================
function generateLocalizedEntries(pages: PageConfig[]): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    // Build hreflang alternates for all locales
    const languages: Record<string, string> = {
      'x-default': `${baseUrl}${page.path || '/'}`,
    };

    for (const locale of locales) {
      const localePath =
        locale === defaultLocale ? page.path : `/${locale}${page.path}`;
      languages[locale] = `${baseUrl}${localePath || '/'}`;
    }

    // Add entry for each locale
    for (const locale of locales) {
      const url =
        locale === defaultLocale
          ? `${baseUrl}${page.path || '/'}`
          : `${baseUrl}/${locale}${page.path}`;

      entries.push({
        url,
        lastModified: page.lastModified || new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic pages (blog posts, products, etc.)
  const dynamicPages = await getDynamicPages();

  // Combine static and dynamic pages
  const allPages = [...staticPages, ...dynamicPages];

  // Generate localized sitemap entries
  return generateLocalizedEntries(allPages);
}
