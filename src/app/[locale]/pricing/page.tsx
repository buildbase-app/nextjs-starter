'use client';

import { useTranslations } from 'next-intl';
import { HomeHeader } from '@/components/home-header';
import { PricingPlans } from '@/components/pricing-plans';

export default function PricingPageRoute() {
  const t = useTranslations('pricing');
  const tHome = useTranslations('home');

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HomeHeader title={tHome('title')} />

      <main id="main-content" className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h1 className="text-foreground text-4xl font-bold tracking-tight">
              {t('title')}
            </h1>
            <p className="text-muted-foreground mt-3 text-lg">
              {t('subtitle')}
            </p>
          </div>

          <PricingPlans />
        </div>
      </main>
    </div>
  );
}
