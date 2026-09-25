import 'server-only';
import { adminFetch, hasAdminApi } from '@/lib/buildbase-admin';
import { logger } from '@/lib/logger';

/**
 * Editorial content written in the console and read here: a rich-text
 * block, a FAQ collection, docs, testimonials. Every reader returns null
 * (or an empty list) when the org lacks the object or the token is missing,
 * so the page renders what exists instead of failing on what does not.
 */

export const CONTENT_SLUGS = {
  richText: 'refund-policy',
  faqCollection: 'demo-help',
  docsFolder: 'getting-started',
} as const;

export interface RichContent {
  _id: string;
  title: string;
  slug: string;
  content: string;
  updatedAt?: string;
}

export interface Faq {
  _id: string;
  question: string;
  answer: string;
}

export interface DocPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  description?: string;
  folder?: { _id: string; name: string; slug: string } | string | null;
  published: boolean;
  updatedAt?: string;
}

export interface DocFolder {
  _id: string;
  name: string;
  slug: string;
  path?: string;
  subfolders?: DocFolder[];
}

export interface Testimonial {
  _id: string;
  name: string;
  position: string;
  content: string;
  avatar?: string;
  company?: { name?: string; url?: string } | string;
}

type Page<T> = { docs: T[] } | T[];
const docsOf = <T>(r: Page<T>): T[] => (Array.isArray(r) ? r : (r?.docs ?? []));

async function safely<T>(
  what: string,
  fn: () => Promise<T>
): Promise<T | null> {
  if (!hasAdminApi()) return null;
  try {
    return await fn();
  } catch (error) {
    logger.debug(`Content: ${what} unavailable`, {
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
}

export function getRichContent(slug = CONTENT_SLUGS.richText) {
  return safely('rich content', () =>
    adminFetch<RichContent>(`rich-content/slug/${slug}`)
  );
}

export async function getFaqs(collectionSlug = CONTENT_SLUGS.faqCollection) {
  return (
    (await safely('faqs', async () => {
      const collections = docsOf(
        await adminFetch<Page<{ _id: string; slug: string; title: string }>>(
          'faqs/collections',
          { query: { filter: { slug: collectionSlug }, pagination: false } }
        )
      );
      const collection = collections.find((c) => c.slug === collectionSlug);
      if (!collection) return [];
      return docsOf(
        await adminFetch<Page<Faq>>(`faqs/collections/${collection._id}/faqs`, {
          query: { pagination: false },
        })
      );
    })) ?? []
  );
}

export async function getDocs() {
  return (
    (await safely('docs', async () => {
      const [folders, posts] = await Promise.all([
        adminFetch<DocFolder[]>('docs/folders/tree'),
        adminFetch<Page<DocPost>>('docs', {
          query: {
            filter: { published: true },
            pagination: false,
            sort: { title: 1 },
          },
        }),
      ]);
      return {
        folders: Array.isArray(folders) ? folders : [],
        posts: docsOf(posts),
      };
    })) ?? { folders: [], posts: [] }
  );
}

export async function getTestimonials() {
  return (
    (await safely('testimonials', async () =>
      docsOf(
        await adminFetch<Page<Testimonial>>('testimonials', {
          query: { filter: { published: true }, pagination: false },
        })
      )
    )) ?? []
  );
}

/** Console-authored HTML, minus anything executable. */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '');
}
