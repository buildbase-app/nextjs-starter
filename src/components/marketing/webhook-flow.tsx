'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { sourceUrl } from '@/config/site';
import { cn } from '@/lib/utils';

const STAGES = ['click', 'send', 'verify', 'store'] as const;
type Stage = (typeof STAGES)[number];
const STEP_MS = 700;

/** What each stage shows: the real names from the handler, not a mock-up. */
function Artifact({ stage, deliveries }: { stage: Stage; deliveries: number }) {
  const mono =
    'bg-muted/60 mt-4 rounded-md border px-3 py-2 font-mono text-[12px] leading-5 break-words';
  switch (stage) {
    case 'click':
      return (
        <div className={mono} dir="ltr">
          plan: Starter <span className="text-muted-foreground">to</span> Team
        </div>
      );
    case 'send':
      return (
        <div className={mono} dir="ltr">
          <span className="text-muted-foreground">x-buildbase-event:</span>{' '}
          subscription.upgraded
          <br />
          <span className="text-muted-foreground">
            x-buildbase-signature:
          </span>{' '}
          sha256=9f2c…e41a
        </div>
      );
    case 'verify':
      return (
        <div className={mono} dir="ltr">
          <span className="text-link">parseWebhookEvent</span>({'{'} body,
          signature, timestamp, secret {'}'})
        </div>
      );
    case 'store':
      return (
        <div className={mono} dir="ltr">
          <span className="text-muted-foreground">WebhookEvent</span> id=7c1e…
          <br />
          <span className="text-muted-foreground">deliveries:</span>{' '}
          {Math.max(deliveries, 1)}{' '}
          <span className="text-muted-foreground">rows:</span> 1
        </div>
      );
  }
}

/**
 * One plan upgrade, from the click to the row in this app's database, as the
 * webhook handler (src/app/api/webhooks/buildbase/route.ts) really does it.
 * Nothing moves until the visitor presses Play; "Send it again" replays the
 * delivery to show the idempotency (same row, no duplicate). With reduced
 * motion the stages switch on at once. A polite live region says which
 * stage is lit.
 */
export function WebhookFlow() {
  const t = useTranslations('home.webhook');
  const [lit, setLit] = useState(-1);
  const [deliveries, setDeliveries] = useState(0);
  const [running, setRunning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    []
  );

  function run(from: number) {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    setDeliveries((n) => n + 1);
    if (reduce) {
      setLit(STAGES.length - 1);
      return;
    }
    setRunning(true);
    setLit(from);
    for (let i = from + 1; i < STAGES.length; i++) {
      timers.current.push(setTimeout(() => setLit(i), (i - from) * STEP_MS));
    }
    timers.current.push(
      setTimeout(() => setRunning(false), (STAGES.length - from) * STEP_MS)
    );
  }

  const finished = lit === STAGES.length - 1 && !running;
  const status =
    lit >= 0
      ? t('status', {
          step: lit + 1,
          total: STAGES.length,
          title: t(`stages.${STAGES[lit]}.title`),
        })
      : '';

  return (
    <section className="w-full border-b">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-2xl">
          <h2 className="text-foreground text-4xl font-semibold tracking-[-0.03em] text-balance md:text-5xl">
            {t('heading')}
          </h2>
          <p className="text-muted-foreground mt-4 text-lg text-pretty">
            {t('description')}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="lg"
            className="h-11 px-5"
            onClick={() => run(0)}
            disabled={running}
          >
            {deliveries > 0 ? t('replay') : t('play')}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-11 px-5"
            onClick={() => run(1)}
            disabled={running || deliveries === 0}
          >
            {t('retry')}
          </Button>
          <a
            href={sourceUrl('src/app/api/webhooks/buildbase/route.ts')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link ms-1 text-sm font-medium underline underline-offset-4"
          >
            {t('source')}
          </a>
          <Link
            href="/dashboard/tour?task=webhook-received"
            className="text-link text-sm font-medium underline underline-offset-4"
          >
            {t('tryIt')}
          </Link>
        </div>

        <div className="relative mt-10">
          {/* The wire the event travels along (wide screens only). */}
          <div
            aria-hidden
            className="bg-border absolute start-0 end-0 top-[21px] hidden h-px md:block"
          >
            <div
              className="bg-brand absolute inset-0 h-px origin-left motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out rtl:origin-right"
              style={{
                transform: `scaleX(${lit <= 0 ? 0 : lit / (STAGES.length - 1)})`,
              }}
            />
          </div>

          <ol className="relative grid gap-4 md:grid-cols-4">
            {STAGES.map((stage, i) => {
              const on = i <= lit;
              return (
                <li key={stage} className="flex flex-col">
                  <span
                    aria-hidden
                    className={cn(
                      'mb-5 flex size-[43px] items-center justify-center rounded-full border font-mono text-sm tabular-nums motion-safe:transition-colors motion-safe:duration-300',
                      on
                        ? 'bg-brand text-brand-foreground border-brand'
                        : 'bg-background text-muted-foreground'
                    )}
                  >
                    {on && (stage === 'store' ? finished : i < lit) ? (
                      <Check className="size-4" />
                    ) : (
                      i + 1
                    )}
                  </span>
                  <div
                    className={cn(
                      'bg-card flex-1 rounded-xl border p-4 motion-safe:transition-[border-color,box-shadow] motion-safe:duration-300',
                      on && 'border-foreground/25 shadow-sm'
                    )}
                  >
                    <h3 className="font-medium">
                      {t(`stages.${stage}.title`)}
                    </h3>
                    <p className="text-muted-foreground mt-1 text-sm text-pretty">
                      {t(`stages.${stage}.body`)}
                    </p>
                    <Artifact stage={stage} deliveries={deliveries} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <p
          className={cn(
            'text-success mt-6 min-h-6 text-sm font-medium',
            !(finished && deliveries > 1) && 'invisible'
          )}
        >
          {t('retried')}
        </p>
        <p role="status" aria-live="polite" className="sr-only">
          {finished && deliveries > 1 ? t('retried') : status}
        </p>
      </div>
    </section>
  );
}
