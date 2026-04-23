import type { Metadata } from 'next';
import { HomeHeader } from '@/components/home-header';
import { PricingSection } from '@/components/pricing-section';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import type { Locale } from '@/i18n/config';
import { buildMarketingMetadata } from '@/lib/seo/marketing-metadata';
import { getTranslations } from 'next-intl/server';

interface PricingPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PricingPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });

  return buildMarketingMetadata({
    path: '/pricing',
    locale: locale as Locale,
    title: t('title'),
    description: t('subtitle'),
  });
}

export default async function PricingPageRoute({ params }: PricingPageProps) {
  const { locale } = await params;
  const [t, tHome] = await Promise.all([
    getTranslations({ locale, namespace: 'pricing' }),
    getTranslations({ locale, namespace: 'home' }),
  ]);

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HomeHeader title={tHome('title')} />
      <BreadcrumbJsonLd items={[{ name: t('title'), url: '/pricing' }]} />

      <main id="main-content" className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <PricingSection title={t('title')} description={t('subtitle')} />
        </div>
      </main>
    </div>
  );
}
