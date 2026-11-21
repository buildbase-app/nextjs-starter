'use client';

import { useTranslations } from 'next-intl';
import {
  SellerHome,
  SellerItems,
  SellerSales,
  useSaaSAuth,
} from '@buildbase/sdk/react';

/**
 * Selling as a person, entirely the SDK's screens. `<SellerHome />` starts
 * selling (the app's terms, the name buyers see) and walks Stripe's
 * onboarding through Connect.js, passed on the provider; then it shows what
 * Stripe still needs and the payout status. `<SellerItems />` lists, edits
 * and publishes items, and `<SellerSales />` shows each sale, refunds and
 * Mark as sent. Workspaces sell from the settings dialog's Selling section.
 */
export default function SellingPage() {
  const t = useTranslations('selling');
  const { user } = useSaaSAuth();
  const subject = { user: true } as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>
      <SellerHome
        subject={subject}
        canManage
        defaultDisplayName={user?.name ?? undefined}
        defaultEmail={user?.email ?? undefined}
      />
      <SellerItems subject={subject} canManage />
      <SellerSales subject={subject} canManage />
    </div>
  );
}
