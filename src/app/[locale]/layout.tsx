import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/components/theme-provider';
import { SaaSProvider } from '@/components/saas-provider';
import { locales, isRtlLocale, type Locale } from '@/i18n/config';
import '@buildbase/sdk/dist/saas-os.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  openGraph: {
    title: 'My App',
    description: 'My Next.js application with shadcn/ui and theme support',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My App',
    description: 'My Next.js application with shadcn/ui and theme support',
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
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
