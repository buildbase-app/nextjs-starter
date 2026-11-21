'use client';

import { useTranslations } from 'next-intl';
import { AccountBilling, useSaaSAuth } from '@buildbase/sdk/react';
import { PackagePlus, Wallet } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * Billing beyond the workspace's plan, entirely the SDK's own screens:
 * add-ons are part of the workspace's subscription screen, and a plan the
 * signed-in person holds for themselves is `<AccountBilling />` with its own
 * credit wallet beside it. Nothing here is rebuilt: each screen says itself
 * when the console has not set its part up. With Stripe.js passed to the
 * provider (saas-provider.tsx), these screens take a card and finish 3-D
 * Secure inside the page.
 */
export default function BillingPage() {
  const t = useTranslations('billingHub');
  const { openWorkspaceSettings } = useSaaSAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-start gap-2">
            <PackagePlus className="mt-0.5 h-5 w-5" />
            <div>
              <CardTitle className="text-base">{t('addOns.title')}</CardTitle>
              <CardDescription>{t('addOns.description')}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button
              size="sm"
              onClick={() => openWorkspaceSettings('subscription')}
            >
              {t('addOns.open')}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start gap-2">
            <Wallet className="mt-0.5 h-5 w-5" />
            <div>
              <CardTitle className="text-base">
                {t('personalCredits.title')}
              </CardTitle>
              <CardDescription>
                {t('personalCredits.description')}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button
              size="sm"
              variant="outline"
              onClick={() => openWorkspaceSettings('account-credits')}
            >
              {t('personalCredits.open')}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('personal.title')}</CardTitle>
          <CardDescription>
            {t('personal.description')}{' '}
            <code className="text-xs">{'<AccountBilling />'}</code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AccountBilling title={null} description={null} />
        </CardContent>
      </Card>

      <p className="text-muted-foreground text-xs">{t('inPage')}</p>
    </div>
  );
}
