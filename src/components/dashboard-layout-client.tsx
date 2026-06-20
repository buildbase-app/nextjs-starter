'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  useSaaSAuth,
  WhenAuthenticated,
  WhenUnauthenticated,
} from '@buildbase/sdk/react';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, status } = useSaaSAuth();
  const router = useRouter();
  const t = useTranslations('common');

  useEffect(() => {
    if (status !== 'loading' && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, status, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    );
  }

  return (
    <>
      <WhenUnauthenticated>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-muted-foreground">{t('redirecting')}</div>
        </div>
      </WhenUnauthenticated>
      <WhenAuthenticated>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="overflow-hidden">
            <header className="flex h-14 shrink-0 items-center gap-4 border-b px-4">
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-6" />
              <div className="flex-1" />
              <ThemeToggle />
            </header>
            <div
              id="main-content"
              className="min-h-0 flex-1 overflow-y-auto p-6"
            >
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </WhenAuthenticated>
    </>
  );
}
