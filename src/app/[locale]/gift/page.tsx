import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HomeHeader } from '@/components/home-header';
import { GiftClaim } from '@/components/shop/gift-claim';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'gifts' });
  // A personal link from an email: never indexed.
  return { title: t('pageTitle'), robots: { index: false, follow: false } };
}

/** Where a gift's email sends its recipient, signed in or not. */
export default async function GiftPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tHome = await getTranslations({ locale, namespace: 'home' });
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HomeHeader title={tHome('title')} />
      <main
        id="main-content"
        className="flex flex-1 flex-col items-center px-6 py-16"
      >
        <Suspense fallback={null}>
          <GiftClaim />
        </Suspense>
      </main>
    </div>
  );
}
