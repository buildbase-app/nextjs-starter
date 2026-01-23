'use client';

import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  useSaaSAuth,
  WhenAuthenticated,
  WhenUnauthenticated,
} from '@buildbase/sdk';

function AuthButton() {
  const { signIn, isLoading, status } = useSaaSAuth();

  if (status === 'loading' || status === 'authenticating' || isLoading) {
    return (
      <Button variant="outline" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  return (
    <>
      <WhenUnauthenticated>
        <Button onClick={signIn}>Sign In</Button>
      </WhenUnauthenticated>
      <WhenAuthenticated>
        <Button asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      </WhenAuthenticated>
    </>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between border-b bg-background px-6 py-4">
        <h1 className="text-xl font-semibold text-foreground">My App</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <AuthButton />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
        <h2 className="text-4xl font-bold tracking-tight text-foreground">
          Welcome to My App
        </h2>
        <p className="max-w-md text-center text-muted-foreground">
          Built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, next-themes,
          and BuildBase SDK.
        </p>
      </main>
    </div>
  );
}
