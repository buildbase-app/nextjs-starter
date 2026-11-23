// @vitest-environment node
import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { createElement } from 'react';
import { ImageResponse } from 'next/og';
import { createTranslator } from 'next-intl';
import coverage from '@/app/api/og/fonts-coverage.json';
import { renderOgImage } from '@/app/api/og/fonts';
import { messages } from '@/i18n/messages';
import type { Locale } from '@/i18n/config';

/**
 * next/og's renderer cannot parse every font: Noto Sans Arabic failed with
 * "lookupType: 5 - substFormat: 3 is not yet supported", which is why Arabic
 * uses Cairo. This renders each locale's subsets the way the share cards do,
 * so a font the renderer rejects fails the build instead of a shared link:
 * every covered character on its own, and the strings the cards really show.
 */
const FONTS_DIR = path.resolve(__dirname, '../../public/og-fonts');

const manifest = coverage as {
  latin: { name: string; weight: number; file: string }[];
  locales: Record<
    string,
    { chars: string; fonts: { name: string; weight: number; file: string }[] }
  >;
};

async function render(locale: string, text: string): Promise<Buffer> {
  const fonts = [...manifest.latin, ...manifest.locales[locale].fonts].map(
    (f) => ({
      name: f.name,
      weight: f.weight as 400 | 700,
      style: 'normal' as const,
      data: fs.readFileSync(path.join(FONTS_DIR, f.file)),
    })
  );
  const image = new ImageResponse(
    createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexWrap: 'wrap',
          fontSize: 28,
          fontWeight: 700,
          direction: locale === 'ar' ? 'rtl' : 'ltr',
        },
      },
      text
    ),
    { width: 1200, height: 630, fonts }
  );
  return Buffer.from(await image.arrayBuffer());
}

describe('share-image fonts render', () => {
  for (const locale of Object.keys(manifest.locales)) {
    const t = createTranslator({
      locale,
      messages: messages[locale as Locale],
      namespace: 'home',
    });
    const cardText = [
      t('meta.title'),
      t('meta.description'),
      t('meta.tagline'),
      t('tourMap.progress', { done: 28, total: 122 }),
    ];

    it(`${locale}: every covered character renders`, async () => {
      // Space-separated: each glyph is drawn and parsed on its own.
      const chars = [...manifest.locales[locale].chars].join(' ');
      const png = await render(locale, chars);
      expect(png.subarray(1, 4).toString()).toBe('PNG');
    }, 60_000);

    it(`${locale}: the card's own strings render`, async () => {
      for (const text of cardText) {
        const png = await render(locale, text);
        expect(png.subarray(1, 4).toString(), text).toBe('PNG');
      }
    }, 60_000);
  }

  it('a font the renderer cannot use falls back to the default, not an error', async () => {
    const response = await renderOgImage(
      createElement('div', { style: { display: 'flex' } }, 'BuildBase'),
      { width: 1200, height: 630 },
      [
        {
          name: 'Broken',
          weight: 700,
          style: 'normal',
          data: new Uint8Array([0, 1, 0, 0, 0, 0]).buffer,
        },
      ]
    );
    expect(response.status).toBe(200);
    const png = Buffer.from(await response.arrayBuffer());
    expect(png.subarray(1, 4).toString()).toBe('PNG');
  }, 60_000);
});
