'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, X } from 'lucide-react';
import { getCurrencySymbol, type BillingInterval } from '@buildbase/sdk';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { PricingPage } from '@buildbase/sdk/react';

interface PricingPlansProps {
  slug?: string;
}

interface QuotaInterval {
  included?: number;
  overage?: number;
  priceId?: string;
  unitSize?: number;
}

interface PlanData {
  _id: string;
  name: string;
  version: number;
  pricingVariants?: Array<{
    currency: string;
    basePricing?: Record<string, number>;
    quotaOverages?: Record<string, Record<string, number>>;
  }>;
  quotas?: Record<string, Record<string, QuotaInterval>>;
  features?: Record<string, boolean>;
  limits?: Record<string, number>;
}

// Helper to safely cast SDK plan type to our local shape
function asPlanData(plan: unknown): PlanData {
  return plan as PlanData;
}

function PricingCardSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <Skeleton className="h-5 w-32" />
        <div className="mt-4 flex items-baseline gap-1">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex-1 space-y-4 pt-6">
        <Skeleton className="h-3 w-16" />
        <div className="space-y-2.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-36" />
            </div>
          ))}
        </div>
        <Skeleton className="mt-2 h-3 w-14" />
        <div className="space-y-2.5">
          {[1, 2].map((i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
        <Skeleton className="mt-2 h-3 w-16" />
        <div className="space-y-2.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-28" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function PricingPlans({ slug = 'main-pricing' }: PricingPlansProps) {
  const t = useTranslations('pricing');
  const [billingPeriod, setBillingPeriod] =
    useState<BillingInterval>('monthly');
  const [currency, setCurrency] = useState<string>('usd');

  return (
    <PricingPage slug={slug}>
      {({ loading, error, items, plans, notes }) => {
        if (loading) {
          return (
            <div>
              <div className="mb-8 flex justify-center gap-4">
                <Skeleton className="h-10 w-72" />
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <PricingCardSkeleton />
                <PricingCardSkeleton />
                <PricingCardSkeleton />
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

        if (!plans?.length) {
          return (
            <Card>
              <CardContent className="text-muted-foreground py-6 text-center">
                {t('noPlans')}
              </CardContent>
            </Card>
          );
        }

        const quotaItems = items?.filter((i) => i.type === 'quota') ?? [];
        const limitItems = items?.filter((i) => i.type === 'limit') ?? [];
        const featureItems = items?.filter((i) => i.type === 'feature') ?? [];
        const pricingInCents = notes?.toLowerCase().includes('cent') ?? false;

        // Collect currencies from pricingVariants (if any)
        const availableCurrencies =
          asPlanData(plans[0])
            ?.pricingVariants?.map((v) => v.currency)
            .filter(Boolean) ?? [];
        const activeCurrency = availableCurrencies.includes(currency)
          ? currency
          : (availableCurrencies[0] ?? 'usd');
        const symbol = getCurrencySymbol(activeCurrency);

        const periodLabelMap: Record<BillingInterval, string> = {
          monthly: t('perMonth'),
          quarterly: t('perQuarter'),
          yearly: t('perYear'),
        };
        const periodLabel = periodLabelMap[billingPeriod];

        const formatAmount = (value: number | undefined): string => {
          if (value == null) return '-';
          const amount = pricingInCents ? value / 100 : value;
          return Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
        };

        return (
          <div>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="border-border bg-muted flex gap-1 rounded-lg border p-1">
                {(['monthly', 'quarterly', 'yearly'] as BillingInterval[]).map(
                  (value) => (
                    <Button
                      key={value}
                      variant={billingPeriod === value ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setBillingPeriod(value)}
                    >
                      {t(value)}
                    </Button>
                  )
                )}
              </div>

              {availableCurrencies.length > 0 ? (
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
              ) : null}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((rawPlan) => {
                const plan = asPlanData(rawPlan);

                // Try pricingVariants first, fall back to direct quotas
                const variant =
                  plan.pricingVariants?.find(
                    (v) => v.currency === activeCurrency
                  ) ?? plan.pricingVariants?.[0];
                const basePrice = variant?.basePricing?.[billingPeriod];

                return (
                  <Card
                    key={plan._id}
                    className="flex flex-col transition-shadow hover:shadow-md"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {plan.name}{' '}
                        <span className="text-muted-foreground text-sm font-normal">
                          v{plan.version}
                        </span>
                      </CardTitle>
                      {basePrice != null ? (
                        <div className="mt-3 flex items-baseline gap-0.5">
                          <span className="text-2xl">{symbol}</span>
                          <span className="text-3xl font-bold">
                            {formatAmount(basePrice)}
                          </span>
                          <span className="text-muted-foreground ml-1 text-sm">
                            {periodLabel}
                          </span>
                        </div>
                      ) : null}
                    </CardHeader>

                    <Separator />

                    <CardContent className="flex-1 space-y-5 pt-6">
                      {quotaItems.length > 0 ? (
                        <div>
                          <h4 className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
                            {t('quotas')}
                          </h4>
                          <ul className="space-y-1.5 text-sm">
                            {quotaItems.map((item) => {
                              // Quota data lives directly on plan.quotas[slug][interval]
                              const intervalQuota: QuotaInterval | undefined =
                                plan.quotas?.[item.slug]?.[billingPeriod];

                              // Also check pricingVariants for overage (multi-currency plans)
                              const variantOverage =
                                variant?.quotaOverages?.[item.slug]?.[
                                  billingPeriod
                                ];

                              const included = intervalQuota?.included;
                              const overage =
                                intervalQuota?.overage ?? variantOverage;
                              const unitSize = intervalQuota?.unitSize;

                              if (included == null && overage == null)
                                return null;

                              const includedStr =
                                included != null
                                  ? `${t('included')}: ${included.toLocaleString()}`
                                  : '';
                              const unitSizeFormatted =
                                unitSize != null
                                  ? unitSize.toLocaleString()
                                  : '';
                              const overageAmount =
                                overage != null ? formatAmount(overage) : null;
                              const hasOverage = overageAmount != null;

                              if (!includedStr && !hasOverage) return null;

                              return (
                                <li
                                  key={item._id}
                                  className="flex justify-between gap-2"
                                >
                                  <span className="text-foreground">
                                    {item.name}
                                  </span>
                                  <span className="text-muted-foreground text-right">
                                    {includedStr}
                                    {includedStr && hasOverage ? ', ' : ''}
                                    {hasOverage ? (
                                      <>
                                        {t('perUnit')} {symbol}
                                        <span className="text-foreground font-semibold">
                                          {overageAmount}
                                        </span>
                                        {unitSizeFormatted
                                          ? `/${unitSizeFormatted} `
                                          : ' '}
                                        {item.name.toLowerCase()}
                                      </>
                                    ) : null}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : null}

                      {limitItems.length > 0 ? (
                        <div>
                          <h4 className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
                            {t('limits')}
                          </h4>
                          <ul className="space-y-1.5 text-sm">
                            {limitItems.map((item) => {
                              const val = plan.limits?.[item.slug];
                              if (val === undefined) return null;
                              return (
                                <li
                                  key={item._id}
                                  className="flex justify-between"
                                >
                                  <span>{item.name}</span>
                                  <Badge variant="outline">{val}</Badge>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : null}

                      {featureItems.length > 0 ? (
                        <div>
                          <h4 className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
                            {t('features')}
                          </h4>
                          <ul className="space-y-1.5 text-sm">
                            {featureItems.map((item) => {
                              const enabled = plan.features?.[item.slug];
                              return (
                                <li
                                  key={item._id}
                                  className="flex items-center gap-2"
                                >
                                  {enabled ? (
                                    <Check className="text-success h-4 w-4 shrink-0" />
                                  ) : (
                                    <X className="text-muted-foreground h-4 w-4 shrink-0" />
                                  )}
                                  <span
                                    className={
                                      enabled
                                        ? 'text-foreground'
                                        : 'text-muted-foreground line-through'
                                    }
                                  >
                                    {item.name}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      }}
    </PricingPage>
  );
}
