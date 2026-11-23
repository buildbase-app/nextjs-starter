'use client';

import { useTranslations } from 'next-intl';
import { RepoLink } from '@/components/repo-link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Link } from '@/i18n/routing';
import {
  useSaaSAuth,
  WhenAuthenticated,
  WhenUnauthenticated,
} from '@buildbase/sdk/react';

function AuthButton() {
  const { signIn, isLoading, status } = useSaaSAuth();
  const t = useTranslations('common');

  if (status === 'loading' || status === 'authenticating' || isLoading) {
    // Same footprint as the Sign In button it turns into: a wider
    // "Loading..." label pushed the header off a 360px phone until the
    // session check finished, then jumped back.
    return (
      <Button disabled aria-busy="true">
        <span className="sr-only">{t('buttons.loading')}</span>
        <span aria-hidden className="opacity-60">
          {t('buttons.signIn')}
        </span>
      </Button>
    );
  }

  return (
    <>
      <WhenUnauthenticated>
        <Button onClick={() => signIn()}>{t('buttons.signIn')}</Button>
      </WhenUnauthenticated>
      <WhenAuthenticated>
        <Button asChild>
          <Link href="/dashboard">{t('nav.dashboard')}</Link>
        </Button>
      </WhenAuthenticated>
    </>
  );
}

const NAV_HREFS = ['/#tour', '/pricing', '/blog', '/changelog'] as const;

type NavHref = (typeof NAV_HREFS)[number];

interface HomeHeaderProps {
  title: string;
}

export function HomeHeader({ title }: HomeHeaderProps) {
  const t = useTranslations('common');

  const NAV_LINK_KEYS: Record<NavHref, string> = {
    '/#tour': t('footer.links.tour'),
    '/pricing': t('footer.links.pricing'),
    '/blog': t('footer.links.blog'),
    '/changelog': t('footer.links.changelog'),
  };

  return (
    <header className="bg-background/85 supports-[backdrop-filter]:bg-background/70 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:gap-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-foreground flex items-center gap-2.5 text-base font-semibold tracking-[-0.02em] whitespace-nowrap sm:text-lg"
          >
            <span
              aria-hidden
              className="bg-brand inline-block size-3 rounded-[3px]"
            />
            {title}
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_HREFS.map((href) => (
              <Link
                key={href}
                href={href}
                className="text-muted-foreground hover:text-foreground rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
              >
                {NAV_LINK_KEYS[href]}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:contents">
            <RepoLink label={t('footer.links.github')} />
          </span>
          <LanguageSwitcher />
          <ThemeToggle />
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
