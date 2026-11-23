import { getTranslations } from 'next-intl/server';
import { HomeHeader } from '@/components/home-header';
import { SiteFooter } from '@/components/site-footer';

/**
 * The public site's frame: header, one <main> (the skip link's target) and
 * footer. Route layouts for the blog, the changelog and the legal pages use
 * it, so a new page under them cannot ship without navigation or a main
 * landmark.
 */
export async function SiteShell({ children }: { children: React.ReactNode }) {
  const t = await getTranslations('home');
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HomeHeader title={t('title')} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter title={t('title')} />
    </div>
  );
}
