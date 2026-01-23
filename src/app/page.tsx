'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  useSaaSAuth,
  WhenAuthenticated,
  WhenUnauthenticated,
} from '@buildbase/sdk';

function AuthButton() {
  const { signIn, signOut, isLoading, status } = useSaaSAuth();

  if (status === 'loading' || isLoading) {
    return (
      <Button variant="outline" disabled>
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
        <Button variant="outline" onClick={signOut}>
          Sign Out
        </Button>
      </WhenAuthenticated>
    </>
  );
}

function DashboardButton() {
  const { signIn } = useSaaSAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  return (
    <>
      <WhenAuthenticated>
        <Button asChild size="lg">
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </WhenAuthenticated>
      <WhenUnauthenticated>
        <Button size="lg" onClick={() => setShowLoginDialog(true)}>
          Go to Dashboard
        </Button>
      </WhenUnauthenticated>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to sign in to access the dashboard.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoginDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowLoginDialog(false);
                signIn();
              }}
            >
              Sign In
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
        <DashboardButton />
      </main>
    </div>
  );
}
