import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer2/source-files';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from 'rehype-pretty-code';

/**
 * Contentlayer schema for content.
 *
 * Source of truth: `src/content/**`.
 *
 * Content domains:
 *   - Blog posts — `src/content/blog/{locale}/{slug}.mdx` → `Post` type
 *   - Changelog — `src/content/changelog/{slug}.mdx` → `ChangelogEntry` type
 *   - Marketing pages — `src/content/pages/{page}/{locale}.mdx` → one
 *     bespoke document type per page (`AboutPage`, `PrivacyPage`, …).
 *
 * Adding a new locale = drop a file under the locale-keyed folder or
 * name it `{locale}.mdx`. The `locale` computed field picks it up from
 * the filesystem path.
 */

// -----------------------------------------------------------------------------
// Shared nested types
// -----------------------------------------------------------------------------

const IconCard = defineNestedType(() => ({
  name: 'IconCard',
  fields: {
    icon: { type: 'string', required: true },
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
  },
}));

const ChangelogHighlight = defineNestedType(() => ({
  name: 'ChangelogHighlight',
  fields: {
    kind: { type: 'string', required: true },
    title: { type: 'string', required: true },
    body: { type: 'string', required: true },
  },
}));

// -----------------------------------------------------------------------------
// Authors
// -----------------------------------------------------------------------------

export const Author = defineDocumentType(() => ({
  name: 'Author',
  filePathPattern: 'authors/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    role: { type: 'string', required: false },
    avatar: { type: 'string', required: false },
    bio: { type: 'string', required: true },
    website: { type: 'string', required: false },
    twitter: { type: 'string', required: false },
    github: { type: 'string', required: false },
    linkedin: { type: 'string', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
}));

// -----------------------------------------------------------------------------
// Blog posts
// -----------------------------------------------------------------------------

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'string', required: true },
    updated: { type: 'string', required: false },
    /** When true, the post is excluded from index, RSS, and sitemap. */
    draft: { type: 'boolean', required: false },
    readingTimeOverride: { type: 'string', required: false },
    /** Author slug — must match an `src/content/authors/{slug}.mdx` file. */
    author: { type: 'string', required: true },
    category: { type: 'string', required: true },
    /** Multiple tags for filtering. e.g. `tags: [nextjs, react, tutorial]` */
    tags: { type: 'list', of: { type: 'string' }, required: false },
    image: { type: 'string', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
    locale: {
      type: 'string',
      resolve: (doc) => {
        const parts = doc._raw.sourceFileDir.split('/');
        return parts[parts.length - 1];
      },
    },
    readingTime: {
      type: 'string',
      resolve: (doc) => {
        const override = (doc as { readingTimeOverride?: string })
          .readingTimeOverride;
        if (override) return override;
        const raw: string = doc.body?.raw ?? '';
        const words = raw.trim().split(/\s+/).filter(Boolean).length;
        const minutes = Math.max(1, Math.round(words / 200));
        return `${minutes} min read`;
      },
    },
  },
}));

// -----------------------------------------------------------------------------
// Marketing pages
// -----------------------------------------------------------------------------

const pageLocaleComputed = {
  locale: {
    type: 'string',
    resolve: (doc: { _raw: { sourceFileName: string } }) =>
      doc._raw.sourceFileName.replace(/\.mdx$/, ''),
  },
} as const;

export const AboutPage = defineDocumentType(() => ({
  name: 'AboutPage',
  filePathPattern: 'pages/about/*.mdx',
  contentType: 'mdx',
  fields: {
    heroEyebrow: { type: 'string', required: true },
    heroTitle: { type: 'string', required: true },
    heroDescription: { type: 'string', required: true },
    seoTitle: { type: 'string', required: false },
    seoDescription: { type: 'string', required: false },
    missionHeading: { type: 'string', required: true },
    valuesEyebrow: { type: 'string', required: true },
    valuesHeading: { type: 'string', required: true },
    values: { type: 'list', of: IconCard, required: true },
  },
  computedFields: pageLocaleComputed,
}));

const legalFields = {
  heroEyebrow: { type: 'string', required: true },
  heroTitle: { type: 'string', required: true },
  heroDescription: { type: 'string', required: true },
  seoTitle: { type: 'string', required: false },
  seoDescription: { type: 'string', required: false },
  lastUpdated: { type: 'string', required: true },
} as const;

export const PrivacyPage = defineDocumentType(() => ({
  name: 'PrivacyPage',
  filePathPattern: 'pages/privacy/*.mdx',
  contentType: 'mdx',
  fields: legalFields,
  computedFields: pageLocaleComputed,
}));

export const TermsPage = defineDocumentType(() => ({
  name: 'TermsPage',
  filePathPattern: 'pages/terms/*.mdx',
  contentType: 'mdx',
  fields: legalFields,
  computedFields: pageLocaleComputed,
}));

// -----------------------------------------------------------------------------
// Changelog
// -----------------------------------------------------------------------------

export const ChangelogEntry = defineDocumentType(() => ({
  name: 'ChangelogEntry',
  filePathPattern: 'changelog/*.mdx',
  contentType: 'mdx',
  fields: {
    date: { type: 'string', required: true },
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    /** When true, the entry is excluded from index, RSS, and sitemap. */
    draft: { type: 'boolean', required: false },
    highlights: { type: 'list', of: ChangelogHighlight, required: true },
    tag: { type: 'string', required: false },
    version: { type: 'string', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
    readingTime: {
      type: 'string',
      resolve: (doc) => {
        // Count words from body (highlights are structured data, body is prose)
        const raw: string = doc.body?.raw ?? '';
        const words = raw.trim().split(/\s+/).filter(Boolean).length;
        const minutes = Math.max(1, Math.round(words / 200));
        return `${minutes} min read`;
      },
    },
  },
}));

// -----------------------------------------------------------------------------
// MDX compilation pipeline
// -----------------------------------------------------------------------------

const prettyCodeOptions: PrettyCodeOptions = {
  theme: 'github-dark-default',
  keepBackground: false,
  defaultLang: 'plaintext',
};

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [
    Author,
    Post,
    AboutPage,
    PrivacyPage,
    TermsPage,
    ChangelogEntry,
  ],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: { className: ['heading-anchor'] },
        },
      ],
      [rehypePrettyCode, prettyCodeOptions],
    ],
  },
});
