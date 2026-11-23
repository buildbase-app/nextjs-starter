'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Bell, Building2, Coins, CreditCard, UserRound } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

/** One step of the demo: a tour task and the SDK calls it is built on. */
export interface SdkDemoStep {
  key: 'signIn' | 'workspace' | 'plan' | 'credits' | 'notify';
  taskId: string;
  /** Straight from the tour catalog, so the hero cannot drift from the code. */
  calls: string[];
}

const ICONS = {
  signIn: UserRound,
  workspace: Building2,
  plan: CreditCard,
  credits: Coins,
  notify: Bell,
} as const;

/** Light syntax colouring: calls in the link colour, strings in success. */
function Highlighted({ code }: { code: string }) {
  const parts = code.split(/('[^']*'|"[^"]*"|[A-Za-z_$][\w$]*(?=\()|\/\/.*$)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        if (/^\/\//.test(part))
          return (
            <span key={i} className="text-muted-foreground">
              {part}
            </span>
          );
        if (/^['"]/.test(part))
          return (
            <span key={i} className="text-success">
              {part}
            </span>
          );
        if (/^[A-Za-z_$][\w$]*$/.test(part))
          return (
            <span key={i} className="text-link">
              {part}
            </span>
          );
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function Preview({ step }: { step: SdkDemoStep['key'] }) {
  const t = useTranslations('home.demo.steps');
  const Icon = ICONS[step];
  const result = t(`${step}.result`);
  const detail =
    step === 'workspace'
      ? t('workspace.detail', { count: 3 })
      : step === 'credits'
        ? t('credits.detail', { count: 99 })
        : t(`${step}.detail`);

  return (
    <div className="demo-enter flex items-start gap-4">
      <div
        aria-hidden
        className={cn(
          'flex size-11 shrink-0 items-center justify-center rounded-xl border',
          step === 'signIn'
            ? 'bg-foreground text-background font-semibold'
            : 'bg-muted text-foreground'
        )}
      >
        {step === 'signIn' ? (
          <span className="text-sm">AL</span>
        ) : (
          <Icon className="size-5" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 font-medium">
          <span
            aria-hidden
            className="bg-success size-1.5 shrink-0 rounded-full"
          />
          {result}
        </p>
        {step === 'signIn' ? (
          <p
            className="text-muted-foreground mt-0.5 truncate text-sm"
            dir="ltr"
          >
            Ada Lovelace, ada@example.com
          </p>
        ) : null}
        {step === 'workspace' ? (
          <p className="mt-0.5 truncate text-sm">Analytical Engines</p>
        ) : null}
        <p className="text-muted-foreground mt-0.5 text-sm">{detail}</p>
        {step === 'credits' ? (
          <div
            aria-hidden
            className="bg-muted mt-3 h-1.5 w-full overflow-hidden rounded-full"
          >
            <div className="bg-brand h-full w-[99%] rounded-full" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

/**
 * The hero's interactive piece: pick a step, see the SDK call and what it
 * renders. It moves only when the visitor acts (tabs, arrow keys), so the
 * page has one autoplaying moment, not two. A WAI-ARIA tabs pattern with
 * roving focus: Left/Right (mirrored in RTL), Home and End.
 */
export function SdkDemo({ steps }: { steps: SdkDemoStep[] }) {
  const t = useTranslations('home.demo');
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const step = steps[active];

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
    const next = rtl ? 'ArrowLeft' : 'ArrowRight';
    const prev = rtl ? 'ArrowRight' : 'ArrowLeft';
    let index = active;
    if (event.key === next) index = (active + 1) % steps.length;
    else if (event.key === prev)
      index = (active - 1 + steps.length) % steps.length;
    else if (event.key === 'Home') index = 0;
    else if (event.key === 'End') index = steps.length - 1;
    else return;
    event.preventDefault();
    setActive(index);
    tabs.current[index]?.focus();
  }

  return (
    <div className="bg-card text-card-foreground relative rounded-2xl border shadow-[0_1px_0_0_var(--border),0_24px_48px_-24px_color-mix(in_oklch,var(--foreground)_18%,transparent)]">
      <div className="border-b px-5 pt-5 pb-4">
        <h2 className="text-base font-semibold tracking-tight">
          {t('heading')}
        </h2>
        <p className="text-muted-foreground mt-1 text-sm text-pretty">
          {t('description')}
        </p>
      </div>

      <div
        role="tablist"
        aria-label={t('tablist')}
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-1 border-b px-3 py-2"
      >
        {steps.map((s, i) => (
          <button
            key={s.key}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            id={`${id}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`${id}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              'focus-visible:ring-ring inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:outline-none',
              i === active
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
          >
            <span
              aria-hidden
              className="font-mono text-xs tabular-nums opacity-70"
            >
              {i + 1}
            </span>
            {t(`steps.${s.key}.label`)}
          </button>
        ))}
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        className="min-w-0"
      >
        <pre
          dir="ltr"
          className="bg-muted/50 overflow-x-auto border-b px-5 py-4 font-mono text-[13px] leading-6"
        >
          <code key={step.key} className="demo-enter block">
            {step.calls.map((call, i) => (
              <span key={i} className="block">
                <span
                  aria-hidden
                  className="text-muted-foreground me-4 select-none"
                >
                  {i + 1}
                </span>
                <Highlighted code={call} />
              </span>
            ))}
          </code>
        </pre>

        <div className="px-5 py-5">
          <p className="text-muted-foreground mb-3 text-xs">{t('preview')}</p>
          <div className="bg-background rounded-xl border p-4" key={step.key}>
            <Preview step={step.key} />
          </div>
          <Link
            href={`/dashboard/tour?task=${step.taskId}`}
            className="text-link mt-4 inline-flex text-sm font-medium underline-offset-4 hover:underline"
          >
            {t('tryIt')}
          </Link>
        </div>
      </div>
    </div>
  );
}
