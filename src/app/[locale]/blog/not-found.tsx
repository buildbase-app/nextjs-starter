'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function BlogNotFound() {
  const t = useTranslations('errors');

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center">
      <p className="text-primary font-mono text-sm tracking-wider uppercase">
        404
      </p>
      <h1 className="text-foreground mt-3 text-3xl font-bold tracking-tight md:text-5xl">
        {t('blogNotFound.title')}
      </h1>
      <p className="text-muted-foreground mt-4 max-w-md text-base md:text-lg">
        {t('blogNotFound.description')}
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/blog"
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-5 py-2.5 text-sm font-medium transition-colors"
        >
          {t('blogNotFound.browseAll')}
        </Link>
        <Link
          href="/"
          className="border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 rounded-md border px-5 py-2.5 text-sm transition-colors"
        >
          {t('generic.goHome')}
        </Link>
      </div>
    </div>
  );
}
