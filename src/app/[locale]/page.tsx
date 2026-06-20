import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HomeHeader } from '@/components/home-header';
import { HeroSection } from '@/components/marketing/hero-section';
import { FeaturesSection } from '@/components/marketing/features-section';
import { StatsSection } from '@/components/marketing/stats-section';
import { PricingSection } from '@/components/pricing-section';
import { CreditStore } from '@/components/credit-store';
import { CtaBanner } from '@/components/marketing/cta-banner';
import { SiteFooter } from '@/components/site-footer';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('home');

  return {
    title: {
      absolute: t('meta.title'),
    },
    description: t('meta.description'),
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
    },
  };
}

export default async function HomePage() {
  const [t, tPricing, tStore] = await Promise.all([
    getTranslations('home'),
    getTranslations('pricing'),
    getTranslations('creditStore'),
  ]);

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HomeHeader title={t('title')} />

      <main id="main-content" className="flex flex-1 flex-col items-center">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <div className="w-full max-w-6xl px-6 py-20">
          <PricingSection
            title={tPricing('title')}
            description={tPricing('subtitle')}
          />
        </div>
        <section className="w-full max-w-5xl px-6 pb-20">
          <div className="mb-8 text-center">
            <h3 className="text-foreground text-3xl font-bold tracking-tight">
              {tStore('title')}
            </h3>
            <p className="text-muted-foreground mt-2 text-lg">
              {tStore('subtitle')}
            </p>
          </div>
          <CreditStore />
        </section>
        <CtaBanner />
      </main>

      <SiteFooter title={t('title')} />
    </div>
  );
}
