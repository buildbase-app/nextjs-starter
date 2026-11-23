'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Bot, FileText, MousePointerClick } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { sourceUrl } from '@/config/site';
import { cn } from '@/lib/utils';

const STEP_MS = 700;
const START_CREDITS = 100;

type Phase = 0 | 1 | 2 | 3 | 4;
// 0 idle; 1 person acts; 2 person's draft lands (counters move);
// 3 agent calls; 4 agent's draft lands (counters move again).

/**
 * A person in the app and their agent over MCP create a document each, and
 * both go through src/lib/documents/service.ts: one unit of the `documents`
 * quota and one credit per document (METERING), whichever door they used.
 * The tool name, its scope and the service are the real ones
 * (src/lib/agent/tools.ts). Moves only on Run; with reduced motion the end
 * state shows at once; a polite live region says what changed.
 */
export function AgentLane() {
  const t = useTranslations('home.agentLane');
  const [phase, setPhase] = useState<Phase>(0);
  const [running, setRunning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    []
  );

  function run() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase(4);
      return;
    }
    setRunning(true);
    setPhase(1);
    ([2, 3, 4] as const).forEach((p, i) =>
      timers.current.push(setTimeout(() => setPhase(p), (i + 1) * STEP_MS))
    );
    timers.current.push(setTimeout(() => setRunning(false), 3 * STEP_MS));
  }

  const used = phase >= 4 ? 2 : phase >= 2 ? 1 : 0;
  const credits = START_CREDITS - used;
  const status =
    phase === 2 || phase === 4
      ? t('status', {
          who: phase === 2 ? t('human') : t('agent'),
          credits,
          used,
        })
      : '';

  const lane = (
    who: 'human' | 'agent',
    acting: boolean,
    landed: boolean,
    action: React.ReactNode
  ) => (
    <div
      className={cn(
        'bg-card flex min-w-0 flex-col rounded-xl border p-5 motion-safe:transition-[border-color,box-shadow] motion-safe:duration-300',
        (acting || landed) && 'border-foreground/25 shadow-sm'
      )}
    >
      <p className="text-muted-foreground flex items-center gap-2 text-sm">
        {who === 'human' ? (
          <MousePointerClick aria-hidden className="size-4" />
        ) : (
          <Bot aria-hidden className="size-4" />
        )}
        {t(who)}
      </p>
      <div className="mt-4">{action}</div>
      <div
        className={cn(
          'bg-background mt-4 flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm',
          // Waiting is a dashed outline, not faded text: faded text failed
          // contrast (axe color-contrast).
          !landed && 'border-dashed'
        )}
      >
        <FileText aria-hidden className="text-muted-foreground size-4" />
        <span className="font-medium">Q3 plan</span>
        <span className="text-muted-foreground ms-auto font-mono text-xs">
          {landed ? t('created') : '-'}
        </span>
      </div>
    </div>
  );

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
            onClick={run}
            disabled={running}
          >
            {phase === 0 ? t('play') : t('replay')}
          </Button>
          <a
            href={sourceUrl('src/lib/agent/tools.ts')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link ms-1 text-sm font-medium underline underline-offset-4"
          >
            {t('source')}
          </a>
          <Link
            href="/dashboard/tour?task=mcp-config"
            className="text-link text-sm font-medium underline underline-offset-4"
          >
            {t('tryIt')}
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {lane(
            'human',
            phase === 1,
            phase >= 2,
            <span className="bg-background inline-flex h-9 items-center rounded-md border px-3 text-sm font-medium">
              {t('humanAction')}
            </span>
          )}
          {lane(
            'agent',
            phase === 3,
            phase >= 4,
            <div>
              <p className="text-muted-foreground text-sm">
                {t('agentAction')}
              </p>
              <pre
                dir="ltr"
                className="bg-muted/60 mt-2 overflow-x-auto rounded-md border px-3 py-2 font-mono text-[12px] leading-5"
              >
                <span className="text-link">create_document</span>
                {'({ title: "Q3 plan", content })'}
              </pre>
            </div>
          )}
        </div>

        {/* The one service both lanes go through, and what it counts. */}
        <div className="bg-muted/40 mt-4 flex flex-wrap items-center gap-x-10 gap-y-3 rounded-xl border px-5 py-4">
          <code dir="ltr" className="text-muted-foreground font-mono text-xs">
            src/lib/documents/service.ts
          </code>
          <p className="flex items-baseline gap-2 text-sm">
            <span className="text-muted-foreground">{t('credits')}</span>
            <span className="font-display text-foreground text-3xl tabular-nums">
              {credits}
            </span>
          </p>
          <p className="flex items-baseline gap-2 text-sm">
            <span className="text-muted-foreground">{t('quota')}</span>
            <span className="font-display text-foreground text-3xl tabular-nums">
              {used}
            </span>
          </p>
        </div>

        <p role="status" aria-live="polite" className="sr-only">
          {status}
        </p>
      </div>
    </section>
  );
}
