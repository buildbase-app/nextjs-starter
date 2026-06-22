'use client';

import { ArrowRight, Github } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/routing';
import {
  WhenAuthenticated,
  WhenUnauthenticated,
  useSaaSAuth,
} from '@buildbase/sdk/react';

const TECH_STACK = [
  { name: 'Next.js 16', icon: '▲' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'Tailwind CSS', icon: '✦' },
  { name: 'shadcn/ui', icon: '◈' },
  { name: 'Prisma', icon: '⬡' },
  { name: 'BuildBase SDK', icon: '⬢' },
] as const;

function SignInCta({ label }: { label: string }) {
  const { signIn } = useSaaSAuth();
  return (
    <Button size="lg" className="gap-2 px-8" onClick={() => signIn()}>
      {label}
      <ArrowRight className="h-4 w-4" />
    </Button>
  );
}

export function HeroSection() {
  const t = useTranslations('home');

  return (
    <section className="relative flex flex-col items-center gap-8 px-6 py-20 text-center md:py-32">
      {/* Background gradient blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
      >
        <div className="bg-primary/10 h-[500px] w-[800px] rounded-full blur-3xl" />
      </div>

      {/* Eyebrow badge */}
      <Badge
        variant="secondary"
        className="gap-1.5 px-3 py-1 text-xs font-medium"
      >
        <span className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full" />
        {t('hero.badge')}
      </Badge>

      {/* Headline */}
      <h1 className="text-foreground max-w-3xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
        {t.rich('hero.heading', {
          highlight: (chunks) => (
            <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
              {chunks}
            </span>
          ),
        })}
      </h1>

      {/* Subheadline */}
      <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed md:text-xl">
        {t('hero.description')}
      </p>

      {/* CTAs */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <WhenUnauthenticated>
          <SignInCta label={t('hero.signInToExplore')} />
        </WhenUnauthenticated>
        <WhenAuthenticated>
          <Button size="lg" className="gap-2 px-8" asChild>
            <Link href="/dashboard">
              {t('hero.openDashboard')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </WhenAuthenticated>
        <Button size="lg" variant="outline" className="gap-2 px-8" asChild>
          <a
            href="https://github.com/buildbase-dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-4 w-4" />
            {t('hero.viewSource')}
          </a>
        </Button>
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <span className="text-muted-foreground text-xs tracking-widest uppercase">
          {t('hero.builtWith')}
        </span>
        {TECH_STACK.map((tech) => (
          <div
            key={tech.name}
            className="border-border bg-background/60 flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
          >
            <span className="text-primary font-mono text-xs">{tech.icon}</span>
            {tech.name}
          </div>
        ))}
      </div>
    </section>
  );
}
