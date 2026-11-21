'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { CartSummary, useCart } from '@buildbase/sdk/react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

/**
 * The buyer's cart across sellers: the SDK's `<CartSummary>` lists the lines
 * added in the shop (kept in this browser by `useCart`), asks a time for a
 * line booked by time, takes a coupon code (`coupons`), and checks everything
 * out on one Stripe page. Each seller gets an order of their own, all sharing
 * the cart's id. Stripe sends the buyer to Orders afterwards.
 */
export default function CartPage() {
  const t = useTranslations('cart');
  const locale = useLocale();
  const cart = useCart();
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

      {cart.lines.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-10 text-center text-sm">
            <p className="text-muted-foreground">{t('empty')}</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/shop">{t('browse')}</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="max-w-2xl space-y-3">
          <CartSummary coupons successUrl={successUrl} />
          <p className="text-muted-foreground text-xs">{t('couponHint')}</p>
        </div>
      )}
    </div>
  );
}
