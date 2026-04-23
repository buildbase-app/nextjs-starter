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
      <pre>{JSON.stringify({ isLoading, status }, null, 2)}</pre>
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

interface HomeHeaderProps {
  title: string;
}

export function HomeHeader({ title }: HomeHeaderProps) {
  return (
    <header className="bg-background flex items-center justify-between border-b px-6 py-4">
      <h1 className="text-foreground text-xl font-semibold">{title}</h1>
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
        <AuthButton />
      </div>
    </header>
  );
}
