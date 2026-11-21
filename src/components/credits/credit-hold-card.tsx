'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useReserveCredits } from '@buildbase/sdk/react';
import { Hourglass } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/** What the demo job is estimated to cost, held up front. */
const ESTIMATE = 20;

type Hold = { holdId: string; amount: number; expiresAt: string };
type Outcome =
  | { kind: 'settled'; settled: number; returned: number; extra: number }
  | { kind: 'released'; returned: number }
  | { kind: 'error'; message: string };

/**
 * Credit holds, for work whose cost is not known up front (an AI job, an
 * export of unknown size): reserve an estimate, do the work, then settle
 * what it really cost. Less than held gives the rest back, more takes the
 * extra, and cancelling releases the whole hold. The credits leave the
 * balance at reserve, so every gate and balance on the page is already net
 * of the hold, and a hold left unsettled is released when it expires.
 */
export function CreditHoldCard({ workspaceId }: { workspaceId: string }) {
  const t = useTranslations('creditHolds');
  const { reserve, settle, release, loading } = useReserveCredits(workspaceId);
  const [hold, setHold] = useState<Hold | null>(null);
  const [cost, setCost] = useState<number | null>(null);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const failed = (error: unknown) => {
    const err = error as {
      code?: string;
      available?: number;
      message?: string;
    };
    setOutcome({
      kind: 'error',
      message:
        err.code === 'INSUFFICIENT_CREDITS'
          ? t('insufficient', { available: err.available ?? 0 })
          : err.code === 'HOLD_NOT_OPEN'
            ? t('notOpen')
            : (err.message ?? t('failed')),
    });
  };

  const start = async () => {
    setOutcome(null);
    try {
      // One key per job: a retried reserve answers the same hold.
      const res = await reserve({
        amount: ESTIMATE,
        ttlSeconds: 600,
        description: t('jobDescription'),
        idempotencyKey: `demo-job-${crypto.randomUUID()}`,
      });
      setHold({
        holdId: res.holdId,
        amount: res.amount,
        expiresAt: res.expiresAt,
      });
      // The "work": its real cost is only known now, somewhere around the estimate.
      setCost(8 + Math.floor(Math.random() * 18));
    } catch (error) {
      failed(error);
    }
  };

  const finish = async () => {
    if (!hold || cost === null) return;
    try {
      const res = await settle(hold.holdId, {
        amount: cost,
        description: t('jobDescription'),
      });
      setOutcome({
        kind: 'settled',
        settled: res.settled,
        returned: res.returned,
        extra: res.extra,
      });
      setHold(null);
    } catch (error) {
      failed(error);
      setHold(null);
    }
  };

  const cancel = async () => {
    if (!hold) return;
    try {
      const res = await release(hold.holdId);
      setOutcome({ kind: 'released', returned: res.returned });
    } catch (error) {
      failed(error);
    }
    setHold(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-2">
        <Hourglass className="mt-0.5 h-5 w-5" />
        <div>
          <CardTitle className="text-base">{t('title')}</CardTitle>
          <CardDescription>
            {t('description')}{' '}
            <code className="text-xs">useReserveCredits()</code>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {!hold ? (
          <Button size="sm" onClick={start} disabled={loading}>
            {t('start', { amount: ESTIMATE })}
          </Button>
        ) : (
          <div className="space-y-3">
            <p className="text-sm">
              {t('held', {
                amount: hold.amount,
                time: new Date(hold.expiresAt).toLocaleTimeString(),
              })}{' '}
              <code className="text-muted-foreground text-xs">
                {hold.holdId}
              </code>
            </p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={finish} disabled={loading}>
                {t('finish', { cost: cost ?? 0 })}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={cancel}
                disabled={loading}
              >
                {t('cancel')}
              </Button>
            </div>
          </div>
        )}

        {outcome?.kind === 'settled' && (
          <p className="text-sm text-green-700 dark:text-green-400">
            {outcome.extra > 0
              ? t('settledExtra', {
                  settled: outcome.settled,
                  extra: outcome.extra,
                })
              : t('settled', {
                  settled: outcome.settled,
                  returned: outcome.returned,
                })}
          </p>
        )}
        {outcome?.kind === 'released' && (
          <p className="text-sm">
            {t('released', { returned: outcome.returned })}
          </p>
        )}
        {outcome?.kind === 'error' && (
          <p className="text-sm text-red-700 dark:text-red-400">
            {outcome.message}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
