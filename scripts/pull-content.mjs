#!/usr/bin/env node
/**
 * Build-time content: pull every published blog post, doc, FAQ, testimonial,
 * rich-content block and collection record from BuildBase into one JSON
 * file, for a static build or an offline fallback. The same as
 * `npx buildbase content pull`, through `pullContent()` so it can read
 * `.env.local` like `seed-org.mjs` does.
 *
 *   npm run content:pull                # writes .buildbase/content.json
 *   npm run content:pull -- other.json  # or anywhere else
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServerClient, pullContent } from '@buildbase/sdk/server';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
try {
  for (const line of readFileSync(resolve(root, '.env.local'), 'utf8').split(
    '\n'
  )) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]])
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
} catch {
  /* no .env.local: rely on the environment */
}

const serverUrl = process.env.NEXT_PUBLIC_BUILDBASE_SERVER_URL;
const apiToken = process.env.BUILDBASE_API_TOKEN;
if (!serverUrl || !apiToken) {
  console.error('Set NEXT_PUBLIC_BUILDBASE_SERVER_URL and BUILDBASE_API_TOKEN');
  process.exit(1);
}

const out = resolve(root, process.argv[2] ?? '.buildbase/content.json');
const content = await pullContent(
  createServerClient({ serverUrl, apiToken, cache: false })
);
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(content, null, 2));
const counts = Object.entries(content)
  .filter(([k]) => k !== 'generatedAt')
  .map(
    ([k, v]) =>
      `${k} ${Array.isArray(v) ? v.length : Object.keys(v ?? {}).length}`
  )
  .join(', ');
console.log(`Pulled ${counts} -> ${out}`);
