import type { Metadata } from 'next';
import { DashboardLayoutClient } from '@/components/dashboard-layout-client';

export const metadata: Metadata = {
  title: {
    template: '%s | My App',
    default: 'Dashboard | My App',
  },
  description:
    'Manage your workspace, view analytics, and collaborate with your team.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
