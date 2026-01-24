import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Only show locale prefix for non-default locales
  localeDetection: true, // Enable browser language detection + cookie persistence
});

// Cookie name used by next-intl: NEXT_LOCALE
// The cookie is automatically set when user navigates to a locale
// Priority: 1. URL locale prefix, 2. NEXT_LOCALE cookie, 3. Accept-Language header

// Export navigation helpers for use in components
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
