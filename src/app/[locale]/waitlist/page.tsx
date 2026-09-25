import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HomeHeader } from '@/components/home-header';
import { WaitlistForm } from '@/components/modules/waitlist-form';
import type { Locale } from '@/i18n/config';
import { buildMarketingMetadata } from '@/lib/seo/marketing-metadata';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'waitlist' });
  return buildMarketingMetadata({
    path: '/waitlist',
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
  });
}

/**
 * The platform's beta waitlist: a signed-out visitor leaves a name and an
 * email, the console lists them under Users → Beta, an admin approves.
 * The form is the SDK's; it reads the org's beta config itself.
 */
export default async function WaitlistPage({ params }: Props) {
  const { locale } = await params;
  const [t, tHome] = await Promise.all([
    getTranslations({ locale, namespace: 'waitlist' }),
    getTranslations({ locale, namespace: 'home' }),
  ]);
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HomeHeader title={tHome('title')} />
      <main
        id="main-content"
        className="flex flex-1 flex-col items-center px-6 py-16"
      >
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-balance">
              {t('title')}
            </h1>
            <p className="text-muted-foreground mt-2">{t('description')}</p>
          </div>
          <WaitlistForm successText={t('success')} note={t('note')} />
        </div>
      </main>
    </div>
  );
}
