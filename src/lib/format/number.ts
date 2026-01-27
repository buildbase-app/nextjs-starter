/**
 * Number Formatting Utilities
 *
 * Locale-aware number, currency, and percentage formatting
 * using Intl.NumberFormat.
 *
 * @example
 * import { formatNumber, formatCurrency, formatPercent } from '@/lib/format';
 *
 * formatNumber(1234567.89, 'en')           // "1,234,567.89"
 * formatCurrency(99.99, 'en', 'USD')       // "$99.99"
 * formatPercent(0.1234, 'en')              // "12.34%"
 */

/**
 * Format a number in locale-aware format
 *
 * @param num - Number to format
 * @param locale - Locale code (e.g., 'en', 'de', 'ja')
 * @param options - Additional Intl.NumberFormat options
 * @returns Formatted number string
 *
 * @example
 * formatNumber(1234567.89, 'en')      // "1,234,567.89"
 * formatNumber(1234567.89, 'de')      // "1.234.567,89"
 * formatNumber(1234567.89, 'ja')      // "1,234,567.89"
 */
export function formatNumber(
  num: number,
  locale: string = 'en',
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(num);
}

/**
 * Format a number as currency
 *
 * @param amount - Amount to format
 * @param locale - Locale code
 * @param currency - Currency code (e.g., 'USD', 'EUR', 'JPY')
 * @param options - Additional options
 * @returns Formatted currency string
 *
 * @example
 * formatCurrency(99.99, 'en', 'USD')     // "$99.99"
 * formatCurrency(99.99, 'de', 'EUR')     // "99,99 €"
 * formatCurrency(9999, 'ja', 'JPY')      // "￥9,999"
 */
export function formatCurrency(
  amount: number,
  locale: string = 'en',
  currency: string = 'USD',
  options?: Omit<Intl.NumberFormatOptions, 'style' | 'currency'>
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    ...options,
  }).format(amount);
}

/**
 * Format a number as percentage
 *
 * @param num - Number to format (0.1 = 10%)
 * @param locale - Locale code
 * @param decimals - Number of decimal places (default: 0-2)
 * @returns Formatted percentage string
 *
 * @example
 * formatPercent(0.1234, 'en')         // "12.34%"
 * formatPercent(0.5, 'en')            // "50%"
 * formatPercent(0.1234, 'de')         // "12,34 %"
 */
export function formatPercent(
  num: number,
  locale: string = 'en',
  decimals?: { min?: number; max?: number }
): string {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals?.min ?? 0,
    maximumFractionDigits: decimals?.max ?? 2,
  }).format(num);
}

/**
 * Format a number in compact notation (e.g., 1K, 1M, 1B)
 *
 * @param num - Number to format
 * @param locale - Locale code
 * @param display - 'short' (1K) or 'long' (1 thousand)
 * @returns Formatted compact number string
 *
 * @example
 * formatCompact(1234, 'en')              // "1.2K"
 * formatCompact(1234567, 'en')           // "1.2M"
 * formatCompact(1234567890, 'en')        // "1.2B"
 * formatCompact(1234, 'en', 'long')      // "1.2 thousand"
 */
export function formatCompact(
  num: number,
  locale: string = 'en',
  display: 'short' | 'long' = 'short'
): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: display,
    maximumFractionDigits: 1,
  }).format(num);
}

/**
 * Format bytes to human-readable size
 *
 * @param bytes - Number of bytes
 * @param locale - Locale code
 * @param decimals - Number of decimal places
 * @returns Formatted file size string
 *
 * @example
 * formatBytes(1024, 'en')             // "1 KB"
 * formatBytes(1234567, 'en')          // "1.18 MB"
 * formatBytes(1234567890, 'en')       // "1.15 GB"
 */
export function formatBytes(
  bytes: number,
  locale: string = 'en',
  decimals: number = 2
): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  const value = bytes / Math.pow(k, i);
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(value);

  return `${formatted} ${sizes[i]}`;
}

/**
 * Format a number with ordinal suffix (1st, 2nd, 3rd, etc.)
 *
 * @param num - Number to format
 * @param locale - Locale code (currently only 'en' fully supported)
 * @returns Number with ordinal suffix
 *
 * @example
 * formatOrdinal(1, 'en')   // "1st"
 * formatOrdinal(2, 'en')   // "2nd"
 * formatOrdinal(3, 'en')   // "3rd"
 * formatOrdinal(11, 'en')  // "11th"
 */
export function formatOrdinal(num: number, locale: string = 'en'): string {
  // English ordinals
  if (locale.startsWith('en')) {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = num % 100;
    const suffix = suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
    return `${num}${suffix}`;
  }

  // Fallback: just return the number
  return num.toString();
}

/**
 * Clamp a number between min and max
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

/**
 * Round to specified decimal places
 */
export function round(num: number, decimals: number = 0): number {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

/**
 * Check if a value is a valid number (not NaN, not Infinity)
 */
export function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}
