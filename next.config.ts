import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Remove "output: export" if you need API routes
  // Add it back if you want static export (but API routes won't work)
};

export default withNextIntl(nextConfig);
