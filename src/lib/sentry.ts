/**
 * Sentry Utility Functions
 *
 * Helper functions for error tracking and monitoring with Sentry.
 * All functions are safe to call even when Sentry is not configured -
 * they will silently no-op if NEXT_PUBLIC_SENTRY_DSN is not set.
 *
 * @example
 * import { captureError, setUser } from '@/lib/sentry';
 *
 * // These are safe to call even without Sentry configured
 * captureError(error);
 * setUser({ id: user.id });
 */

/**
 * Check if Sentry is enabled
 */
function isSentryEnabled(): boolean {
  return !!process.env.NEXT_PUBLIC_SENTRY_DSN;
}

/**
 * Lazily import Sentry only when needed
 */
async function getSentry() {
  if (!isSentryEnabled()) return null;
  return import('@sentry/nextjs');
}

/**
 * Capture an exception with optional context
 * Safe to call without Sentry configured - will no-op
 *
 * @example
 * try {
 *   await riskyOperation();
 * } catch (error) {
 *   captureError(error, {
 *     tags: { feature: 'checkout' },
 *     extra: { userId: user.id, cartItems: items.length },
 *   });
 * }
 */
export async function captureError(
  error: unknown,
  context?: {
    tags?: Record<string, string>;
    extra?: Record<string, unknown>;
    user?: { id: string; email?: string; username?: string };
  }
) {
  const Sentry = await getSentry();
  if (!Sentry) return;

  if (context?.user) {
    Sentry.setUser(context.user);
  }

  Sentry.captureException(error, {
    tags: context?.tags,
    extra: context?.extra,
  });
}

/**
 * Synchronous version for error boundaries (can't use async in useEffect cleanup)
 * Falls back to console.error if Sentry not available
 */
export function captureErrorSync(
  error: unknown,
  context?: {
    tags?: Record<string, string>;
    extra?: Record<string, unknown>;
  }
) {
  if (!isSentryEnabled()) {
    console.error('[Error]', error, context);
    return;
  }

  // Dynamic require for sync usage
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Sentry = require('@sentry/nextjs');
    Sentry.captureException(error, {
      tags: context?.tags,
      extra: context?.extra,
    });
  } catch {
    console.error('[Error]', error, context);
  }
}

/**
 * Capture a message (non-error event)
 * Safe to call without Sentry configured - will no-op
 *
 * @example
 * captureMessage('User exceeded rate limit', 'warning', {
 *   tags: { feature: 'api' },
 *   extra: { userId, requestCount },
 * });
 */
export async function captureMessage(
  message: string,
  level: 'info' | 'warning' | 'error' = 'info',
  context?: {
    tags?: Record<string, string>;
    extra?: Record<string, unknown>;
  }
) {
  const Sentry = await getSentry();
  if (!Sentry) return;

  Sentry.captureMessage(message, {
    level,
    tags: context?.tags,
    extra: context?.extra,
  });
}

/**
 * Set user context for all subsequent events
 * Safe to call without Sentry configured - will no-op
 *
 * @example
 * // After login
 * setUser({ id: user.id, email: user.email });
 *
 * // After logout
 * clearUser();
 */
export async function setUser(user: {
  id: string;
  email?: string;
  username?: string;
  [key: string]: unknown;
}) {
  const Sentry = await getSentry();
  if (!Sentry) return;

  Sentry.setUser(user);
}

/**
 * Clear user context (e.g., on logout)
 * Safe to call without Sentry configured - will no-op
 */
export async function clearUser() {
  const Sentry = await getSentry();
  if (!Sentry) return;

  Sentry.setUser(null);
}

/**
 * Add breadcrumb for debugging context
 * Safe to call without Sentry configured - will no-op
 *
 * @example
 * addBreadcrumb({
 *   category: 'navigation',
 *   message: 'User navigated to checkout',
 *   data: { from: '/cart', to: '/checkout' },
 * });
 */
export async function addBreadcrumb(breadcrumb: {
  category?: string;
  message: string;
  level?: 'debug' | 'info' | 'warning' | 'error';
  data?: Record<string, unknown>;
}) {
  const Sentry = await getSentry();
  if (!Sentry) return;

  Sentry.addBreadcrumb({
    category: breadcrumb.category || 'app',
    message: breadcrumb.message,
    level: breadcrumb.level || 'info',
    data: breadcrumb.data,
    timestamp: Date.now() / 1000,
  });
}

/**
 * Set a tag that will be applied to all subsequent events
 * Safe to call without Sentry configured - will no-op
 *
 * @example
 * setTag('workspace', workspace.id);
 */
export async function setTag(key: string, value: string) {
  const Sentry = await getSentry();
  if (!Sentry) return;

  Sentry.setTag(key, value);
}

/**
 * Set extra context that will be applied to all subsequent events
 * Safe to call without Sentry configured - will no-op
 *
 * @example
 * setContext('workspace', {
 *   id: workspace.id,
 *   name: workspace.name,
 *   plan: workspace.plan,
 * });
 */
export async function setContext(
  name: string,
  context: Record<string, unknown>
) {
  const Sentry = await getSentry();
  if (!Sentry) return;

  Sentry.setContext(name, context);
}

/**
 * Wrap an async function with Sentry error tracking
 * Safe to call without Sentry configured - will just run the function
 *
 * @example
 * const result = await withSentry(async () => {
 *   return await criticalOperation();
 * }, { tags: { feature: 'critical' } });
 */
export async function withSentry<T>(
  fn: () => Promise<T>,
  context?: {
    tags?: Record<string, string>;
    extra?: Record<string, unknown>;
  }
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    await captureError(error, context);
    throw error;
  }
}
