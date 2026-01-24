import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { SaaSProvider } from '@/components/saas-provider';
import { locales, isRtlLocale, type Locale } from '@/i18n/config';
import '@buildbase/sdk/dist/saas-os.css';
import '../globals.css';
import { cn } from '@/lib/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: 'My App',
    template: '%s | My App',
  },
  description: 'My Next.js application with shadcn/ui and theme support',
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
  const currentLocale = await getLocale();
  const isRtl = isRtlLocale(locale as Locale);

  return (
    <html
      lang={currentLocale}
      dir={isRtl ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable} antialiased`,
          'w-screen h-screen'
        )}
      >
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
      </body>
    </html>
  );
}
