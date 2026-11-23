import { setRequestLocale } from 'next-intl/server';
import { SiteShell } from '@/components/site-shell';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SiteShell>{children}</SiteShell>;
}
