/**
 * Format Utilities
 *
 * Centralized formatting utilities for dates, numbers, and strings.
 * All functions are locale-aware where applicable.
 *
 * @example
 * import {
 *   formatDate,
 *   formatCurrency,
 *   slugify
 * } from '@/lib/format';
 */

// Date utilities
export {
  formatDate,
  formatDateTime,
  formatTime,
  formatRelativeTime,
  isToday,
  isPast,
  isFuture,
  startOfDay,
  endOfDay,
  type DateStyle,
} from './date';

// Number utilities
export {
  formatNumber,
  formatCurrency,
  formatPercent,
  formatCompact,
  formatBytes,
  formatOrdinal,
  clamp,
  round,
  isValidNumber,
} from './number';

// String utilities
export {
  slugify,
  truncate,
  truncateMiddle,
  capitalize,
  titleCase,
  camelCase,
  kebabCase,
  snakeCase,
  stripHtml,
  escapeHtml,
  initials,
  pluralize,
  isBlank,
  isNotBlank,
  mask,
} from './string';
