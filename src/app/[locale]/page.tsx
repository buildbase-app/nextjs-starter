import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HomeHeader } from '@/components/home-header';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('home');

  return {
    title: t('title'),
    description: t('hero.description'),
    openGraph: {
      title: t('title'),
      description: t('hero.description'),
    },
  };
}

export default async function HomePage() {
  const t = await getTranslations('home');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <HomeHeader title={t('title')} />

      <main className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
        <h2 className="text-4xl font-bold tracking-tight text-foreground">
          {t('hero.heading')}
        </h2>
        <p className="max-w-md text-center text-muted-foreground">
          {t('hero.description')}
        </p>
      </main>
    </div>
  );
}
