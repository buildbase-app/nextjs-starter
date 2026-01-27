'use client';

import { useTranslations } from 'next-intl';

/**
 * Skip-to-Content Link
 *
 * Accessibility feature for keyboard and screen reader users.
 * Allows users to skip navigation and jump directly to main content.
 *
 * - Hidden by default (sr-only)
 * - Becomes visible when focused via keyboard (Tab)
 * - Links to #main-content anchor
 */
export function SkipLink() {
  const t = useTranslations('common');

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:ring-2 focus:ring-ring focus:rounded-md focus:outline-none"
    >
      {t('accessibility.skipToContent')}
    </a>
  );
}
