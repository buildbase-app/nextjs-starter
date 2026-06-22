import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed', // Only show locale prefix for non-default locales
  localeDetection: false, // Locale is URL-only; no cookie/Accept-Language auto-redirect
});

// Export navigation helpers for use in components
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
