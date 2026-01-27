import * as Sentry from '@sentry/nextjs';

/**
 * Sentry Utility Functions
 *
 * Helper functions for error tracking and monitoring with Sentry.
 * Use these throughout the application for consistent error reporting.
 */

/**
 * Capture an exception with optional context
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
export function captureError(
  error: unknown,
  context?: {
    tags?: Record<string, string>;
    extra?: Record<string, unknown>;
    user?: { id: string; email?: string; username?: string };
  }
) {
  if (context?.user) {
    Sentry.setUser(context.user);
  }

  Sentry.captureException(error, {
    tags: context?.tags,
    extra: context?.extra,
  });
}

/**
 * Capture a message (non-error event)
 *
 * @example
 * captureMessage('User exceeded rate limit', 'warning', {
 *   tags: { feature: 'api' },
 *   extra: { userId, requestCount },
 * });
 */
export function captureMessage(
  message: string,
  level: 'info' | 'warning' | 'error' = 'info',
  context?: {
    tags?: Record<string, string>;
    extra?: Record<string, unknown>;
  }
) {
  Sentry.captureMessage(message, {
    level,
    tags: context?.tags,
    extra: context?.extra,
  });
}

/**
 * Set user context for all subsequent events
 *
 * @example
 * // After login
 * setUser({ id: user.id, email: user.email });
 *
 * // After logout
 * clearUser();
 */
export function setUser(user: {
  id: string;
  email?: string;
  username?: string;
  [key: string]: unknown;
}) {
  Sentry.setUser(user);
}

/**
 * Clear user context (e.g., on logout)
 */
export function clearUser() {
  Sentry.setUser(null);
}

/**
 * Add breadcrumb for debugging context
 *
 * @example
 * addBreadcrumb({
 *   category: 'navigation',
 *   message: 'User navigated to checkout',
 *   data: { from: '/cart', to: '/checkout' },
 * });
 */
export function addBreadcrumb(breadcrumb: {
  category?: string;
  message: string;
  level?: 'debug' | 'info' | 'warning' | 'error';
  data?: Record<string, unknown>;
}) {
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
 *
 * @example
 * setTag('workspace', workspace.id);
 */
export function setTag(key: string, value: string) {
  Sentry.setTag(key, value);
}

/**
 * Set extra context that will be applied to all subsequent events
 *
 * @example
 * setContext('workspace', {
 *   id: workspace.id,
 *   name: workspace.name,
 *   plan: workspace.plan,
 * });
 */
export function setContext(name: string, context: Record<string, unknown>) {
  Sentry.setContext(name, context);
}

/**
 * Start a performance transaction span
 *
 * @example
 * const span = startSpan('fetch-users');
 * const users = await fetchUsers();
 * span?.end();
 */
export function startSpan(name: string, op?: string) {
  return Sentry.startInactiveSpan({
    name,
    op: op || 'function',
  });
}

/**
 * Wrap an async function with Sentry error tracking
 *
 * @example
 * const safeOperation = withSentry(async () => {
 *   const result = await riskyOperation();
 *   return result;
 * }, { tags: { feature: 'critical' } });
 */
export function withSentry<T>(
  fn: () => Promise<T>,
  context?: {
    tags?: Record<string, string>;
    extra?: Record<string, unknown>;
  }
): Promise<T> {
  return fn().catch((error) => {
    captureError(error, context);
    throw error;
  });
}
