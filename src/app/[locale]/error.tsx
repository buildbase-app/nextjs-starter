'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { logger } from '@/lib/logger';

/**
 * Error Boundary Component
 *
 * Catches runtime errors in the page and displays a user-friendly error page.
 * Automatically logs errors and provides recovery options.
 */
interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations('errors');

  useEffect(() => {
    // Log error to monitoring service
    logger.error('Page error caught by error boundary', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
      <main id="main-content" className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
        </div>

        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
          {t('generic.title')}
        </h1>

        <p className="mb-6 max-w-md text-muted-foreground">
          {t('generic.description')}
        </p>

        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 max-w-lg rounded-lg bg-muted p-4 text-left">
            <p className="mb-2 text-sm font-medium text-foreground">
              Error Details:
            </p>
            <code className="text-xs text-muted-foreground break-all">
              {error.message}
            </code>
            {error.digest && (
              <p className="mt-2 text-xs text-muted-foreground">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}

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
