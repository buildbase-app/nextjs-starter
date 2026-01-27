/**
 * Next.js Instrumentation
 *
 * This file is used to initialize monitoring and observability tools.
 * Sentry is only loaded if NEXT_PUBLIC_SENTRY_DSN is configured.
 */

export async function register() {
  // Only load Sentry if DSN is configured
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return;
  }

  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('../sentry.edge.config');
  }
}

export const onRequestError = async (
  error: { digest: string } & Error,
  request: {
    path: string;
    method: string;
    headers: { [key: string]: string };
  },
  context: {
    routerKind: 'Pages Router' | 'App Router';
    routePath: string;
    routeType: 'render' | 'route' | 'action' | 'middleware';
    renderSource:
      | 'react-server-components'
      | 'react-server-components-payload'
      | 'server-rendering';
    revalidateReason: 'on-demand' | 'stale' | undefined;
    renderType: 'dynamic' | 'dynamic-resume';
  }
) => {
  // Only report to Sentry if DSN is configured
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return;
  }

  const Sentry = await import('@sentry/nextjs');

  Sentry.captureException(error, {
    extra: {
      request: {
        path: request.path,
        method: request.method,
      },
      context,
    },
    tags: {
      routerKind: context.routerKind,
      routeType: context.routeType,
      routePath: context.routePath,
    },
  });
};
