import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import coverage from '@/app/api/og/fonts-coverage.json';
import { locales } from '@/i18n/config';

/**
 * The share images draw Hindi, Japanese, Chinese and Arabic with subsets
 * holding only the characters the messages used when `npm run og:fonts` last
 * ran. A message that gains a character outside its subset would draw as an
 * empty box on every shared link, so this fails until the fonts are rebuilt.
 */
const ROOT = path.resolve(__dirname, '../..');
const FONTS_DIR = path.join(ROOT, 'public/og-fonts');

const manifest = coverage as {
  latin: { file: string }[];
  locales: Record<string, { chars: string; fonts: { file: string }[] }>;
};

function charactersOf(locale: string): Set<string> {
  const source = fs.readFileSync(
    path.join(ROOT, 'src/i18n/messages', `${locale}.ts`),
    'utf8'
  );
  return new Set(source.replace(/\s/g, ' '));
}

// Scripts next/og's default font has no glyphs for.
const NON_LATIN = /[֐-ࣿऀ-෿฀-࿿　-鿿가-힯＀-￯]/u;

describe('share-image fonts', () => {
  for (const [locale, entry] of Object.entries(manifest.locales)) {
    it(`${locale}: the subset covers every character its messages use`, () => {
      const covered = new Set(entry.chars);
      const missing = [...charactersOf(locale)].filter((c) => !covered.has(c));
      expect(missing, `run \`npm run og:fonts\`: ${missing.join(' ')}`).toEqual(
        []
      );
    });
  }

  it('every locale written in another script has its subset', () => {
    const needsFonts = locales.filter((locale) =>
      [...charactersOf(locale)].some((c) => NON_LATIN.test(c))
    );
    expect(needsFonts.sort()).toEqual(Object.keys(manifest.locales).sort());
  });

  it('every font file named in the manifest is shipped, with its licence', () => {
    const files = [
      ...manifest.latin,
      ...Object.values(manifest.locales).flatMap((e) => e.fonts),
    ].map((f) => f.file);
    for (const file of files) {
      expect(fs.existsSync(path.join(FONTS_DIR, file)), file).toBe(true);
    }
    const licences = fs
      .readdirSync(FONTS_DIR)
      .filter((f) => f.startsWith('OFL-'));
    expect(licences.length).toBeGreaterThanOrEqual(5);
  });
});
