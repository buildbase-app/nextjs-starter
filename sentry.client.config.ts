import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance Monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Environment
  environment: process.env.NODE_ENV,

  // Only enable in production or when DSN is set
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Integrations
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
    Sentry.browserTracingIntegration(),
  ],

  // Filter out non-critical errors
  beforeSend(event) {
    // Don't send events in development unless explicitly enabled
    if (
      process.env.NODE_ENV === 'development' &&
      !process.env.NEXT_PUBLIC_SENTRY_DEBUG
    ) {
      return null;
    }

    return event;
  },

  // Ignore common non-critical errors
  ignoreErrors: [
    // Network errors
    'NetworkError',
    'Failed to fetch',
    'Load failed',
    'Network request failed',
    // User-initiated
    'AbortError',
    'ResizeObserver loop',
    // Browser extensions
    /^chrome-extension:\/\//,
    /^moz-extension:\/\//,
  ],
});
