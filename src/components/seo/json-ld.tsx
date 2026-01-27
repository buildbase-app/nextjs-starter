import { siteUrl } from '@/env';

/**
 * JSON-LD Structured Data Components
 *
 * These components add schema.org structured data to pages,
 * enabling rich snippets in search results.
 *
 * Usage:
 *   <OrganizationJsonLd />           - Add to root layout
 *   <WebSiteJsonLd />                - Add to root layout
 *   <WebPageJsonLd title="..." />    - Add to individual pages
 *   <BreadcrumbJsonLd items={[...]} /> - Add for navigation context
 */

interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Base component for rendering JSON-LD script tags
 */
function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0),
      }}
    />
  );
}

// =============================================================================
// Organization Schema
// =============================================================================

export interface OrganizationJsonLdProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
  contactPoint?: {
    telephone?: string;
    contactType?: string;
    email?: string;
  };
}

/**
 * Organization structured data
 * Helps Google understand your brand/company
 *
 * @example
 * <OrganizationJsonLd
 *   name="My Company"
 *   logo="/logo.png"
 *   sameAs={["https://twitter.com/mycompany"]}
 * />
 */
export function OrganizationJsonLd({
  name = 'My App',
  url = siteUrl,
  logo,
  description,
  sameAs = [],
  contactPoint,
}: OrganizationJsonLdProps) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
  };

  if (logo) {
    data.logo = logo.startsWith('http') ? logo : `${siteUrl}${logo}`;
  }

  if (description) {
    data.description = description;
  }

  if (sameAs.length > 0) {
    data.sameAs = sameAs;
  }

  if (contactPoint) {
    data.contactPoint = {
      '@type': 'ContactPoint',
      ...contactPoint,
    };
  }

  return <JsonLd data={data} />;
}

// =============================================================================
// WebSite Schema
// =============================================================================

export interface WebSiteJsonLdProps {
  name?: string;
  url?: string;
  description?: string;
  searchUrl?: string;
  searchQueryInput?: string;
}

/**
 * WebSite structured data
 * Enables sitelinks search box in Google results
 *
 * @example
 * <WebSiteJsonLd
 *   name="My App"
 *   searchUrl="/search?q={search_term_string}"
 * />
 */
export function WebSiteJsonLd({
  name = 'My App',
  url = siteUrl,
  description,
  searchUrl,
  searchQueryInput = 'search_term_string',
}: WebSiteJsonLdProps) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
  };

  if (description) {
    data.description = description;
  }

  // Add search action for sitelinks search box
  if (searchUrl) {
    data.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}${searchUrl}`,
      },
      'query-input': `required name=${searchQueryInput}`,
    };
  }

  return <JsonLd data={data} />;
}

// =============================================================================
// WebPage Schema
// =============================================================================

export interface WebPageJsonLdProps {
  title: string;
  description?: string;
  url?: string;
  datePublished?: string;
  dateModified?: string;
  author?: {
    name: string;
    url?: string;
  };
  image?: string;
}

/**
 * WebPage structured data
 * Provides context about individual pages
 *
 * @example
 * <WebPageJsonLd
 *   title="About Us"
 *   description="Learn about our company"
 *   url="/about"
 * />
 */
export function WebPageJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author,
  image,
}: WebPageJsonLdProps) {
  const pageUrl = url
    ? url.startsWith('http')
      ? url
      : `${siteUrl}${url}`
    : siteUrl;

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    url: pageUrl,
  };

  if (description) {
    data.description = description;
  }

  if (datePublished) {
    data.datePublished = datePublished;
  }

  if (dateModified) {
    data.dateModified = dateModified;
  }

  if (author) {
    data.author = {
      '@type': 'Person',
      name: author.name,
      ...(author.url && { url: author.url }),
    };
  }

  if (image) {
    data.image = image.startsWith('http') ? image : `${siteUrl}${image}`;
  }

  return <JsonLd data={data} />;
}

// =============================================================================
// Breadcrumb Schema
// =============================================================================

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

/**
 * BreadcrumbList structured data
 * Shows breadcrumb trail in search results
 *
 * @example
 * <BreadcrumbJsonLd
 *   items={[
 *     { name: "Home", url: "/" },
 *     { name: "Products", url: "/products" },
 *     { name: "Widget", url: "/products/widget" }
 *   ]}
 * />
 */
export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  };

  return <JsonLd data={data} />;
}

// =============================================================================
// FAQ Schema
// =============================================================================

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQJsonLdProps {
  items: FAQItem[];
}

/**
 * FAQPage structured data
 * Displays FAQ rich results in search
 *
 * @example
 * <FAQJsonLd
 *   items={[
 *     { question: "What is...?", answer: "It is..." },
 *     { question: "How do I...?", answer: "You can..." }
 *   ]}
 * />
 */
export function FAQJsonLd({ items }: FAQJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}

// =============================================================================
// Article Schema
// =============================================================================

export interface ArticleJsonLdProps {
  title: string;
  description?: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  publisher?: {
    name: string;
    logo?: string;
  };
}

/**
 * Article structured data
 * For blog posts and news articles
 *
 * @example
 * <ArticleJsonLd
 *   title="How to..."
 *   url="/blog/how-to"
 *   datePublished="2024-01-01"
 *   author={{ name: "John Doe" }}
 * />
 */
export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
  publisher,
}: ArticleJsonLdProps) {
  const articleUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    url: articleUrl,
    datePublished,
    author: {
      '@type': 'Person',
      name: author.name,
      ...(author.url && { url: author.url }),
    },
  };

  if (description) {
    data.description = description;
  }

  if (image) {
    data.image = image.startsWith('http') ? image : `${siteUrl}${image}`;
  }

  if (dateModified) {
    data.dateModified = dateModified;
  }

  if (publisher) {
    data.publisher = {
      '@type': 'Organization',
      name: publisher.name,
      ...(publisher.logo && {
        logo: {
          '@type': 'ImageObject',
          url: publisher.logo.startsWith('http')
            ? publisher.logo
            : `${siteUrl}${publisher.logo}`,
        },
      }),
    };
  }

  return <JsonLd data={data} />;
}
