import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HomeHeader } from '@/components/home-header';
import { HeroSection } from '@/components/marketing/hero-section';
import { StatsSection } from '@/components/marketing/stats-section';
import { TourPreview } from '@/components/marketing/tour-preview';
import { PricingSection } from '@/components/pricing-section';
import { CreditStore } from '@/components/credit-store';
import { CtaBanner } from '@/components/marketing/cta-banner';
import { SiteFooter } from '@/components/site-footer';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

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

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  // Naming the locale lets the page be prerendered per locale (the layout's
  // generateStaticParams) instead of rendered on every request from headers.
  setRequestLocale(locale);
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
        <TourPreview />
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
