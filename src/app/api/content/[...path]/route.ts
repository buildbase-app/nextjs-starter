import { NextRequest } from 'next/server';
import { blog } from '@/content/blog';
import { changelog } from '@/content/changelog';
import { defaultLocale, type Locale } from '@/i18n/config';

/**
 * Markdown content negotiation endpoint.
 *
 * When an AI agent requests a page with `Accept: text/markdown`, the
 * middleware (or the agent directly) can hit this endpoint to get the
 * raw markdown version of the content.
 *
 * Routes:
 *   GET /api/content/blog/{slug}           → blog post markdown
 *   GET /api/content/blog/{locale}/{slug}  → localized blog post
 *   GET /api/content/changelog/{slug}      → changelog entry markdown
 *
 * Returns 404 if content not found, 400 if path is invalid.
 */

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;

  if (!path || path.length === 0) {
    return Response.json(
      {
        error:
          'Path required. Use /api/content/blog/{slug} or /api/content/changelog/{slug}',
      },
      { status: 400 }
    );
  }

  const [type, ...rest] = path;

  // --- Blog posts ---
  if (type === 'blog') {
    let locale: Locale = defaultLocale;
    let slug: string;

    if (rest.length === 2) {
      // /api/content/blog/{locale}/{slug}
      locale = rest[0] as Locale;
      slug = rest[1];
    } else if (rest.length === 1) {
      // /api/content/blog/{slug}
      slug = rest[0];
    } else {
      return Response.json(
        {
          error:
            'Use /api/content/blog/{slug} or /api/content/blog/{locale}/{slug}',
        },
        { status: 400 }
      );
    }

    const post = await blog.getPostBySlug(locale, slug);
    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    const markdown = [
      `# ${post.title}`,
      '',
      `> ${post.description}`,
      '',
      `**Author:** ${post.author}  `,
      `**Date:** ${post.date}  `,
      `**Category:** ${post.category}  `,
      `**Reading time:** ${post.readingTime}  `,
      ...(post.tags.length > 0 ? [`**Tags:** ${post.tags.join(', ')}  `] : []),
      '',
      '---',
      '',
      post.bodyRaw,
    ].join('\n');

    return new Response(markdown, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  }

  // --- Changelog entries ---
  if (type === 'changelog') {
    if (rest.length !== 1) {
      return Response.json(
        { error: 'Use /api/content/changelog/{slug}' },
        { status: 400 }
      );
    }

    const slug = rest[0];
    const entry = await changelog.getBySlug(slug);
    if (!entry) {
      return Response.json({ error: 'Entry not found' }, { status: 404 });
    }

    const highlights = entry.highlights
      .map((h) => `- **${h.kind}: ${h.title}** — ${h.body}`)
      .join('\n');

    const markdown = [
      `# ${entry.title}`,
      '',
      `> ${entry.description}`,
      '',
      `**Date:** ${entry.date}  `,
      ...(entry.version ? [`**Version:** ${entry.version}  `] : []),
      ...(entry.tag ? [`**Tag:** ${entry.tag}  `] : []),
      '',
      '## Highlights',
      '',
      highlights,
      '',
      ...(entry.body?.raw ? ['---', '', entry.body.raw] : []),
    ].join('\n');

    return new Response(markdown, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  }

  return Response.json(
    { error: `Unknown content type "${type}". Use "blog" or "changelog".` },
    { status: 400 }
  );
}
