import { getTranslations } from 'next-intl/server';
import type { CSSProperties } from 'react';
import { GitHubIcon } from '@/components/icons/brand';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { cloneCommand, siteConfig } from '@/config/site';
import { TOUR_TASKS } from '@/tour/catalog';
import { CopyCommand } from './copy-command';
import { SdkDemo, type SdkDemoStep } from './sdk-demo';

/** The tour tasks the hero's demo walks through, in order. */
const DEMO_STEPS: { key: SdkDemoStep['key']; taskId: string }[] = [
  { key: 'signIn', taskId: 'sign-up' },
  { key: 'workspace', taskId: 'create-workspace' },
  { key: 'plan', taskId: 'subscribe' },
  { key: 'credits', taskId: 'spend-credits' },
  { key: 'notify', taskId: 'send-notification' },
];

function demoSteps(): SdkDemoStep[] {
  return DEMO_STEPS.map(({ key, taskId }) => {
    const task = TOUR_TASKS.find((t) => t.id === taskId);
    if (!task) throw new Error(`Hero demo: no tour task "${taskId}"`);
    const calls = task.source.sdk?.slice(0, 2) ?? [];
    if (calls.length === 0)
      throw new Error(`Hero demo: tour task "${taskId}" names no SDK call`);
    return { key, taskId, calls };
  });
}

/**
 * A hand-drawn strike through each item: the one orchestrated moment on the
 * page. Each line draws in turn on load (`.draw-in`, CSS only); with reduced
 * motion they are simply there. Mirrored in RTL so it draws from the start
 * of the line.
 */
function Strike({ index }: { index: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      className="text-brand pointer-events-none absolute start-[-3%] top-[54%] h-[0.32em] w-[106%] -translate-y-1/2 overflow-visible rtl:-scale-x-100"
    >
      <path
        d="M1 6.2C18 3.4 33 7.6 51 4.9S84 5.6 99 3.6"
        pathLength={1}
        fill="none"
        stroke="currentColor"
        // In viewBox units: the box is stretched to each word's width, but
        // its height is a fixed share of the font size, so the line keeps
        // one weight. (non-scaling-stroke would break pathLength drawing.)
        strokeWidth={2.4}
        strokeLinecap="round"
        className="draw-in"
        style={{ animationDelay: `${420 + index * 110}ms` } as CSSProperties}
      />
    </svg>
  );
}

export async function HeroSection() {
  const t = await getTranslations('home.hero');
  const checklist = t.raw('checklist') as string[];

  return (
    <section className="grain relative w-full overflow-hidden border-b">
      <div
        aria-hidden
        className="drafting-grid pointer-events-none absolute inset-0 -z-10 opacity-70"
      />
      <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 pt-14 pb-20 md:pt-24 lg:grid-cols-12 lg:gap-10 lg:pb-28">
        <div className="min-w-0 lg:col-span-7">
          <h1 className="text-foreground max-w-[13ch] text-[clamp(2.6rem,6.6vw,5.5rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-balance">
            {t('heading')}
          </h1>

          <p className="text-muted-foreground mt-10 text-sm">
            {t('listLabel')}
          </p>
          <ul className="font-display text-foreground mt-2 flex max-w-2xl flex-wrap gap-x-6 gap-y-0.5 text-[clamp(1.65rem,3.3vw,2.6rem)] leading-[1.25]">
            {checklist.map((item, i) => (
              <li key={item} className="relative whitespace-nowrap">
                {item}
                <Strike index={i} />
              </li>
            ))}
          </ul>

          <p className="text-muted-foreground mt-10 max-w-xl text-lg leading-relaxed text-pretty">
            {t('description', { count: TOUR_TASKS.length })}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" className="h-11 px-6 text-[15px]" asChild>
              <Link href="/dashboard/tour">{t('start')}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 gap-2 px-5 text-[15px]"
              asChild
            >
              <a
                href={siteConfig.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon className="size-4" />
                {t('viewSource')}
              </a>
            </Button>
          </div>

          <CopyCommand
            className="mt-6 w-full sm:w-fit sm:max-w-full"
            command={cloneCommand}
            label={t('cloneLabel')}
            copyLabel={t('copy')}
            copiedLabel={t('copied')}
          />
        </div>

        <div className="min-w-0 lg:col-span-5 lg:pt-3">
          <SdkDemo steps={demoSteps()} />
        </div>
      </div>
    </section>
  );
}
