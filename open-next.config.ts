// Cloudflare Workers build config (OpenNext). Only read by `npm run cf:build`,
// `cf:preview` and `cf:deploy`; Vercel and Docker builds ignore this file.
//
// Caching: with no cache configured, ISR, `revalidate` and `revalidateTag`
// render fresh on each request instead of serving from a cache. To cache,
// create an R2 bucket, bind it as NEXT_INC_CACHE_R2_BUCKET in wrangler.jsonc
// and pass `incrementalCache: r2IncrementalCache` here
// (https://opennext.js.org/cloudflare/caching).
import { defineCloudflareConfig } from '@opennextjs/cloudflare';

export default defineCloudflareConfig();
