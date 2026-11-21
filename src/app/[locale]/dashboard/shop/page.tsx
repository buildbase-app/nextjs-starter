'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  BuyButton,
  formatMinorAmountIntl,
  usePublishedItems,
  type PublicItemView,
} from '@buildbase/sdk/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LAST_ORDER_KEY } from '@/lib/marketplace';

/**
 * The marketplace's catalog: every published item, from every seller, with
 * the SDK's `<BuyButton>` on each. The button starts Stripe's checkout (or
 * claims a free item at once), holds the stock while the buyer pays, sends
 * the affiliate referral `captureReferral()` kept, and shows any refusal in
 * the reader's language. Stripe sends the buyer to Orders afterwards.
 */
export default function ShopPage() {
  const t = useTranslations('shop');
  const locale = useLocale();
  const { items, loading, error } = usePublishedItems();
  // Stripe sends the buyer to Orders, where the order waits for the payment.
  const [successUrl, setSuccessUrl] = useState<string>();
  useEffect(() => {
    setSuccessUrl(
      `${window.location.origin}/${locale}/dashboard/orders?checkout=success`
    );
  }, [locale]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
      {!loading && !error && items.length === 0 && (
        <Card>
          <CardContent className="text-muted-foreground py-10 text-center text-sm">
            {t('empty')}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ItemCard key={item._id} item={item} successUrl={successUrl} />
        ))}
      </div>
    </div>
  );
}

/** Stripe's return to a signed-in buyer carries no order id: keep it. */
function rememberOrder(id: string) {
  try {
    sessionStorage.setItem(LAST_ORDER_KEY, id);
  } catch {
    // Storage blocked: Orders falls back to the latest order.
  }
}

function ItemCard({
  item,
  successUrl,
}: {
  item: PublicItemView;
  successUrl?: string;
}) {
  const t = useTranslations('shop');
  const locale = useLocale();
  const variant = item.variants[0];
  const price = variant?.prices.find((p) => !p.retired);

  const amount =
    price?.mode === 'pwyw'
      ? (price.suggested ?? price.minimum ?? 0)
      : (price?.amount ?? 0);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="text-base">{item.title}</CardTitle>
        <CardDescription>
          {t('by', { seller: item.seller.displayName })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-2 text-sm">
        {item.summary && <p>{item.summary}</p>}
        {price && (
          <p className="font-medium">
            {price.mode === 'free'
              ? t('free')
              : formatMinorAmountIntl(amount, price.currency, locale)}
            {price.recurring && ` / ${price.recurring.interval}`}
          </p>
        )}
      </CardContent>
      <CardFooter>
        {variant && price ? (
          <BuyButton
            itemId={item._id}
            variantId={variant.id}
            priceId={price.id}
            free={price.mode === 'free'}
            amount={price.mode === 'pwyw' ? amount : undefined}
            recurring={!!price.recurring}
            successUrl={successUrl}
            onStarted={(start) => rememberOrder(start.order._id)}
          />
        ) : (
          <p className="text-muted-foreground text-sm">{t('notForSale')}</p>
        )}
      </CardFooter>
    </Card>
  );
}
