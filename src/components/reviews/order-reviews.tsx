'use client';

import { useState } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import {
  REVIEW_LIMITS,
  reviewWindowOpen,
  useOrderReviews,
  type ReviewLineState,
} from '@buildbase/sdk/react';
import { Button } from '@/components/ui/button';
import { Stars, StarInput } from './star-rating';

const CLOSED_CODES = [
  'reviews_off',
  'not_paid',
  'refunded',
  'not_delivered',
  'booking_not_ended',
  'not_open_yet',
  'window_closed',
] as const;
type ClosedCode = (typeof CLOSED_CODES)[number];

/**
 * The buyer's reviews of one order, line by line (`useOrderReviews`): a line
 * open to review takes a rating and a few words, a line already reviewed
 * shows it (and can be changed while its window is open), and a line that
 * cannot be reviewed yet says why, such as a booking that has not ended.
 */
export function OrderReviews({ orderId }: { orderId: string }) {
  const t = useTranslations('reviews');
  const reviews = useOrderReviews(orderId);
  if (reviews.loading || reviews.data.length === 0) return null;

  return (
    <section className="space-y-3" aria-labelledby={`reviews-${orderId}`}>
      <h3 id={`reviews-${orderId}`} className="font-medium">
        {t('title')}
      </h3>
      {reviews.error && (
        <p role="alert" className="text-sm text-red-700 dark:text-red-400">
          {reviews.error}
        </p>
      )}
      {reviews.data.map((line) => (
        <ReviewLine
          key={line.lineKey}
          line={line}
          showTitle={reviews.data.length > 1}
          reviews={reviews}
        />
      ))}
    </section>
  );
}

function ReviewLine({
  line,
  showTitle,
  reviews,
}: {
  line: ReviewLineState;
  showTitle: boolean;
  reviews: ReturnType<typeof useOrderReviews>;
}) {
  const t = useTranslations('reviews');
  const format = useFormatter();
  const open = reviewWindowOpen(line.window);
  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(line.mine?.rating ?? 0);
  const [text, setText] = useState(line.mine?.text ?? '');
  const [saved, setSaved] = useState(false);

  const title = showTitle ? (
    <p className="text-muted-foreground text-xs">{line.itemTitle}</p>
  ) : null;

  if (line.mine && !editing) {
    return (
      <div className="space-y-1 rounded-md border p-3">
        {title}
        <div className="flex items-center gap-2">
          <Stars value={line.mine.rating} />
          <span className="text-muted-foreground text-xs">{t('yours')}</span>
        </div>
        {line.mine.text && <p>{line.mine.text}</p>}
        {saved && (
          <p role="status" className="text-muted-foreground text-xs">
            {t('saved')}
          </p>
        )}
        {open && (
          <Button
            variant="link"
            size="sm"
            className="h-auto p-0"
            onClick={() => {
              setSaved(false);
              setEditing(true);
            }}
          >
            {t('edit')}
          </Button>
        )}
      </div>
    );
  }

  if (!open) {
    const closed = 'closed' in line.window ? line.window.closed : null;
    const code = CLOSED_CODES.includes(closed?.code as ClosedCode)
      ? (closed?.code as ClosedCode)
      : null;
    return (
      <div className="text-muted-foreground rounded-md border p-3 text-sm">
        {title}
        {code
          ? t(`closed.${code}`, {
              date: closed?.opensAt
                ? format.dateTime(new Date(closed.opensAt), {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })
                : '',
            })
          : closed?.message}
      </div>
    );
  }

  const submit = async () => {
    const input = { rating, text: text.trim() || null };
    const done = line.mine
      ? await reviews.edit(line.lineKey, input)
      : await reviews.write(line.lineKey, input);
    if (done) {
      setEditing(false);
      setSaved(true);
      await reviews.refetch();
    }
  };

  const textId = `review-text-${line.lineKey}`;
  return (
    <form
      className="space-y-2 rounded-md border p-3"
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
    >
      {title}
      <StarInput
        value={rating}
        onChange={setRating}
        disabled={reviews.pending}
      />
      <label htmlFor={textId} className="sr-only">
        {t('textLabel')}
      </label>
      <textarea
        id={textId}
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={REVIEW_LIMITS.TEXT_MAX_LENGTH}
        rows={3}
        placeholder={t('placeholder')}
        disabled={reviews.pending}
        className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring/50 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-[3px]"
      />
      {reviews.writeError && (
        <p role="alert" className="text-sm text-red-700 dark:text-red-400">
          {reviews.writeError}
        </p>
      )}
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={!rating || reviews.pending}>
          {reviews.pending
            ? t('saving')
            : line.mine
              ? t('update')
              : t('submit')}
        </Button>
        {line.mine && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setEditing(false)}
          >
            {t('cancel')}
          </Button>
        )}
      </div>
    </form>
  );
}
