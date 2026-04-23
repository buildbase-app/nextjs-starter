import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';
import { withContentlayer } from 'next-contentlayer2';
import { withSentryConfig, type SentryBuildOptions } from '@sentry/nextjs';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Next.js 16+ has instrumentation enabled by default
  // Enable standalone output for Docker builds (Vercel ignores this)
  output: process.env.DOCKER_BUILD ? 'standalone' : undefined,
  // Trace MDX files into production bundle for runtime fs access (RSS feeds)
  outputFileTracingIncludes: {
    '/**': ['./src/content/**/*.mdx'],
  },
};

// Compose plugins: first intl, then contentlayer, then bundle analyzer
const composedConfig = withBundleAnalyzer(
  withContentlayer(withNextIntl(nextConfig))
);

// Only wrap with Sentry if DSN is configured
const isSentryEnabled = !!process.env.NEXT_PUBLIC_SENTRY_DSN;

// Sentry configuration options
const sentryConfig: SentryBuildOptions = {
  // Suppress source map upload logs
  silent: !process.env.CI,

  // Upload source maps for better stack traces
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Route browser requests to Sentry through a Next.js rewrite
  // to circumvent ad-blockers (optional)
  tunnelRoute: '/monitoring',

  // Source map options
  sourcemaps: {
    // Delete source maps after upload to hide them from clients
    deleteSourcemapsAfterUpload: true,
  },

  // Bundle size optimizations
  bundleSizeOptimizations: {
    // Tree-shake Sentry debug statements
    excludeDebugStatements: true,
  },

  // Webpack-specific options
  webpack: {
    // Enable component annotations for better error context
    reactComponentAnnotation: {
      enabled: true,
    },
    // Automatically instrument API routes
    autoInstrumentServerFunctions: true,
    autoInstrumentMiddleware: true,
    autoInstrumentAppDirectory: true,
  },
};

// Export with or without Sentry wrapper based on configuration
export default isSentryEnabled
  ? withSentryConfig(composedConfig, sentryConfig)
  : composedConfig;
