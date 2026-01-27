/**
 * Date Formatting Utilities
 *
 * Locale-aware date and time formatting using Intl.DateTimeFormat
 * and Intl.RelativeTimeFormat.
 *
 * @example
 * import { formatDate, formatRelativeTime } from '@/lib/format';
 *
 * formatDate(new Date(), 'en')           // "January 27, 2024"
 * formatDateTime(new Date(), 'de')       // "27. Jan. 2024, 14:30"
 * formatRelativeTime(pastDate, 'en')     // "2 days ago"
 */

export type DateStyle = 'full' | 'long' | 'medium' | 'short';

/**
 * Format a date in locale-aware format
 *
 * @param date - Date to format
 * @param locale - Locale code (e.g., 'en', 'de', 'ja')
 * @param style - Date style: 'full', 'long', 'medium', 'short'
 * @returns Formatted date string
 *
 * @example
 * formatDate(new Date('2024-01-27'), 'en')        // "January 27, 2024"
 * formatDate(new Date('2024-01-27'), 'de')        // "27. Januar 2024"
 * formatDate(new Date('2024-01-27'), 'ja')        // "2024年1月27日"
 * formatDate(new Date('2024-01-27'), 'en', 'short') // "1/27/24"
 */
export function formatDate(
  date: Date | string | number,
  locale: string = 'en',
  style: DateStyle = 'long'
): string {
  const d = date instanceof Date ? date : new Date(date);

  return new Intl.DateTimeFormat(locale, {
    dateStyle: style,
  }).format(d);
}

/**
 * Format a date with time in locale-aware format
 *
 * @param date - Date to format
 * @param locale - Locale code
 * @param dateStyle - Date style
 * @param timeStyle - Time style
 * @returns Formatted date and time string
 *
 * @example
 * formatDateTime(new Date(), 'en')    // "Jan 27, 2024, 2:30 PM"
 * formatDateTime(new Date(), 'de')    // "27. Jan. 2024, 14:30"
 */
export function formatDateTime(
  date: Date | string | number,
  locale: string = 'en',
  dateStyle: DateStyle = 'medium',
  timeStyle: DateStyle = 'short'
): string {
  const d = date instanceof Date ? date : new Date(date);

  return new Intl.DateTimeFormat(locale, {
    dateStyle,
    timeStyle,
  }).format(d);
}

/**
 * Format time only in locale-aware format
 *
 * @param date - Date to format
 * @param locale - Locale code
 * @param style - Time style
 * @returns Formatted time string
 *
 * @example
 * formatTime(new Date(), 'en')        // "2:30 PM"
 * formatTime(new Date(), 'de')        // "14:30"
 */
export function formatTime(
  date: Date | string | number,
  locale: string = 'en',
  style: DateStyle = 'short'
): string {
  const d = date instanceof Date ? date : new Date(date);

  return new Intl.DateTimeFormat(locale, {
    timeStyle: style,
  }).format(d);
}

type RelativeTimeUnit =
  | 'year'
  | 'month'
  | 'week'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second';

/**
 * Format a date as relative time (e.g., "2 days ago", "in 3 hours")
 *
 * @param date - Date to format
 * @param locale - Locale code
 * @param now - Reference date (defaults to current time)
 * @returns Relative time string
 *
 * @example
 * // Assuming now is Jan 27, 2024
 * formatRelativeTime(new Date('2024-01-25'), 'en')  // "2 days ago"
 * formatRelativeTime(new Date('2024-01-28'), 'en')  // "tomorrow"
 * formatRelativeTime(new Date('2024-01-27'), 'en')  // "today"
 */
export function formatRelativeTime(
  date: Date | string | number,
  locale: string = 'en',
  now: Date = new Date()
): string {
  const d = date instanceof Date ? date : new Date(date);
  const diffMs = d.getTime() - now.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);
  const diffWeek = Math.round(diffDay / 7);
  const diffMonth = Math.round(diffDay / 30);
  const diffYear = Math.round(diffDay / 365);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  // Choose appropriate unit
  let value: number;
  let unit: RelativeTimeUnit;

  if (Math.abs(diffYear) >= 1) {
    value = diffYear;
    unit = 'year';
  } else if (Math.abs(diffMonth) >= 1) {
    value = diffMonth;
    unit = 'month';
  } else if (Math.abs(diffWeek) >= 1) {
    value = diffWeek;
    unit = 'week';
  } else if (Math.abs(diffDay) >= 1) {
    value = diffDay;
    unit = 'day';
  } else if (Math.abs(diffHour) >= 1) {
    value = diffHour;
    unit = 'hour';
  } else if (Math.abs(diffMin) >= 1) {
    value = diffMin;
    unit = 'minute';
  } else {
    value = diffSec;
    unit = 'second';
  }

  return rtf.format(value, unit);
}

/**
 * Check if a date is today
 */
export function isToday(date: Date | string | number): boolean {
  const d = date instanceof Date ? date : new Date(date);
  const today = new Date();

  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if a date is in the past
 */
export function isPast(date: Date | string | number): boolean {
  const d = date instanceof Date ? date : new Date(date);
  return d.getTime() < Date.now();
}

/**
 * Check if a date is in the future
 */
export function isFuture(date: Date | string | number): boolean {
  const d = date instanceof Date ? date : new Date(date);
  return d.getTime() > Date.now();
}

/**
 * Get start of day (00:00:00.000)
 */
export function startOfDay(date: Date | string | number): Date {
  const d = date instanceof Date ? new Date(date) : new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Get end of day (23:59:59.999)
 */
export function endOfDay(date: Date | string | number): Date {
  const d = date instanceof Date ? new Date(date) : new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}
