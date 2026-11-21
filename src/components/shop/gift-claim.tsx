'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import {
  HoldingFiles,
  HoldingKeys,
  formatMinorAmountIntl,
  useGift,
  useSaaSAuth,
} from '@buildbase/sdk/react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

/**
 * The page a gift's email links to (`?gift=` and `?token=`): who sent it,
 * their note and what it is, read with the link alone (`useGift`). Claiming
 * signed in moves it into the person's account (it then lists in Orders);
 * claiming signed out takes it as a guest and shows what it delivers here.
 */
export function GiftClaim() {
  const t = useTranslations('gifts');
  const format = useFormatter();
  const locale = useLocale();
  const { isAuthenticated } = useSaaSAuth();
  // The email's link carries `?gift=` and `?token=`.
  const params = useSearchParams();
  const giftId = params.get('gift');
  const token = params.get('token');
  const link = useMemo(
    () => (giftId && token ? { giftId, token } : null),
    [giftId, token]
  );
  const { data, loading, error, claim, claiming } = useGift(link);

  if (link === null) {
    return <p className="text-muted-foreground">{t('noLink')}</p>;
  }
  if (loading || !data) {
    return error ? (
      <p role="alert" className="text-red-700 dark:text-red-400">
        {error}
      </p>
    ) : (
      <p className="text-muted-foreground">{t('loading')}</p>
    );
  }

  const { gift, holdings } = data;
  const claimed = !!gift.claimedAt;
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>
          {gift.senderName
            ? t('fromName', { name: gift.senderName })
            : t('fromSomeone')}
        </CardTitle>
        <CardDescription>
          {gift.itemTitles.join(', ')} ·{' '}
          {t('bySeller', { seller: gift.sellerName })}
          {gift.total !== undefined && gift.currency
            ? ` · ${formatMinorAmountIntl(gift.total, gift.currency, locale)}`
            : ''}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {gift.message && (
          <blockquote className="border-l-2 pl-3 italic">
            {gift.message}
          </blockquote>
        )}
        {error && (
          <p role="alert" className="text-red-700 dark:text-red-400">
            {error}
          </p>
        )}
        {!claimed ? (
          <div className="space-y-2">
            <Button onClick={() => void claim()} disabled={claiming}>
              {claiming
                ? t('claiming')
                : isAuthenticated
                  ? t('claimToAccount')
                  : t('claimAsGuest')}
            </Button>
            {!isAuthenticated && (
              <p className="text-muted-foreground text-xs">{t('signInHint')}</p>
            )}
          </div>
        ) : gift.claimedAs === 'user' ? (
          <p role="status">
            {t('claimedToAccount')}{' '}
            <Link href="/dashboard/orders" className="underline">
              {t('openOrders')}
            </Link>
          </p>
        ) : (
          <div className="space-y-3">
            <p role="status">{t('claimedAsGuest')}</p>
            {holdings.map((h) =>
              h.kind === 'license_key' ? (
                <HoldingKeys key={h._id} holding={h} />
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
        {gift.claimedAt && (
          <p className="text-muted-foreground text-xs">
            {t('claimedAt', {
              date: format.dateTime(new Date(gift.claimedAt), {
                dateStyle: 'medium',
              }),
            })}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
