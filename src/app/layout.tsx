import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo';
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
    default: 'My App',
    template: '%s | My App',
  },
  description: 'My Next.js application with shadcn/ui and theme support',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <OrganizationJsonLd
          name="My App"
          description="My Next.js application with shadcn/ui and theme support"
          // Add your social links here
          // sameAs={[
          //   'https://twitter.com/yourcompany',
          //   'https://linkedin.com/company/yourcompany',
          //   'https://github.com/yourcompany',
          // ]}
        />
        <WebSiteJsonLd
          name="My App"
          description="My Next.js application with shadcn/ui and theme support"
          // Uncomment if you have a search page
          // searchUrl="/search?q={search_term_string}"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
