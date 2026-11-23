import type { Metadata } from 'next';
import { SiteShell } from '@/components/site-shell';
import { PricingSection } from '@/components/pricing-section';
import { CreditPacks } from '@/components/billing/credit-packs';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import type { Locale } from '@/i18n/config';
import { buildMarketingMetadata } from '@/lib/seo/marketing-metadata';
import { getTranslations, setRequestLocale } from 'next-intl/server';

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
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pricing' });

  return (
    <SiteShell>
      <BreadcrumbJsonLd items={[{ name: t('title'), url: '/pricing' }]} />
      <div className="mx-auto max-w-7xl px-6 pt-14 pb-20 md:pt-20">
        <PricingSection
          title={t('title')}
          description={t('subtitle')}
          headingLevel="h1"
        />
        <CreditPacks />
      </div>
    </SiteShell>
  );
}
