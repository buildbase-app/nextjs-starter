/**
 * Author content layer (Contentlayer-backed).
 *
 * Source files: `src/content/authors/{slug}.mdx`
 * Schema: `contentlayer.config.ts` → `Author` document type.
 *
 * Blog posts reference authors by slug in frontmatter:
 *   `author: john-doe`  →  resolves to `src/content/authors/john-doe.mdx`
 */
import { allAuthors, type Author } from 'contentlayer/generated';
import { absoluteUrl, seoConfig } from '@/config/seo';

export type { Author } from 'contentlayer/generated';

export interface AuthorProfile {
  slug: string;
  name: string;
  role?: string;
  avatar?: string;
  bio: string;
  website?: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
  bodyCode: string;
}

function toAuthorProfile(doc: Author): AuthorProfile {
  return {
    slug: doc.slug,
    name: doc.name,
    role: doc.role,
    avatar: doc.avatar,
    bio: doc.bio,
    website: doc.website,
    twitter: doc.twitter,
    github: doc.github,
    linkedin: doc.linkedin,
    bodyCode: doc.body.code,
  };
}

const ALL_AUTHORS: AuthorProfile[] = allAuthors.map(toAuthorProfile);

export const authors = {
  getAll(): AuthorProfile[] {
    return ALL_AUTHORS;
  },

  getBySlug(slug: string): AuthorProfile | null {
    return ALL_AUTHORS.find((a) => a.slug === slug) ?? null;
  },

  getAllSlugs(): string[] {
    return ALL_AUTHORS.map((a) => a.slug);
  },
};

/**
 * Build sameAs array for JSON-LD from author social links.
 */
function buildSameAs(author: AuthorProfile): string[] {
  const links: string[] = [];
  if (author.website) links.push(author.website);
  if (author.twitter) {
    const handle = author.twitter.replace(/^@/, '');
    links.push(`https://x.com/${handle}`);
  }
  if (author.github) links.push(`https://github.com/${author.github}`);
  if (author.linkedin) links.push(`https://linkedin.com/in/${author.linkedin}`);
  return links;
}

/**
 * Resolve an author slug to a JSON-LD-ready object for ArticleJsonLd.
 * Includes sameAs social links for rich structured data.
 * Falls back to a bare name if the slug doesn't match any author file.
 */
export function resolveAuthor(slug: string): {
  name: string;
  url?: string;
  sameAs?: string[];
} {
  const author = authors.getBySlug(slug);
  if (!author) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        `[blog] Author "${slug}" not found — create src/content/authors/${slug}.mdx`
      );
    }
    return { name: slug };
  }
  const sameAs = buildSameAs(author);
  return {
    name: author.name,
    url: absoluteUrl(`/blog/authors/${author.slug}`),
    ...(sameAs.length > 0 && { sameAs }),
  };
}

/**
 * Build a full Person JSON-LD object for an author (used on profile pages).
 */
export function buildAuthorJsonLd(author: AuthorProfile) {
  const sameAs = buildSameAs(author);
  return {
    '@context': 'https://schema.org' as const,
    '@type': 'Person' as const,
    name: author.name,
    url: absoluteUrl(`/blog/authors/${author.slug}`),
    ...(author.bio && { description: author.bio }),
    ...(author.role && { jobTitle: author.role }),
    ...(author.avatar && { image: absoluteUrl(author.avatar) }),
    ...(sameAs.length > 0 && { sameAs }),
    worksFor: {
      '@type': 'Organization' as const,
      name: seoConfig.brand.name,
      url: seoConfig.brand.url,
    },
  };
}
