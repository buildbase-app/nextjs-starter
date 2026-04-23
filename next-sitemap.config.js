/* eslint-disable @typescript-eslint/no-require-imports */
// next-sitemap loads this file as CommonJS; ESM imports aren't supported here.
const fs = require('fs');
const path = require('path');

/** @type {import('next-sitemap').IConfig} */

const siteUrl =
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://example.com';

// =============================================================================
// Locale discovery
//
// `src/i18n/config.ts` is the single source of truth for supported locales.
// We parse it at build time so adding a new locale there automatically flows
// into the sitemap — URLs, hreflang alternates, and x-default.
// =============================================================================
function readI18nConfig() {
  try {
    const src = fs.readFileSync(
      path.join(__dirname, 'src/i18n/config.ts'),
      'utf8'
    );
    const localesMatch = src.match(/export const locales\s*=\s*\[([^\]]+)\]/);
    const defaultMatch = src.match(
      /export const defaultLocale\s*:\s*Locale\s*=\s*['"]([^'"]+)['"]/
    );
    const locales = localesMatch
      ? localesMatch[1]
          .split(',')
          .map((s) => s.trim().replace(/['"`]/g, ''))
          .filter(Boolean)
      : ['en'];
    const defaultLocale = defaultMatch ? defaultMatch[1] : 'en';
    return { locales, defaultLocale };
  } catch {
    return { locales: ['en'], defaultLocale: 'en' };
  }
}

const { locales: LOCALES, defaultLocale: DEFAULT_LOCALE } = readI18nConfig();

// =============================================================================
// Content-backed locale discovery
//
// Blog posts: src/content/blog/{locale}/{slug}.mdx
// Content pages: src/content/pages/{section}/{locale}.mdx
// =============================================================================
function buildContentLocalesMap() {
  const blog = {}; // { [slug]: Set<locale> }
  const page = {}; // { [section]: Set<locale> }
  const authorSlugs = []; // author slugs for profile pages

  const blogDir = path.join(__dirname, 'src/content/blog');
  if (fs.existsSync(blogDir)) {
    for (const entry of fs.readdirSync(blogDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const locale = entry.name;
      const localeDir = path.join(blogDir, locale);
      for (const file of fs.readdirSync(localeDir)) {
        if (!file.endsWith('.mdx')) continue;
        if (isDraft(path.join(localeDir, file))) continue;
        const slug = file.replace(/\.mdx$/, '');
        (blog[slug] ??= new Set()).add(locale);
      }
    }
  }

  const pagesDir = path.join(__dirname, 'src/content/pages');
  if (fs.existsSync(pagesDir)) {
    for (const entry of fs.readdirSync(pagesDir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const section = entry.name;
      const sectionDir = path.join(pagesDir, section);
      for (const file of fs.readdirSync(sectionDir)) {
        if (!file.endsWith('.mdx')) continue;
        const locale = file.replace(/\.mdx$/, '');
        (page[section] ??= new Set()).add(locale);
      }
    }
  }

  // Discover author slugs (author pages are locale-independent UI pages)
  const authorsDir = path.join(__dirname, 'src/content/authors');
  if (fs.existsSync(authorsDir)) {
    for (const file of fs.readdirSync(authorsDir)) {
      if (!file.endsWith('.mdx')) continue;
      authorSlugs.push(file.replace(/\.mdx$/, ''));
    }
  }

  return { blog, page, authorSlugs };
}

const CONTENT_LOCALES = buildContentLocalesMap();

// =============================================================================
// Per-URL lastmod sources
// =============================================================================

function toIso(value) {
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return null;
    return d.toISOString();
  } catch {
    return null;
  }
}

function maxIso(a, b) {
  if (!a) return b;
  if (!b) return a;
  return new Date(a).getTime() >= new Date(b).getTime() ? a : b;
}

function parseBlogFrontmatter(filePath) {
  try {
    const src = fs.readFileSync(filePath, 'utf8');
    const fmMatch = src.match(/^---\n([\s\S]*?)\n---/);
    if (!fmMatch) return null;
    const body = fmMatch[1];
    const updated = body.match(/^updated:\s*['"]?([^'"\n]+)['"]?/m);
    const date = body.match(/^date:\s*['"]?([^'"\n]+)['"]?/m);
    return toIso(updated?.[1] ?? date?.[1] ?? '');
  } catch {
    return null;
  }
}

/** Returns true if the frontmatter contains `draft: true`. */
function isDraft(filePath) {
  try {
    const src = fs.readFileSync(filePath, 'utf8');
    const fmMatch = src.match(/^---\n([\s\S]*?)\n---/);
    if (!fmMatch) return false;
    return /^draft:\s*true/m.test(fmMatch[1]);
  } catch {
    return false;
  }
}

function fileMtimeIso(filePath) {
  try {
    return fs.statSync(filePath).mtime.toISOString();
  } catch {
    return null;
  }
}

function buildLastmodMap() {
  const byPath = {};

  // Changelog MDX
  const changelogDir = path.join(__dirname, 'src/content/changelog');
  if (fs.existsSync(changelogDir)) {
    for (const file of fs.readdirSync(changelogDir)) {
      if (!file.endsWith('.mdx')) continue;
      if (isDraft(path.join(changelogDir, file))) continue;
      const slug = file.replace(/\.mdx$/, '');
      const iso =
        parseBlogFrontmatter(path.join(changelogDir, file)) ??
        fileMtimeIso(path.join(changelogDir, file));
      if (!iso) continue;
      byPath[`/changelog/${slug}`] = iso;
    }
  }

  // Blog MDX
  const blogDir = path.join(__dirname, 'src/content/blog');
  if (fs.existsSync(blogDir)) {
    for (const localeDir of fs.readdirSync(blogDir, { withFileTypes: true })) {
      if (!localeDir.isDirectory()) continue;
      const dir = path.join(blogDir, localeDir.name);
      for (const file of fs.readdirSync(dir)) {
        if (!file.endsWith('.mdx')) continue;
        if (isDraft(path.join(dir, file))) continue;
        const slug = file.replace(/\.mdx$/, '');
        const iso =
          parseBlogFrontmatter(path.join(dir, file)) ??
          fileMtimeIso(path.join(dir, file));
        if (!iso) continue;
        const key = `/blog/${slug}`;
        byPath[key] = maxIso(byPath[key], iso);
      }
    }
  }

  // Marketing pages MDX — file mtime per section
  const pagesDir = path.join(__dirname, 'src/content/pages');
  if (fs.existsSync(pagesDir)) {
    for (const sectionDir of fs.readdirSync(pagesDir, {
      withFileTypes: true,
    })) {
      if (!sectionDir.isDirectory()) continue;
      const dir = path.join(pagesDir, sectionDir.name);
      let latest = null;
      for (const file of fs.readdirSync(dir)) {
        if (!file.endsWith('.mdx')) continue;
        const iso = fileMtimeIso(path.join(dir, file));
        latest = maxIso(latest, iso);
      }
      if (latest) byPath[`/${sectionDir.name}`] = latest;
    }
  }

  // Author profile pages — file mtime
  const authorsDir = path.join(__dirname, 'src/content/authors');
  if (fs.existsSync(authorsDir)) {
    for (const file of fs.readdirSync(authorsDir)) {
      if (!file.endsWith('.mdx')) continue;
      const slug = file.replace(/\.mdx$/, '');
      const iso = fileMtimeIso(path.join(authorsDir, file));
      if (iso) byPath[`/blog/authors/${slug}`] = iso;
    }
  }

  // Collection index pages inherit the max of their children
  const collections = [
    { index: '/blog', prefix: '/blog/' },
    { index: '/changelog', prefix: '/changelog/' },
  ];
  for (const { index, prefix } of collections) {
    let latest = byPath[index] ?? null;
    for (const [key, iso] of Object.entries(byPath)) {
      if (key.startsWith(prefix)) latest = maxIso(latest, iso);
    }
    if (latest) byPath[index] = latest;
  }

  return byPath;
}

const LASTMOD_BY_PATH = buildLastmodMap();

function getSupportedLocalesForPath(rest) {
  const blogMatch = rest.match(/^\/blog\/([^/]+)\/?$/);
  if (blogMatch) {
    return CONTENT_LOCALES.blog[blogMatch[1]] ?? new Set();
  }
  const pageMatch = rest.match(/^\/([^/]+)\/?$/);
  if (pageMatch && CONTENT_LOCALES.page[pageMatch[1]]) {
    return CONTENT_LOCALES.page[pageMatch[1]];
  }
  return null;
}

function splitLocale(pathname) {
  for (const loc of LOCALES) {
    if (pathname === `/${loc}`) return { locale: loc, rest: '/' };
    if (pathname.startsWith(`/${loc}/`)) {
      return { locale: loc, rest: pathname.slice(loc.length + 1) };
    }
  }
  return { locale: null, rest: pathname };
}

function buildLocaleUrl(locale, rest) {
  const suffix = rest === '/' ? '' : rest;
  if (locale === DEFAULT_LOCALE) {
    return `${siteUrl}${suffix || '/'}`;
  }
  return `${siteUrl}/${locale}${suffix}`;
}

function isExcluded(rest) {
  if (rest === '/robots.txt' || rest === '/sitemap.xml') return true;
  if (rest.startsWith('/api/')) return true;
  if (rest === '/dashboard' || rest.startsWith('/dashboard/')) return true;
  if (rest.startsWith('/sitemap/')) return true;
  if (['/401', '/403', '/404', '/500'].includes(rest)) return true;
  if (rest.endsWith('/feed.xml')) return true;
  return false;
}

// Per-path tuning
const PRIORITY_RULES = [
  { match: (p) => p === '/', priority: 1.0, changefreq: 'weekly' },
  { match: (p) => p === '/pricing', priority: 0.9, changefreq: 'weekly' },
  {
    match: (p) => p === '/blog',
    priority: 0.8,
    changefreq: 'weekly',
  },
  {
    match: (p) => p.startsWith('/blog/authors/'),
    priority: 0.5,
    changefreq: 'monthly',
  },
  {
    match: (p) => p.startsWith('/blog/'),
    priority: 0.6,
    changefreq: 'monthly',
  },
  { match: (p) => p === '/changelog', priority: 0.7, changefreq: 'weekly' },
  {
    match: (p) => p.startsWith('/changelog/'),
    priority: 0.6,
    changefreq: 'monthly',
  },
  {
    match: (p) => p === '/about' || p === '/features',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    match: (p) => p === '/privacy' || p === '/terms' || p === '/cookies',
    priority: 0.3,
    changefreq: 'yearly',
  },
];

function resolvePriority(rest) {
  const rule = PRIORITY_RULES.find((r) => r.match(rest));
  return {
    priority: rule?.priority ?? 0.5,
    changefreq: rule?.changefreq ?? 'monthly',
  };
}

function buildAlternateRefs(rest) {
  const supported = getSupportedLocalesForPath(rest);
  const available = supported
    ? LOCALES.filter((l) => supported.has(l))
    : LOCALES;
  if (available.length === 0) return [];

  const refs = available.map((loc) => ({
    href: buildLocaleUrl(loc, rest),
    hreflang: loc,
    hrefIsAbsolute: true,
  }));
  const xDefaultLocale = available.includes(DEFAULT_LOCALE)
    ? DEFAULT_LOCALE
    : available[0];
  refs.push({
    href: buildLocaleUrl(xDefaultLocale, rest),
    hreflang: 'x-default',
    hrefIsAbsolute: true,
  });
  return refs;
}

const config = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/'],
      },
      // AI crawlers — explicitly allow marketing pages for citation
      { userAgent: 'GPTBot', allow: '/', disallow: ['/api/', '/dashboard/'] },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: ['/api/', '/dashboard/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/api/', '/dashboard/'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/api/', '/dashboard/'],
      },
      {
        userAgent: 'Claude-SearchBot',
        allow: '/',
        disallow: ['/api/', '/dashboard/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/api/', '/dashboard/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/api/', '/dashboard/'],
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/api/', '/dashboard/'],
      },
      { userAgent: 'CCBot', allow: '/', disallow: ['/api/', '/dashboard/'] },
    ],
  },
  generateIndexSitemap: true,
  sitemapSize: 5000,
  outDir: 'public',
  autoLastmod: true,
  transform: async (cfg, pathname) => {
    const { locale, rest } = splitLocale(pathname);
    if (isExcluded(rest)) return null;

    const effectiveLocale = locale ?? DEFAULT_LOCALE;

    // Skip URLs for content-backed paths without a translation
    const supported = getSupportedLocalesForPath(rest);
    if (supported && !supported.has(effectiveLocale)) return null;

    const { priority, changefreq } = resolvePriority(rest);

    const lastmod =
      LASTMOD_BY_PATH[rest] ??
      (cfg.autoLastmod ? new Date().toISOString() : undefined);

    return {
      loc: buildLocaleUrl(effectiveLocale, rest),
      changefreq,
      priority,
      lastmod,
      alternateRefs: buildAlternateRefs(rest),
    };
  },
};

module.exports = config;
