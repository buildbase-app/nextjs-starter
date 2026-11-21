// Cloudflare Workers build config (OpenNext). Only read by `npm run cf:build`,
// `cf:preview` and `cf:deploy`; Vercel and Docker builds ignore this file.
//
// Incremental cache: the read-only static-assets cache serves pages that were
// prerendered at build time (blog posts, changelog entries, privacy, terms)
// from the Worker's assets. Those pages render MDX, which Workers cannot
// evaluate at request time (no `new Function`), so they must be served from
// the build. Pages with `revalidate` are not regenerated between deploys;
// for ISR, switch to an R2 cache: bind NEXT_INC_CACHE_R2_BUCKET in
// wrangler.jsonc and use r2IncrementalCache
// (https://opennext.js.org/cloudflare/caching).
import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});
