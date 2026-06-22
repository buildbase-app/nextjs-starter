'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import {
  WhenAuthenticated,
  WhenUnauthenticated,
  useSaaSAuth,
} from '@buildbase/sdk/react';

function SignInButton({ label }: { label: string }) {
  const { signIn } = useSaaSAuth();
  return (
    <Button size="lg" className="gap-2 px-8" onClick={() => signIn()}>
      {label}
      <ArrowRight className="h-4 w-4" />
    </Button>
  );
}

export function CtaBanner() {
  const t = useTranslations('home');

  return (
    <section className="w-full px-6 py-20">
      <div className="from-primary/10 via-primary/5 border-primary/20 mx-auto max-w-4xl rounded-2xl border bg-gradient-to-br to-transparent px-8 py-16 text-center">
        <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
          {t('cta.heading')}
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg">
          {t('cta.description')}
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <WhenUnauthenticated>
            <SignInButton label={t('cta.signIn')} />
          </WhenUnauthenticated>
          <WhenAuthenticated>
            <Button size="lg" className="gap-2 px-8" asChild>
              <Link href="/dashboard">
                {t('cta.openDashboard')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </WhenAuthenticated>
          <Button size="lg" variant="outline" asChild>
            <Link href="/blog">{t('cta.howBuilt')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
