'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { logger } from '@/lib/logger';
import { captureErrorSync } from '@/lib/sentry';

/**
 * Error Boundary Component
 *
 * Catches runtime errors in the page and displays a user-friendly error page.
 * Automatically logs errors and reports to Sentry (if configured).
 */
interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations('errors');

  useEffect(() => {
    // Log error locally
    logger.error('Page error caught by error boundary', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });

    // Report to Sentry (safe to call even if Sentry not configured)
    captureErrorSync(error, {
      tags: { errorBoundary: 'locale' },
      extra: { digest: error.digest },
    });
  }, [error]);

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-6">
      <main id="main-content" className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-destructive/10 rounded-full p-4">
            <AlertCircle className="text-destructive h-12 w-12" />
          </div>
        </div>

        <h1 className="text-foreground mb-2 text-3xl font-bold tracking-tight">
          {t('generic.title')}
        </h1>

        <p className="text-muted-foreground mb-6 max-w-md">
          {t('generic.description')}
        </p>

        {process.env.NODE_ENV === 'development' ? (
          <div className="bg-muted mb-6 max-w-lg rounded-lg p-4 text-left">
            <p className="text-foreground mb-2 text-sm font-medium">
              Error Details:
            </p>
            <code className="text-muted-foreground text-xs break-all">
              {error.message}
            </code>
            {error.digest ? (
              <p className="text-muted-foreground mt-2 text-xs">
                Digest: {error.digest}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset} variant="default">
            <RefreshCw className="mr-2 h-4 w-4" />
            {t('generic.tryAgain')}
          </Button>

          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              {t('generic.goHome')}
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
