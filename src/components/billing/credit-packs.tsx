'use client';

import { useLocale, useTranslations } from 'next-intl';
import {
  formatMinorAmountIntl,
  usePublicCreditPackages,
} from '@buildbase/sdk/react';
import { Coins } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

/**
 * The organization's public credit packs, read without a session
 * (`usePublicCreditPackages`), so a visitor sees what credits cost before
 * signing up. Buying happens inside the app, on Credits. Renders nothing when
 * the organization sells none.
 */
export function CreditPacks() {
  const t = useTranslations('account.creditPacks');
  const locale = useLocale();
  const { packages, loading } = usePublicCreditPackages();
  if (loading || packages.length === 0) return null;

  return (
    <section className="mt-12 space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight">{t('title')}</h2>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>
      <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
        {packages.map((pack) => {
          const price = pack.pricingVariants[0];
          return (
            <Card key={pack._id}>
              <CardHeader className="flex flex-row items-center gap-2 pb-2">
                <Coins className="text-muted-foreground h-5 w-5" />
                <div>
                  <CardTitle className="text-base">{pack.name}</CardTitle>
                  {pack.description && (
                    <CardDescription>{pack.description}</CardDescription>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex items-baseline justify-between">
                <span className="text-sm">
                  {t('credits', { count: pack.creditAmount })}
                </span>
                {price && (
                  <span className="text-xl font-bold">
                    {formatMinorAmountIntl(
                      price.amount,
                      price.currency,
                      locale
                    )}
                  </span>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
