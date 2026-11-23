#!/usr/bin/env node
/**
 * Fonts for the share images (/api/og, /api/og/tour) in the locales whose
 * scripts next/og's default font cannot draw: Hindi, Japanese, Chinese and
 * Arabic. Without them those titles render as empty boxes.
 *
 *   npm run og:fonts        after changing src/i18n/messages/{hi,ja,zh,ar}.ts
 *
 * For each locale it collects every character the locale's message file
 * uses, plus printable ASCII, and downloads a TrueType subset of the matching
 * Noto family (Cairo for Arabic; all SIL Open Font License 1.1) at 400 and
 * 700, and of Noto Sans for Latin. This runs on a developer's machine, like next/font/google does
 * at build time: the site never asks a font service for anything at
 * runtime, and visitors' browsers never see these files.
 *
 * Output (committed):
 *   public/og-fonts/*.ttf               the subsets, served as static files:
 *                                       outside the Worker bundle, which is
 *                                       near Cloudflare's size limit
 *   src/app/api/og/fonts-coverage.json  which file serves which locale, and
 *                                       the characters each locale covers;
 *                                       src/__tests__/og-fonts.test.ts fails
 *                                       when a message uses one outside it
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  '..'
);
const OUT_DIR = path.join(ROOT, 'public/og-fonts');
const OUT_COVERAGE = path.join(ROOT, 'src/app/api/og/fonts-coverage.json');

const LOCALES = {
  hi: 'Noto Sans Devanagari',
  ja: 'Noto Sans JP',
  zh: 'Noto Sans SC',
  // Not Noto Sans Arabic: its GSUB has a contextual lookup (type 5,
  // format 3) that next/og's renderer cannot parse, and the image fails.
  // Cairo (OFL, no reserved font name) renders and shapes correctly.
  ar: 'Cairo',
};
const LATIN = 'Noto Sans';
const WEIGHTS = [400, 700];

const ASCII = Array.from({ length: 0x7e - 0x20 + 1 }, (_, i) =>
  String.fromCharCode(0x20 + i)
).join('');

/** Every character a locale's messages use, plus ASCII; sorted, unique. */
async function charactersFor(locale) {
  const source = await readFile(
    path.join(ROOT, 'src/i18n/messages', `${locale}.ts`),
    'utf8'
  );
  const chars = new Set([...ASCII, ...source.replace(/\s/g, ' ')]);
  return [...chars].sort().join('');
}

/** A TrueType subset of one family and weight, holding only `text`. */
async function download(family, weight, text) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(text)}`
  ).then((r) => {
    if (!r.ok) throw new Error(`${family} ${weight}: CSS ${r.status}`);
    return r.text();
  });
  const urls = [...css.matchAll(/src: url\(([^)]+)\) format\('truetype'\)/g)];
  if (urls.length !== 1)
    throw new Error(`${family} ${weight}: expected one TrueType source`);
  const font = await fetch(urls[0][1]).then((r) => {
    if (!r.ok) throw new Error(`${family} ${weight}: font ${r.status}`);
    return r.arrayBuffer();
  });
  return Buffer.from(font);
}

await rm(OUT_DIR, { recursive: true, force: true });
await mkdir(OUT_DIR, { recursive: true });

const slug = (name) => name.toLowerCase().replace(/\s+/g, '-');
const manifest = { latin: [], locales: {} };
let total = 0;

async function save(name, weight, text, fileStem) {
  const data = await download(name, weight, text);
  const file = `${fileStem}-${weight}.ttf`;
  await writeFile(path.join(OUT_DIR, file), data);
  total += data.length;
  console.log(`${file}: ${(data.length / 1024).toFixed(0)} KB`);
  return { name, weight, file };
}

// Latin once, shared by every locale (next/og drops its own default font
// as soon as fonts are passed, so digits and the site name need one).
for (const weight of WEIGHTS) {
  manifest.latin.push(await save(LATIN, weight, ASCII, slug(LATIN)));
}
for (const [locale, family] of Object.entries(LOCALES)) {
  const text = await charactersFor(locale);
  manifest.locales[locale] = { chars: text, fonts: [] };
  for (const weight of WEIGHTS) {
    manifest.locales[locale].fonts.push(
      await save(family, weight, text, `${slug(family)}-${locale}`)
    );
  }
}

// Each family's licence, as Google Fonts publishes it (OFL 1.1 with that
// family's copyright line).
for (const name of [LATIN, ...Object.values(LOCALES)]) {
  const dir = name.toLowerCase().replace(/\s+/g, '');
  const text = await fetch(
    `https://raw.githubusercontent.com/google/fonts/main/ofl/${dir}/OFL.txt`
  ).then((r) => {
    if (!r.ok) throw new Error(`${name}: OFL.txt ${r.status}`);
    return r.text();
  });
  if (!text.includes('SIL Open Font License'))
    throw new Error(`${name}: OFL.txt is not the OFL`);
  await writeFile(path.join(OUT_DIR, `OFL-${slug(name)}.txt`), text);
}

await writeFile(
  path.join(OUT_DIR, 'README.md'),
  `# Share-image fonts

Subsets of Noto Sans, Noto Sans Devanagari, Noto Sans JP, Noto Sans SC and
Cairo, holding only the characters this app's messages use, for the share
images in \`src/app/api/og\`. Copyright their authors (see each file),
licensed under the SIL Open Font License 1.1 (one \`OFL-*.txt\` per family).

Generated by \`npm run og:fonts\` (scripts/og-fonts.mjs). Do not edit.
`
);
await writeFile(OUT_COVERAGE, JSON.stringify(manifest, null, 2) + '\n');
console.log(`total ${(total / 1024).toFixed(0)} KB, in public/og-fonts`);
