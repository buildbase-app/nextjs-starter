'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import {
  WhenAuthenticated,
  WhenUnauthenticated,
  useSaaSAuth,
} from '@buildbase/sdk/react';

function SignInButton() {
  const { signIn } = useSaaSAuth();
  return (
    <Button size="lg" className="gap-2 px-8" onClick={() => signIn()}>
      Sign in & explore
      <ArrowRight className="h-4 w-4" />
    </Button>
  );
}

export function CtaBanner() {
  return (
    <section className="w-full px-6 py-20">
      <div className="from-primary/10 via-primary/5 border-primary/20 mx-auto max-w-4xl rounded-2xl border bg-gradient-to-br to-transparent px-8 py-16 text-center">
        <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
          Ready to see it all working?
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg">
          Sign in to open the full dashboard — try switching workspaces,
          consuming credits, sending a push notification, and switching between
          all 8 languages.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <WhenUnauthenticated>
            <SignInButton />
          </WhenUnauthenticated>
          <WhenAuthenticated>
            <Button size="lg" className="gap-2 px-8" asChild>
              <Link href="/dashboard">
                Open Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </WhenAuthenticated>
          <Button size="lg" variant="outline" asChild>
            <Link href="/blog">How it&apos;s built</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
