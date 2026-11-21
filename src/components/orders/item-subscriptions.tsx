'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import {
  HoldingSubscription,
  useItemSubscriptions,
  usePublishedItem,
  type ItemSubscriptionView,
} from '@buildbase/sdk/react';

/**
 * What the signed-in person subscribes to from sellers (apart from the app's
 * own plan): each one is the SDK's `<HoldingSubscription>`, with its price,
 * the period paid for, cancel or resume, and a move to another tier of the
 * same item. Nothing shows until they hold one.
 */
export function ItemSubscriptions() {
  const t = useTranslations('itemSubscriptions');
  const { subscriptions, refetch } = useItemSubscriptions();
  if (subscriptions.length === 0) return null;

  return (
    <section className="space-y-3" aria-labelledby="item-subscriptions">
      <h2 id="item-subscriptions" className="text-lg font-semibold">
        {t('title')}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {subscriptions.map((s) => (
          <Subscription key={s._id} subscription={s} onChange={refetch} />
        ))}
      </div>
    </section>
  );
}

/** The item's variants are the tiers the holder may move between. */
function Subscription({
  subscription,
  onChange,
}: {
  subscription: ItemSubscriptionView;
  onChange: () => void;
}) {
  const { item } = usePublishedItem(subscription.itemId);
  const tiers = useMemo(
    () =>
      item?.variants.map((v) => ({
        variantId: v.id,
        label: v.label ?? v.id,
      })),
    [item]
  );
  return (
    <HoldingSubscription
      subscription={subscription}
      tiers={tiers}
      onChange={() => onChange()}
    />
  );
}
