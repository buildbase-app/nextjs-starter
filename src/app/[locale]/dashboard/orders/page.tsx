'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  HoldingFiles,
  HoldingKeys,
  orderDisplayStatus,
  useHoldings,
  useMyOrder,
  useMyOrders,
  useTranslation,
  type BuyerOrderView,
} from '@buildbase/sdk/react';
import { Link } from '@/i18n/routing';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLastOrderId } from '@/lib/marketplace';
import { OrderReviews } from '@/components/reviews/order-reviews';
import { ItemSubscriptions } from '@/components/orders/item-subscriptions';

/**
 * What the signed-in person bought, read with the SDK's order hooks. Right
 * after checkout Stripe sends them here; `waitForPayment` reads an open
 * order again every two seconds until Stripe's payment reaches the app.
 * Opening an order (`?id=`) lists what it granted (`useHoldings`): the
 * seller's message, a link, files to download (`<HoldingFiles>`, each
 * release the buyer may have) and license keys (`<HoldingKeys>`). A paid order also takes the
 * buyer's review of each line (`useOrderReviews`), once its window opens.
 */
export default function OrdersPage() {
  const t = useTranslations('orders');
  const params = useSearchParams();
  const { orders, loading, error } = useMyOrders();
  // Back from Stripe: the order the shop kept, else the latest one.
  const lastOrderId = useLastOrderId();
  const openId =
    params.get('id') ??
    (params.get('checkout') === 'success'
      ? (lastOrderId ?? orders[0]?._id ?? null)
      : null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      {openId && <OrderDetail id={openId} />}

      <ItemSubscriptions />

      {error && (
        <p role="alert" className="text-sm text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
      {!loading && !error && orders.length === 0 && (
        <Card>
          <CardContent className="text-muted-foreground py-10 text-center text-sm">
            {t('empty')}{' '}
            <Link href="/dashboard/shop" className="underline">
              {t('browse')}
            </Link>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {orders.map((order) => (
          <OrderRow key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
}

function OrderRow({ order }: { order: BuyerOrderView }) {
  const t = useTranslations('orders');
  const { fmtCents } = useTranslation();
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="text-base">
            {order.lines.map((l) => l.itemTitle).join(', ')}
          </CardTitle>
          <CardDescription>
            {t('from', { seller: order.seller.displayName })}
          </CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline">{orderDisplayStatus(order)}</Badge>
          <span className="font-medium">
            {fmtCents(order.total, order.currency)}
          </span>
          <Link
            href={`/dashboard/orders?id=${order._id}`}
            className="text-sm underline"
          >
            {t('open')}
          </Link>
        </div>
      </CardHeader>
    </Card>
  );
}

function OrderDetail({ id }: { id: string }) {
  const t = useTranslations('orders');
  const { fmtCents } = useTranslation();
  const { order, error } = useMyOrder(id, { waitForPayment: true });
  const { holdings } = useHoldings({ orderId: id });

  if (error)
    return (
      <p role="alert" className="text-sm text-red-700 dark:text-red-400">
        {error}
      </p>
    );
  if (!order) return <p className="text-sm">{t('loading')}</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t('yourOrder')}</CardTitle>
        <CardDescription>
          {t('from', { seller: order.seller.displayName })} ·{' '}
          {orderDisplayStatus(order)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <ul className="space-y-1">
          {order.lines.map((line) => (
            <li key={line.lineKey} className="space-y-0.5">
              <div className="flex justify-between gap-3">
                <span>
                  {line.itemTitle} × {line.quantity}
                </span>
                <span>{fmtCents(line.total, order.currency)}</span>
              </div>
              {/* What the seller has to do by hand: waiting, in progress or
                  done, with their note to the buyer. */}
              {line.fulfilment !== 'not_required' && (
                <p className="text-muted-foreground text-xs">
                  {t(`fulfilment.${line.fulfilment}`)}
                  {line.fulfilmentNote ? ` · ${line.fulfilmentNote}` : ''}
                </p>
              )}
            </li>
          ))}
        </ul>
        <p className="flex justify-between font-medium">
          <span>{t('total')}</span>
          <span>{fmtCents(order.total, order.currency)}</span>
        </p>
        {holdings.length > 0 && (
          <div className="space-y-2">
            <p className="font-medium">{t('whatYouGot')}</p>
            {holdings.map((h) =>
              h.kind === 'license_key' ? (
                <HoldingKeys key={h._id} holding={h} canRemove />
              ) : h.kind === 'file' ? (
                <HoldingFiles key={h._id} holding={h} />
              ) : h.content?.url ? (
                <a
                  key={h._id}
                  href={h.content.url}
                  className="block underline"
                  rel="noreferrer"
                  target="_blank"
                >
                  {h.title ?? h.itemTitle}
                </a>
              ) : h.content?.text ? (
                <p key={h._id}>{h.content.text}</p>
              ) : null
            )}
          </div>
        )}
        <OrderReviews orderId={order._id} />
      </CardContent>
    </Card>
  );
}
