'use client';

import { useTranslations } from 'next-intl';
import {
  useSaaSAuth,
  CreditBalance,
  useConsumeCredits,
  useSaaSWorkspaces,
  WhenCreditsExhausted,
  WhenCreditsAvailable,
} from '@buildbase/sdk/react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Coins, CreditCard, ShoppingCart } from 'lucide-react';

export default function CreditsPage() {
  const t = useTranslations('credits');
  const { currentWorkspace } = useSaaSWorkspaces();
  const { openCreditStore, openPlanPicker } = useSaaSAuth();
  const { consumeCredits, loading: consuming } = useConsumeCredits(
    currentWorkspace?._id
  );

  const handleConsume = async (amount: number) => {
    try {
      const result = await consumeCredits({
        amount,
        description: t('testConsume.apiDescription', { amount }),
      });
      alert(
        `${t('testConsume.success', { amount, balance: result.balanceAfter })}`
      );
    } catch (err: unknown) {
      const error = err as {
        code?: string;
        available?: number;
        requested?: number;
        message?: string;
      };
      if (error.code === 'INSUFFICIENT_CREDITS') {
        alert(
          t('testConsume.insufficient', {
            available: error.available ?? 0,
            requested: error.requested ?? 0,
          })
        );
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={openCreditStore}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {t('buyCredits')}
        </Button>
        <Button variant="outline" onClick={openPlanPicker}>
          <CreditCard className="mr-2 h-4 w-4" />
          {t('choosePlan')}
        </Button>
      </div>

      {/* Live Balance */}
      <CreditBalance>
        {({ balance, loading }) => (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>{t('balance')}</CardDescription>
              <Coins className="h-6 w-6 text-amber-500" />
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {loading
                  ? '...'
                  : (balance?.available?.toLocaleString() ?? '0')}
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                {t('creditsAvailable')}
              </p>
            </CardContent>
          </Card>
        )}
      </CreditBalance>

      {/* Out of credits */}
      <WhenCreditsExhausted>
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <CardContent className="pt-6">
            <p className="text-sm text-red-700 dark:text-red-300">
              {t('noCredits')}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={openCreditStore}
            >
              {t('buyMore')}
            </Button>
          </CardContent>
        </Card>
      </WhenCreditsExhausted>

      {/* Test Consume */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('testConsume.title')}</CardTitle>
          <CardDescription>{t('testConsume.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <WhenCreditsAvailable min={1}>
              {[1, 5, 10, 50].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  disabled={consuming}
                  onClick={() => handleConsume(amount)}
                >
                  {t('testConsume.use', { amount })}
                </Button>
              ))}
            </WhenCreditsAvailable>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
