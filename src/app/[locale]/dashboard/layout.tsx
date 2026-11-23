import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { DashboardLayoutClient } from '@/components/dashboard-layout-client';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The locale layout ships only the public pages' namespaces to the
  // browser; the dashboard's client components read the whole catalog.
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <DashboardLayoutClient>{children}</DashboardLayoutClient>
    </NextIntlClientProvider>
  );
}
