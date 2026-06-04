import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HomeHeader } from '@/components/home-header';
import { CreditStore } from '@/components/credit-store';
import { PricingSection } from '@/components/pricing-section';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('home');

  return {
    // Use absolute title for home page to avoid "My App | My App"
    title: {
      absolute: t('title'),
    },
    description: t('hero.description'),
    openGraph: {
      title: t('title'),
      description: t('hero.description'),
    },
  };
}

export default async function HomePage() {
  const [t, tStore] = await Promise.all([
    getTranslations('home'),
    getTranslations('creditStore'),
  ]);

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HomeHeader title={t('title')} />

      <main
        id="main-content"
        className="flex flex-1 flex-col items-center gap-12 p-6"
      >
        {/* Hero */}
        <div className="flex flex-col items-center justify-center gap-6 pt-12">
          <h2 className="text-foreground text-4xl font-bold tracking-tight">
            {t('hero.heading')}
          </h2>
          <p className="text-muted-foreground max-w-md text-center">
            {t('hero.description')}
          </p>
        </div>
        <PricingSection
          title={tStore('title')}
          description={tStore('subtitle')}
        />
        {/* Credit Store */}
        <section className="w-full max-w-5xl">
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
      </main>
    </div>
  );
}
