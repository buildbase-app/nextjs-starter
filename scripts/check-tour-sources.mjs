#!/usr/bin/env node
/**
 * Every tour task links to the files in this repo that implement it. This
 * fails when one of those paths no longer exists, so a visitor following
 * "In this app" never lands on a GitHub 404.
 */
import { existsSync, readFileSync } from 'node:fs';

const src = readFileSync('src/tour/catalog.ts', 'utf8');
const paths = [
  ...new Set(
    [...src.matchAll(/app:\s*\[([^\]]*)\]/g)].flatMap((m) =>
      [...m[1].matchAll(/['"]([^'"]+)['"]/g)].map((x) => x[1])
    )
  ),
];
const missing = paths.filter((p) => !existsSync(p.replace(/\/\*$/, '')));
if (missing.length) {
  console.error(`Tour links to ${missing.length} missing path(s):`);
  for (const p of missing) console.error(`  ${p}`);
  process.exit(1);
}
console.log(`Tour source links: ${paths.length} paths, all present.`);
