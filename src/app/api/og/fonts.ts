import type { ReactElement } from 'react';
import { ImageResponse } from 'next/og';
import { logger } from '@/lib/logger';
import coverage from './fonts-coverage.json';

/**
 * Fonts for share images in the locales next/og's default font cannot draw
 * (hi, ja, zh, ar). The subsets live in public/og-fonts (made by
 * `npm run og:fonts`), so they are static files served from this site: not
 * in the Cloudflare Worker bundle, which is close to its size limit, and
 * not from a font service.
 *
 * Returns undefined for Latin locales, so next/og keeps its own default.
 * If a file cannot be loaded the image still renders, with the default
 * font: boxes for a moment are better than a broken share card.
 */

type Weight = 400 | 700;
interface FontFile {
  name: string;
  weight: number;
  file: string;
}

export interface OgFont {
  name: string;
  data: ArrayBuffer;
  weight: Weight;
  style: 'normal';
}

const manifest = coverage as {
  latin: FontFile[];
  locales: Record<string, { chars: string; fonts: FontFile[] }>;
};

// One download per file per server instance; a failed one is retried later.
const cache = new Map<string, Promise<ArrayBuffer | null>>();

function load(origin: string, file: string): Promise<ArrayBuffer | null> {
  const cached = cache.get(file);
  if (cached) return cached;
  const pending = fetch(new URL(`/og-fonts/${file}`, origin))
    .then((res) => (res.ok ? res.arrayBuffer() : null))
    .catch(() => null)
    .then((data) => {
      if (!data) cache.delete(file);
      return data;
    });
  cache.set(file, pending);
  return pending;
}

export async function ogFontsFor(
  locale: string,
  origin: string
): Promise<OgFont[] | undefined> {
  const entry = manifest.locales[locale];
  if (!entry) return undefined;
  // Latin first: satori draws each glyph with the first font that has it,
  // so digits and the site name come from Noto Sans, the rest from the
  // locale's script.
  const files = [...manifest.latin, ...entry.fonts];
  const loaded = await Promise.all(files.map((f) => load(origin, f.file)));
  if (loaded.some((data) => !data)) return undefined;
  return files.map((f, i) => ({
    name: f.name,
    data: loaded[i]!,
    weight: f.weight as Weight,
    style: 'normal',
  }));
}

/**
 * Render a share image with the locale's fonts, and fall back to next/og's
 * default if they cannot be used. ImageResponse renders lazily while it
 * streams, so a font the renderer cannot parse (Noto Sans Arabic did:
 * "lookupType: 5 - substFormat: 3 is not yet supported") would otherwise
 * fail mid-response with nothing sent. Rendering to bytes first lets that
 * be caught: a card in the default font is better than no card.
 */
export async function renderOgImage(
  element: ReactElement,
  size: { width: number; height: number },
  fonts: OgFont[] | undefined
): Promise<Response> {
  if (fonts) {
    try {
      const image = new ImageResponse(element, { ...size, fonts });
      const body = await image.arrayBuffer();
      return new Response(body, {
        status: image.status,
        headers: image.headers,
      });
    } catch (error) {
      logger.warn('Share image: locale fonts failed, using the default', {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
  return new ImageResponse(element, size);
}
