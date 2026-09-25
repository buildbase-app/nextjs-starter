#!/usr/bin/env node
/**
 * Seed a BuildBase organization with the demo content the tour expects:
 * a form, a collection, docs/FAQ/rich text, a short link, a workflow, and
 * so on. Idempotent: every module checks before it creates.
 *
 *   BUILDBASE_API_TOKEN=<orgId>:<secret> \
 *   NEXT_PUBLIC_BUILDBASE_SERVER_URL=https://api.console.buildbase.app \
 *   node scripts/seed-org.mjs [module ...]
 *
 * Reads .env.local when the variables are not set. Each module lives in
 * scripts/seed-org/<module>.mjs and exports `seed(api)`.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));

function loadEnv() {
  try {
    for (const line of readFileSync(resolve(here, '..', '.env.local'), 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch {
    /* no .env.local: rely on the environment */
  }
}
loadEnv();

const TOKEN = process.env.BUILDBASE_API_TOKEN;
const BASE = (process.env.NEXT_PUBLIC_BUILDBASE_SERVER_URL ?? '').replace(/\/$/, '');
if (!TOKEN || !BASE) {
  console.error('Set BUILDBASE_API_TOKEN and NEXT_PUBLIC_BUILDBASE_SERVER_URL');
  process.exit(1);
}

/** Minimal client over the org API, same conventions as src/lib/buildbase-admin.ts. */
export const api = {
  base: BASE,
  orgId: TOKEN.split(':')[0],
  async call(method, path, { body, query } = {}) {
    const url = new URL(`${BASE}/api/${path.replace(/^\//, '')}`);
    for (const [k, v] of Object.entries(query ?? {})) {
      if (v !== undefined) url.searchParams.set(k, typeof v === 'object' ? JSON.stringify(v) : String(v));
    }
    const isForm = typeof FormData !== 'undefined' && body instanceof FormData;
    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${TOKEN}`, ...(body && !isForm ? { 'Content-Type': 'application/json' } : {}) },
      body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
    });
    const text = await res.text();
    let parsed = null;
    try { parsed = text ? JSON.parse(text) : null; } catch { parsed = text; }
    if (!res.ok) {
      const err = new Error(`${method} ${path} → ${res.status} ${JSON.stringify(parsed).slice(0, 300)}`);
      err.status = res.status; err.body = parsed;
      throw err;
    }
    return parsed && typeof parsed === 'object' && 'data' in parsed ? parsed.data : parsed;
  },
  get(path, query) { return this.call('GET', path, { query }); },
  post(path, body) { return this.call('POST', path, { body }); },
  patch(path, body) { return this.call('PATCH', path, { body }); },
  delete(path) { return this.call('DELETE', path); },
  /** List helper: returns `docs` whether the endpoint paginates or not. */
  async list(path, query) {
    const r = await this.get(path, query);
    return Array.isArray(r) ? r : (r?.docs ?? []);
  },
};

const wanted = process.argv.slice(2);
const modules = readdirSync(resolve(here, 'seed-org'))
  .filter((f) => f.endsWith('.mjs'))
  .map((f) => f.replace(/\.mjs$/, ''))
  .filter((m) => wanted.length === 0 || wanted.includes(m))
  .sort();

for (const name of modules) {
  const mod = await import(pathToFileURL(resolve(here, 'seed-org', `${name}.mjs`)).href);
  console.log(`\n── ${name} ──`);
  await mod.seed(api);
}
console.log('\nDone.');
