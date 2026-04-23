'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';

/**
 * Not Found (404) Page
 *
 * Displayed when a user navigates to a page that doesn't exist.
 * Localized for all supported languages.
 */
export default function NotFound() {
  const t = useTranslations('errors');

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-6">
      <main id="main-content" className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-muted rounded-full p-4">
            <FileQuestion className="text-muted-foreground h-12 w-12" />
          </div>
        </div>

        <p className="text-foreground mb-2 text-6xl font-bold">404</p>

        <h1 className="text-foreground mb-2 text-2xl font-semibold tracking-tight">
          {t('notFound.title')}
        </h1>

        <p className="text-muted-foreground mb-6 max-w-md">
          {t('notFound.description')}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button variant="default" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              {t('generic.goHome')}
            </Link>
          </Button>

          <Button
            variant="outline"
            onClick={() =>
              typeof window !== 'undefined' && window.history.back()
            }
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('notFound.goBack')}
          </Button>
        </div>
      </main>
    </div>
  );
}
