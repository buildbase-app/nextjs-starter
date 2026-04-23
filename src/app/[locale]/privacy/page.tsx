import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MdxRenderer } from '@/components/marketing/mdx/mdx-renderer';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { privacy } from '@/content/pages/privacy';
import { buildPageMetadata } from '@/content/pages/page-metadata';
import type { Locale } from '@/i18n/config';

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    path: '/privacy',
    locale: locale as Locale,
    loader: privacy,
  });
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const content = await privacy.get(locale as Locale);

  if (!content) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <BreadcrumbJsonLd
        items={[{ name: content.heroTitle, url: '/privacy' }]}
      />
      <header className="mb-12">
        <p className="text-primary font-mono text-xs tracking-wider uppercase">
          {content.heroEyebrow}
        </p>
        <h1 className="text-foreground mt-2 text-3xl font-bold tracking-tight md:text-5xl">
          {content.heroTitle}
        </h1>
        <p className="text-muted-foreground mt-4 text-base md:text-lg">
          {content.heroDescription}
        </p>
        <p className="text-muted-foreground mt-2 text-sm">
          Last updated: {content.lastUpdated}
        </p>
      </header>

      <div>
        <MdxRenderer code={content.body.code} />
      </div>
    </div>
  );
}
