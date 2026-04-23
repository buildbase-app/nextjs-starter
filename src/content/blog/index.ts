/**
 * Blog content layer (Contentlayer-backed).
 *
 * - Source files: `src/content/blog/{locale}/{slug}.mdx`
 * - Schema + compilation pipeline: `contentlayer.config.ts` at repo root.
 * - Pages import only `blog` + `BlogPost` from this file.
 *
 * Draft support: posts with `draft: true` in frontmatter are excluded
 * from all public surfaces in production. In development they are
 * visible so authors can preview.
 */
import { allPosts, type Post } from 'contentlayer/generated';
import { locales } from '@/i18n/config';
import type { Locale } from '@/i18n/config';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export interface BlogPost {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  date: string;
  updated?: string;
  draft: boolean;
  readingTime: string;
  /** Author slug — matches `src/content/authors/{slug}.mdx`. */
  author: string;
  category: string;
  /** Multiple tags for filtering. */
  tags: string[];
  image?: string;
  bodyCode: string;
  bodyRaw: string;
}

export interface BlogLoader {
  getAllPosts(locale: Locale): Promise<BlogPost[]>;
  getPostBySlug(locale: Locale, slug: string): Promise<BlogPost | null>;
  getSupportedLocales(slug: string): Promise<Locale[]>;
  getAllSlugs(): Promise<string[]>;
  getPostsByAuthor(authorSlug: string, locale: Locale): Promise<BlogPost[]>;
  getPostsByTag(tag: string, locale: Locale): Promise<BlogPost[]>;
  getAllTags(locale: Locale): Promise<string[]>;
  getPostsByCategory(category: string, locale: Locale): Promise<BlogPost[]>;
  getAllCategories(locale: Locale): Promise<string[]>;
  /** Get 2-3 related posts by shared tags or category, excluding the given slug. */
  getRelatedPosts(
    slug: string,
    locale: Locale,
    limit?: number
  ): Promise<BlogPost[]>;
}

function isKnownLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

function toBlogPost(post: Post): BlogPost | null {
  if (!isKnownLocale(post.locale)) return null;
  return {
    slug: post.slug,
    locale: post.locale,
    title: post.title,
    description: post.description,
    date: post.date,
    updated: post.updated,
    draft: post.draft ?? false,
    readingTime: post.readingTime,
    author: post.author,
    category: post.category,
    tags: (post.tags ?? []) as string[],
    image: post.image,
    bodyCode: post.body.code,
    bodyRaw: post.body.raw,
  };
}

const ALL_POSTS: BlogPost[] = allPosts
  .map(toBlogPost)
  .filter((p): p is BlogPost => p !== null);

const PUBLISHED_POSTS: BlogPost[] = ALL_POSTS.filter(
  (p) => !IS_PRODUCTION || !p.draft
);

function sortByDate(posts: BlogPost[]): BlogPost[] {
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export const blog: BlogLoader = {
  async getAllPosts(locale) {
    return sortByDate(PUBLISHED_POSTS.filter((p) => p.locale === locale));
  },

  async getPostBySlug(locale, slug) {
    const posts = IS_PRODUCTION ? PUBLISHED_POSTS : ALL_POSTS;
    return posts.find((p) => p.locale === locale && p.slug === slug) ?? null;
  },

  async getSupportedLocales(slug) {
    return PUBLISHED_POSTS.filter((p) => p.slug === slug).map((p) => p.locale);
  },

  async getAllSlugs() {
    return Array.from(new Set(PUBLISHED_POSTS.map((p) => p.slug)));
  },

  async getPostsByAuthor(authorSlug, locale) {
    return sortByDate(
      PUBLISHED_POSTS.filter(
        (p) => p.author === authorSlug && p.locale === locale
      )
    );
  },

  async getPostsByTag(tag, locale) {
    const normalizedTag = tag.toLowerCase();
    return sortByDate(
      PUBLISHED_POSTS.filter(
        (p) =>
          p.locale === locale &&
          p.tags.some((t) => t.toLowerCase() === normalizedTag)
      )
    );
  },

  async getAllTags(locale) {
    const tags = new Set<string>();
    for (const post of PUBLISHED_POSTS) {
      if (post.locale !== locale) continue;
      for (const tag of post.tags) {
        tags.add(tag.toLowerCase());
      }
    }
    return Array.from(tags).sort();
  },

  async getPostsByCategory(category, locale) {
    const normalized = category.toLowerCase();
    return sortByDate(
      PUBLISHED_POSTS.filter(
        (p) => p.locale === locale && p.category.toLowerCase() === normalized
      )
    );
  },

  async getAllCategories(locale) {
    const categories = new Set<string>();
    for (const post of PUBLISHED_POSTS) {
      if (post.locale !== locale) continue;
      categories.add(post.category);
    }
    return Array.from(categories).sort();
  },

  async getRelatedPosts(slug, locale, limit = 3) {
    const current = PUBLISHED_POSTS.find(
      (p) => p.slug === slug && p.locale === locale
    );
    if (!current) return [];

    const others = PUBLISHED_POSTS.filter(
      (p) => p.slug !== slug && p.locale === locale
    );

    // Score by shared tags (2 pts each) + same category (1 pt)
    const scored = others.map((post) => {
      let score = 0;
      if (post.category.toLowerCase() === current.category.toLowerCase()) {
        score += 1;
      }
      for (const tag of post.tags) {
        if (current.tags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
          score += 2;
        }
      }
      return { post, score };
    });

    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((s) => s.post);
  },
};
