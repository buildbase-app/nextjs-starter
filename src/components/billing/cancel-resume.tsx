'use client';

import { useTranslations } from 'next-intl';
import {
  useCancelSubscription,
  useResumeSubscription,
} from '@buildbase/sdk/react';
import { invalidateSubscription } from '@buildbase/sdk';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface Props {
  workspaceId: string;
  subscription:
    | {
        subscriptionId?: string;
        cancelAtPeriodEnd: boolean;
        stripeCurrentPeriodEnd?: string;
      }
    | null
    | undefined;
}

/**
 * Cancel at the end of the period, or take that back. Both are the SDK's
 * hooks; the plan stays active until `stripeCurrentPeriodEnd` either way, so
 * nothing here is immediate. Shown only for a paid (Stripe-linked) plan.
 */
export function CancelResume({ workspaceId, subscription }: Props) {
  const t = useTranslations('account.subscription');
  const { cancelSubscription, loading: canceling } =
    useCancelSubscription(workspaceId);
  const { resumeSubscription, loading: resuming } =
    useResumeSubscription(workspaceId);

  if (!subscription?.subscriptionId) return null;

  const endsOn = subscription.stripeCurrentPeriodEnd
    ? new Date(subscription.stripeCurrentPeriodEnd).toLocaleDateString()
    : null;

  const run = async (action: () => Promise<unknown>, done: string) => {
    try {
      await action();
      invalidateSubscription();
      toast.success(done);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('failed'));
    }
  };

  return subscription.cancelAtPeriodEnd ? (
    <div className="flex items-center gap-2">
      {endsOn && (
        <span className="text-muted-foreground text-xs">
          {t('endsOn', { date: endsOn })}
        </span>
      )}
      <Button
        variant="outline"
        size="sm"
        disabled={resuming}
        onClick={() => run(resumeSubscription, t('resumed'))}
      >
        {resuming ? t('resuming') : t('resume')}
      </Button>
    </div>
  ) : (
    <Button
      variant="ghost"
      size="sm"
      disabled={canceling}
      onClick={() => run(cancelSubscription, t('canceled'))}
    >
      {canceling ? t('canceling') : t('cancel')}
    </Button>
  );
}
