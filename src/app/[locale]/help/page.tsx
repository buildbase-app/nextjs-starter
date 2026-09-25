import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HomeHeader } from '@/components/home-header';
import { SiteFooter } from '@/components/site-footer';
import { HelpCenter } from '@/components/help/help-center';
import { hasAdminApi } from '@/lib/buildbase-admin';
import {
  getDocs,
  getFaqs,
  getRichContent,
  getTestimonials,
} from '@/lib/platform/content';
import { getSessionContext } from '@/lib/server-auth';
import { detect } from '@/tour/progress';
import type { Locale } from '@/i18n/config';
import { buildMarketingMetadata } from '@/lib/seo/marketing-metadata';

interface HelpPageProps {
  params: Promise<{ locale: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: HelpPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'help' });
  return buildMarketingMetadata({
    path: '/help',
    locale: locale as Locale,
    title: t('title'),
    description: t('description'),
  });
}

/**
 * Everything on this page was written in the console, not in this repo:
 * a rich-text block, a FAQ collection, docs and testimonials. Edit any of
 * them there and reload here. The tour ticks "read the help center" for a
 * signed-in visitor.
 */
export default async function HelpPage({ params }: HelpPageProps) {
  const { locale } = await params;
  const [t, tHome, session] = await Promise.all([
    getTranslations({ locale, namespace: 'help' }),
    getTranslations({ locale, namespace: 'home' }),
    getSessionContext(),
  ]);
  const configured = hasAdminApi();
  const [policy, faqs, docs, testimonials] = configured
    ? await Promise.all([
        getRichContent(),
        getFaqs(),
        getDocs(),
        getTestimonials(),
      ])
    : [null, [], { folders: [], posts: [] }, []];

  if (session) {
    await detect(session.userId, { kind: 'action', action: 'content:viewed' });
  }

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HomeHeader title={tHome('title')} />
      <main id="main-content" className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            {t('description')}
          </p>
          <HelpCenter
            configured={configured}
            policy={policy}
            faqs={faqs}
            docs={docs}
            testimonials={testimonials}
          />
        </div>
      </main>
      <SiteFooter title={tHome('title')} />
    </div>
  );
}
