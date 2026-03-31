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
      className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:px-4 focus-visible:py-2 focus-visible:bg-background focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-md focus-visible:outline-none"
    >
      {t('accessibility.skipToContent')}
    </a>
  );
}
