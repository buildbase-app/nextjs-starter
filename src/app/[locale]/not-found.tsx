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
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
      <main id="main-content" className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-muted p-4">
            <FileQuestion className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>

        <p className="mb-2 text-6xl font-bold text-foreground">404</p>

        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-foreground">
          {t('notFound.title')}
        </h1>

        <p className="mb-6 max-w-md text-muted-foreground">
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
