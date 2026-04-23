import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MdxRenderer } from '@/components/marketing/mdx/mdx-renderer';
import { BreadcrumbJsonLd } from '@/components/seo/json-ld';
import { about } from '@/content/pages/about';
import { buildPageMetadata } from '@/content/pages/page-metadata';
import type { Locale } from '@/i18n/config';
import { Zap, Shield, Users, Heart, type LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  Shield,
  Users,
  Heart,
};

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    path: '/about',
    locale: locale as Locale,
    loader: about,
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const content = await about.get(locale as Locale);

  if (!content) notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
      <BreadcrumbJsonLd items={[{ name: content.heroTitle, url: '/about' }]} />
      <header className="mb-16">
        <p className="text-primary font-mono text-xs tracking-wider uppercase">
          {content.heroEyebrow}
        </p>
        <h1 className="text-foreground mt-2 text-3xl font-bold tracking-tight md:text-5xl">
          {content.heroTitle}
        </h1>
        <p className="text-muted-foreground mt-4 text-base md:text-lg">
          {content.heroDescription}
        </p>
      </header>

      <section className="mb-16">
        <h2 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
          {content.missionHeading}
        </h2>
        <div className="mt-6">
          <MdxRenderer code={content.body.code} />
        </div>
      </section>

      <section>
        <p className="text-primary font-mono text-xs tracking-wider uppercase">
          {content.valuesEyebrow}
        </p>
        <h2 className="text-foreground mt-2 text-2xl font-bold tracking-tight md:text-3xl">
          {content.valuesHeading}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {content.values.map((value) => {
            const Icon = ICON_MAP[value.icon];
            return (
              <div
                key={value.title}
                className="border-border rounded-lg border p-6"
              >
                {Icon ? <Icon className="text-primary mb-3 size-6" /> : null}
                <h3 className="text-foreground text-lg font-medium">
                  {value.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
