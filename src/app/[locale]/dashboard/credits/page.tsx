'use client';

import { useTranslations } from 'next-intl';
import {
  useSaaSAuth,
  CreditBalance,
  useConsumeCredits,
  useSaaSWorkspaces,
  WhenCreditsExhausted,
  WhenCreditsAvailable,
  WhenCreditsLow,
  useCreditTransactions,
  useExpiringCredits,
} from '@buildbase/sdk/react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Coins,
  CreditCard,
  ShoppingCart,
  AlertTriangle,
  Clock,
  ArrowUpCircle,
  ArrowDownCircle,
} from 'lucide-react';

export default function CreditsPage() {
  const t = useTranslations('credits');
  const { currentWorkspace } = useSaaSWorkspaces();
  const { openCreditStore, openPlanPicker } = useSaaSAuth();
  const { consumeCredits, loading: consuming } = useConsumeCredits(
    currentWorkspace?._id
  );
  const { transactions, loading: txLoading } = useCreditTransactions(
    currentWorkspace?._id ?? ''
  );
  const { buckets, loading: expiringLoading } = useExpiringCredits(
    currentWorkspace?._id ?? ''
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

      {/* Low credits warning — shown when balance < 50 */}
      <WhenCreditsLow threshold={50}>
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
          <CardContent className="flex items-start gap-3 pt-6">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                {t('lowCredits.title')}
              </p>
              <p className="mt-0.5 text-sm text-amber-700 dark:text-amber-300">
                {t('lowCredits.description')}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={openCreditStore}
              >
                {t('buyCredits')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </WhenCreditsLow>

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

      {/* Expiring credits */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base">{t('expiring.title')}</CardTitle>
            <CardDescription>{t('expiring.description')}</CardDescription>
          </div>
          <Clock className="text-muted-foreground h-5 w-5" />
        </CardHeader>
        <CardContent>
          {expiringLoading ? (
            <p className="text-muted-foreground text-sm">Loading...</p>
          ) : buckets.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {t('expiring.noExpiring')}
            </p>
          ) : (
            <ul className="space-y-2">
              {buckets.map((bucket, i) => (
                <li
                  key={bucket._id ?? i}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="font-medium">
                    {t('expiring.days', { count: bucket.remaining })}
                  </span>
                  {bucket.expiresAt && (
                    <span className="text-muted-foreground">
                      {t('expiring.expiresIn', {
                        date: new Date(bucket.expiresAt).toLocaleDateString(),
                      })}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

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

      {/* Transaction history */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('transactions.title')}</CardTitle>
          <CardDescription>{t('transactions.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          {txLoading ? (
            <p className="text-muted-foreground text-sm">Loading...</p>
          ) : transactions.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {t('transactions.empty')}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left font-medium">
                      {t('transactions.columns.type')}
                    </th>
                    <th className="pb-2 text-right font-medium">
                      {t('transactions.columns.amount')}
                    </th>
                    <th className="pb-2 text-right font-medium">
                      {t('transactions.columns.balance')}
                    </th>
                    <th className="text-muted-foreground hidden pb-2 text-left font-medium md:table-cell">
                      {t('transactions.columns.description')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {transactions.map((tx, i) => {
                    const isCredit = tx.amount > 0;
                    return (
                      <tr key={i} className="py-2">
                        <td className="py-2">
                          <span className="flex items-center gap-1.5">
                            {isCredit ? (
                              <ArrowUpCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <ArrowDownCircle className="h-4 w-4 text-red-500" />
                            )}
                            <span
                              className={
                                isCredit
                                  ? 'text-green-700 dark:text-green-400'
                                  : 'text-red-700 dark:text-red-400'
                              }
                            >
                              {isCredit
                                ? t('transactions.types.credit')
                                : t('transactions.types.debit')}
                            </span>
                          </span>
                        </td>
                        <td className="py-2 text-right font-mono">
                          <span
                            className={
                              isCredit
                                ? 'text-green-700 dark:text-green-400'
                                : 'text-red-700 dark:text-red-400'
                            }
                          >
                            {isCredit ? '+' : ''}
                            {tx.amount}
                          </span>
                        </td>
                        <td className="py-2 text-right font-mono">
                          {tx.balanceAfter}
                        </td>
                        <td className="text-muted-foreground hidden py-2 md:table-cell">
                          {tx.description ?? '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
