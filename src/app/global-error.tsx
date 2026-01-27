'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

/**
 * Global Error Boundary
 *
 * Catches errors in the root layout and reports them to Sentry.
 * This is the last line of defense for unhandled errors.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Report to Sentry
    Sentry.captureException(error, {
      tags: {
        errorBoundary: 'global',
      },
      extra: {
        digest: error.digest,
      },
    });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 dark:bg-gray-900">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/20">
                <AlertCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
              </div>
            </div>

            <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Something went wrong
            </h1>

            <p className="mb-6 max-w-md text-gray-600 dark:text-gray-400">
              An unexpected error occurred. Our team has been notified and is
              working to fix this issue.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <div className="mb-6 max-w-lg rounded-lg bg-gray-100 p-4 text-left dark:bg-gray-800">
                <p className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                  Error Details:
                </p>
                <code className="break-all text-xs text-gray-700 dark:text-gray-300">
                  {error.message}
                </code>
                {error.digest && (
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Digest: {error.digest}
                  </p>
                )}
              </div>
            )}

            <Button onClick={reset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
