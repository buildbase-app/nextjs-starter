'use client';

import { useTranslations } from 'next-intl';
import { BookingDetails, useMyBookings } from '@buildbase/sdk/react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

/**
 * The times the signed-in person booked: each one is the SDK's
 * `<BookingDetails>`, with the time in the seller's zone and the buyer's own,
 * the calendar file and Google Calendar and Outlook links, and cancel and
 * move within the seller's rules. `replace` puts the answer of a cancel or a
 * move in place, so the list never reloads.
 */
export default function BookingsPage() {
  const t = useTranslations('bookings');
  const { data, loading, error, replace } = useMyBookings();

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
      {loading && data.length === 0 && (
        <p className="text-muted-foreground text-sm">{t('loading')}</p>
      )}
      {!loading && !error && data.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-10 text-center text-sm">
            <p className="text-muted-foreground">{t('empty')}</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard/shop">{t('browse')}</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {data.map((booking) => (
          <BookingDetails
            key={booking._id}
            booking={booking}
            onChanged={replace}
          />
        ))}
      </div>
    </div>
  );
}
