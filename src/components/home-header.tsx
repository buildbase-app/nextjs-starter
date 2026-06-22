'use client';

import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
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
    return (
      <Button variant="outline" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        {t('buttons.loading')}
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

const NAV_HREFS = [
  '/#features',
  '/pricing',
  '/blog',
  '/changelog',
  '/about',
] as const;

type NavHref = (typeof NAV_HREFS)[number];

interface HomeHeaderProps {
  title: string;
}

export function HomeHeader({ title }: HomeHeaderProps) {
  const t = useTranslations('common');

  const NAV_LINK_KEYS: Record<NavHref, string> = {
    '/#features': t('footer.links.features'),
    '/pricing': t('footer.links.pricing'),
    '/blog': t('footer.links.blog'),
    '/changelog': t('footer.links.changelog'),
    '/about': t('footer.links.about'),
  };

  return (
    <header className="bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex items-center justify-between border-b px-6 py-4 backdrop-blur-md">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="text-foreground text-xl font-bold tracking-tight"
        >
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
        <LanguageSwitcher />
        <ThemeToggle />
        <AuthButton />
      </div>
    </header>
  );
}
