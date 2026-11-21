'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { AffiliateDashboard, AffiliateJoin } from '@buildbase/sdk/react';

/**
 * Affiliates, entirely the SDK's screens. A program's invitation link
 * (`?program=<id>`) shows `<AffiliateJoin />`: its terms, Join, then the
 * person's own link with their `?ref=` code. `<AffiliateDashboard />` lists
 * every program they joined with that link, earnings, commissions, payouts
 * and the payout account (Stripe's onboarding, through Connect.js on the
 * provider). Visitors arriving on a `?ref=` link are captured in
 * saas-provider.tsx, and the SDK's checkouts credit the affiliate.
 */
export default function AffiliatesPage() {
  const t = useTranslations('affiliates');
  const programId = useSearchParams().get('program');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>
      {programId && <AffiliateJoin programId={programId} chooseCode />}
      <AffiliateDashboard />
    </div>
  );
}
