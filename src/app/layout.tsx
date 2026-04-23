import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/json-ld';
import { seoConfig } from '@/config/seo';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: seoConfig.brand.name,
    template: `%s | ${seoConfig.brand.name}`,
  },
  description: seoConfig.brand.description,
  ...(Object.values(seoConfig.verification).some(Boolean) && {
    verification: {
      ...(seoConfig.verification.google && {
        google: seoConfig.verification.google,
      }),
      ...(seoConfig.verification.bing && {
        other: { 'msvalidate.01': seoConfig.verification.bing },
      }),
      ...(seoConfig.verification.yandex && {
        yandex: seoConfig.verification.yandex,
      }),
    },
  }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#09090b"
          media="(prefers-color-scheme: dark)"
        />
        {/* JSON-LD Structured Data */}
        <OrganizationJsonLd
          name={seoConfig.brand.name}
          description={seoConfig.brand.description}
          logo={seoConfig.brand.logo}
          sameAs={[...seoConfig.social.sameAs]}
          contactPoint={seoConfig.contactPoint}
        />
        <WebSiteJsonLd
          name={seoConfig.brand.name}
          description={seoConfig.brand.description}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen w-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
