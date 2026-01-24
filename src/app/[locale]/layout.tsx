import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { ThemeProvider } from '@/components/theme-provider';
import { SaaSProvider } from '@/components/saas-provider';
import {
  locales,
  defaultLocale,
  isRtlLocale,
  type Locale,
} from '@/i18n/config';
import '@buildbase/sdk/dist/saas-os.css';

const baseUrl = process.env.SITE_URL || 'https://example.com';

// Map locale codes to OpenGraph locale format
const ogLocaleMap: Record<string, string> = {
  en: 'en_US',
  hi: 'hi_IN',
  es: 'es_ES',
  fr: 'fr_FR',
  de: 'de_DE',
  ja: 'ja_JP',
  zh: 'zh_CN',
  ar: 'ar_SA',
};

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
      locale: ogLocaleMap[locale] || 'en_US',
      alternateLocale: Object.values(ogLocaleMap).filter(
        (l) => l !== ogLocaleMap[locale]
      ),
      url: canonicalUrl,
      siteName: title,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      // You can add a default image here
      // images: [`${baseUrl}/og-image.png`],
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
        <SaaSProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SaaSProvider>
      </NextIntlClientProvider>
    </div>
  );
}
