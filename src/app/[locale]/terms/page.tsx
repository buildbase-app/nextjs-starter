import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MdxRenderer } from '@/components/marketing/mdx/mdx-renderer';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { terms } from '@/content/pages/terms';
import { buildPageMetadata } from '@/content/pages/page-metadata';
import type { Locale } from '@/i18n/config';

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    path: '/terms',
    locale: locale as Locale,
    loader: terms,
  });
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  const content = await terms.get(locale as Locale);

  if (!content) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <BreadcrumbJsonLd items={[{ name: content.heroTitle, url: '/terms' }]} />
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
