import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HomeHeader } from '@/components/home-header';

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
  const t = await getTranslations('home');

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HomeHeader title={t('title')} />

      <main
        id="main-content"
        className="flex flex-1 flex-col items-center justify-center gap-6 p-6"
      >
        <h2 className="text-foreground text-4xl font-bold tracking-tight">
          {t('hero.heading')}
        </h2>
        <p className="text-muted-foreground max-w-md text-center">
          {t('hero.description')}
        </p>
      </main>
    </div>
  );
}
