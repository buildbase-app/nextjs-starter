'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Coins } from 'lucide-react';
import { getCurrencySymbol } from '@buildbase/sdk';
import { CreditStorePage, useSaaSAuth } from '@buildbase/sdk/react';
import type { IPublicCreditPackage } from '@buildbase/sdk';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

function PackageSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <Skeleton className="h-5 w-32" />
        <Skeleton className="mt-2 h-4 w-48" />
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-4 w-36" />
        <Skeleton className="mt-4 h-10 w-full" />
      </CardContent>
    </Card>
  );
}

export function CreditStore() {
  const t = useTranslations('creditStore');
  const [currency, setCurrency] = useState<string>('usd');
  const { isAuthenticated } = useSaaSAuth();
  const router = useRouter();

  return (
    <CreditStorePage
      redirectBaseUrl={
        typeof window !== 'undefined'
          ? window.location.origin + '/dashboard'
          : undefined
      }
    >
      {({ loading, error, packages, notes, selectPackage }) => {
        if (loading) {
          return (
            <div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <PackageSkeleton />
                <PackageSkeleton />
                <PackageSkeleton />
              </div>
            </div>
          );
        }

        if (error) {
          return (
            <Card className="border-destructive bg-destructive/10">
              <CardContent className="text-destructive py-6 text-center">
                {t('error')}
              </CardContent>
            </Card>
          );
        }

        if (!packages?.length) {
          return (
            <Card>
              <CardContent className="text-muted-foreground py-6 text-center">
                {t('noPackages')}
              </CardContent>
            </Card>
          );
        }

        const pricingInCents = notes?.toLowerCase().includes('cent') ?? false;

        // Collect all available currencies across packages
        const availableCurrencies = Array.from(
          new Set(
            packages.flatMap(
              (pkg) =>
                pkg.pricingVariants?.map((v) => v.currency).filter(Boolean) ??
                []
            )
          )
        );

        const activeCurrency = availableCurrencies.includes(currency)
          ? currency
          : (availableCurrencies[0] ?? 'usd');
        const symbol = getCurrencySymbol(activeCurrency);

        const formatAmount = (value: number): string => {
          const amount = pricingInCents ? value / 100 : value;
          return Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
        };

        return (
          <div>
            {/* Currency selector */}
            {availableCurrencies.length > 1 && (
              <div className="mb-6 flex justify-end">
                <select
                  value={activeCurrency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="border-border bg-muted focus:ring-ring rounded-lg border px-3 py-2 text-sm font-medium uppercase focus:ring-2 focus:outline-none"
                >
                  {availableCurrencies.map((code) => (
                    <option key={code} value={code}>
                      {getCurrencySymbol(code)} {code.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Package cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg: IPublicCreditPackage) => {
                const variant =
                  pkg.pricingVariants?.find(
                    (v) => v.currency === activeCurrency
                  ) ?? pkg.pricingVariants?.[0];
                const price = variant?.amount;

                return (
                  <Card
                    key={pkg._id}
                    className="flex flex-col transition-shadow hover:shadow-md"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{pkg.name}</CardTitle>
                        <Badge variant="secondary" className="gap-1">
                          <Coins className="h-3 w-3" />
                          {pkg.creditAmount.toLocaleString()}
                        </Badge>
                      </div>
                      {pkg.description && (
                        <p className="text-muted-foreground mt-1 text-sm">
                          {pkg.description}
                        </p>
                      )}
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col justify-between gap-4">
                      <div>
                        {price != null && (
                          <div className="flex items-baseline gap-0.5">
                            <span className="text-2xl">{symbol}</span>
                            <span className="text-3xl font-bold">
                              {formatAmount(price)}
                            </span>
                          </div>
                        )}
                        <p className="text-muted-foreground mt-1 text-xs">
                          {pkg.validityDays
                            ? t('validFor', { days: pkg.validityDays })
                            : t('noExpiry')}
                        </p>
                      </div>

                      <Button
                        className="w-full"
                        onClick={() => {
                          if (isAuthenticated) {
                            // Workspace context not bootstrapped on public pages —
                            // send to dashboard credits where it is.
                            router.push('/dashboard/credits');
                          } else {
                            // SDK calls signIn(redirectUrl) with packageId encoded,
                            // resuming the purchase after login.
                            selectPackage(pkg._id);
                          }
                        }}
                      >
                        {t('buy')}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      }}
    </CreditStorePage>
  );
}
