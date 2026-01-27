import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Next.js 16+ has instrumentation enabled by default
};

// Compose plugins: first intl, then bundle analyzer
const composedConfig = withBundleAnalyzer(withNextIntl(nextConfig));

// Sentry configuration options
const sentryConfig = {
  // Suppress source map upload logs
  silent: !process.env.CI,

  // Upload source maps for better stack traces
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Only upload source maps in production builds
  disableServerWebpackPlugin: process.env.NODE_ENV !== 'production',
  disableClientWebpackPlugin: process.env.NODE_ENV !== 'production',

  // Route browser requests to Sentry through a Next.js rewrite
  // to circumvent ad-blockers (optional)
  tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements
  disableLogger: true,

  // Enable component annotations for better error context
  reactComponentAnnotation: {
    enabled: true,
  },

  // Automatically instrument API routes
  autoInstrumentServerFunctions: true,
  autoInstrumentMiddleware: true,
  autoInstrumentAppDirectory: true,
};

// Wrap with Sentry
export default withSentryConfig(composedConfig, sentryConfig);
