import type { Locale } from './config';

const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year in seconds

/**
 * Set the locale preference cookie
 */
export function setLocaleCookie(locale: Locale): void {
  if (typeof document === 'undefined') return;

  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

/**
 * Get the current locale from cookie
 */
export function getLocaleCookie(): Locale | null {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${LOCALE_COOKIE_NAME}=([^;]*)`)
  );
  return match ? (match[1] as Locale) : null;
}

/**
 * Reset the locale cookie (remove it)
 * User will be redirected based on Accept-Language header on next visit
 */
export function resetLocaleCookie(): void {
  if (typeof document === 'undefined') return;

  document.cookie = `${LOCALE_COOKIE_NAME}=; path=/; max-age=0`;
}
