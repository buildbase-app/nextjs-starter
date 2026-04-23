import {
  allChangelogEntries,
  type ChangelogEntry,
} from 'contentlayer/generated';

export type { ChangelogEntry } from 'contentlayer/generated';

/**
 * Changelog content layer (Contentlayer-backed).
 *
 * Source files: `src/content/changelog/*.mdx`. Filename drives the slug.
 * Sorted newest-first by `date`.
 *
 * Draft support: entries with `draft: true` are hidden in production.
 * In development they are visible for preview.
 */

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const ALL: ChangelogEntry[] = [...allChangelogEntries].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const PUBLISHED: ChangelogEntry[] = ALL.filter(
  (e) => !IS_PRODUCTION || !e.draft
);

export const changelog = {
  async getAll(): Promise<ChangelogEntry[]> {
    return PUBLISHED;
  },

  async getBySlug(slug: string): Promise<ChangelogEntry | null> {
    const entries = IS_PRODUCTION ? PUBLISHED : ALL;
    return entries.find((e) => e.slug === slug) ?? null;
  },

  async getAllSlugs(): Promise<string[]> {
    return PUBLISHED.map((e) => e.slug);
  },
};
