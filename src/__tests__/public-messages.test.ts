import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { PUBLIC_CLIENT_NAMESPACES } from '@/i18n/public-namespaces';

/**
 * The locale layout sends the browser only PUBLIC_CLIENT_NAMESPACES. A client
 * component on a public page that reads any other namespace would render its
 * key instead of text, so this walks every non-dashboard route's imports,
 * from the first 'use client' file down, and lists what they read.
 */
const SRC = path.resolve(__dirname, '..');
const LOCALE = path.join(SRC, 'app', '[locale]');

function resolveImport(from: string, spec: string): string | null {
  let base: string;
  if (spec.startsWith('@/')) base = path.join(SRC, spec.slice(2));
  else if (spec.startsWith('.')) base = path.resolve(path.dirname(from), spec);
  else return null;
  for (const candidate of [
    base,
    `${base}.tsx`,
    `${base}.ts`,
    path.join(base, 'index.tsx'),
    path.join(base, 'index.ts'),
  ]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile())
      return candidate;
  }
  return null;
}

function publicEntries(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory())
      return entry.name === 'dashboard' ? [] : publicEntries(full);
    return /\.tsx?$/.test(entry.name) ? [full] : [];
  });
}

function namespacesReadOnPublicPages(): Map<string, string[]> {
  const found = new Map<string, string[]>();
  const seen = new Set<string>();
  const walk = (file: string, inClient: boolean) => {
    const key = `${file}:${inClient}`;
    if (seen.has(key)) return;
    seen.add(key);
    const source = fs.readFileSync(file, 'utf8');
    const client = inClient || /^['"]use client['"]/m.test(source);
    if (client) {
      for (const m of source.matchAll(/useTranslations\(\s*'([^']+)'/g)) {
        const ns = m[1].split('.')[0];
        found.set(ns, [...(found.get(ns) ?? []), path.relative(SRC, file)]);
      }
      if (/useTranslations\(\s*\)/.test(source))
        found.set('(all)', [path.relative(SRC, file)]);
    }
    for (const m of source.matchAll(
      /(?:import|export)[^'"]*?from\s+['"]([^'"]+)['"]/g
    )) {
      const next = resolveImport(file, m[1]);
      if (next) walk(next, client);
    }
  };
  for (const entry of [
    ...publicEntries(LOCALE),
    path.join(SRC, 'app', 'global-error.tsx'),
  ])
    walk(entry, false);
  return found;
}

describe('public pages ship the messages their client components read', () => {
  it('every namespace read on a public page is in PUBLIC_CLIENT_NAMESPACES', () => {
    const allowed = new Set<string>(PUBLIC_CLIENT_NAMESPACES);
    const missing = [...namespacesReadOnPublicPages()]
      .filter(([ns]) => !allowed.has(ns))
      .map(([ns, files]) => `${ns}: ${[...new Set(files)].join(', ')}`);
    expect(missing).toEqual([]);
  });
});
