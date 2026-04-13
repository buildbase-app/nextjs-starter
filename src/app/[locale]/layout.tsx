import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { ThemeProvider } from '@/components/theme-provider';
import { SaaSProvider } from '@/components/saas-provider';
import { QueryProvider } from '@/components/query-provider';
import { SkipLink } from '@/components/skip-link';
import { Toaster } from 'sonner';
import {
  locales,
  defaultLocale,
  isRtlLocale,
  getOgLocale,
  getAlternateOgLocales,
  type Locale,
} from '@/i18n/config';
import { siteUrl } from '@/env';
import '@buildbase/sdk/css';
import { LanguageSwitcher } from '@/components/language-switcher';

const baseUrl = siteUrl;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  const currentPath = locale === defaultLocale ? '' : `/${locale}`;
  const canonicalUrl = `${baseUrl}${currentPath}`;

  // Get localized content for social sharing
  const title = t('meta.title');
  const description = t('meta.description');

  // Generate dynamic OG image URL with localized text
  const ogImageUrl = new URL('/api/og', baseUrl);
  ogImageUrl.searchParams.set('title', title);
  ogImageUrl.searchParams.set('description', description);
  ogImageUrl.searchParams.set('locale', locale);

  // Generate alternate language links
  const languages: Record<string, string> = {
    'x-default': baseUrl,
  };
  for (const loc of locales) {
    const locPath = loc === defaultLocale ? '' : `/${loc}`;
    languages[loc] = `${baseUrl}${locPath}`;
  }

  return {
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: getOgLocale(locale as Locale),
      alternateLocale: getAlternateOgLocales(locale as Locale),
      url: canonicalUrl,
      siteName: title,
      images: [
        {
          url: ogImageUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl.toString()],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRtl = isRtlLocale(locale as Locale);

  return (
    <div lang={locale} dir={isRtl ? 'rtl' : 'ltr'} className="contents">
      <NextIntlClientProvider messages={messages}>
        <QueryProvider>
          <SaaSProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SkipLink />
              {children}
              <Toaster richColors position="bottom-right" />
            </ThemeProvider>
          </SaaSProvider>
        </QueryProvider>
      </NextIntlClientProvider>
    </div>
  );
}
