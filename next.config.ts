import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import bundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Remove "output: export" if you need API routes
  // Add it back if you want static export (but API routes won't work)
};

// Compose plugins: first intl, then bundle analyzer
export default withBundleAnalyzer(withNextIntl(nextConfig));
