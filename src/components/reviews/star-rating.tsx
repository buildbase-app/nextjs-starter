'use client';

import { useId } from 'react';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { REVIEW_LIMITS } from '@buildbase/sdk/react';
import { cn } from '@/lib/utils';

const STARS = Array.from(
  { length: REVIEW_LIMITS.RATING_MAX },
  (_, i) => i + REVIEW_LIMITS.RATING_MIN
);

/** Read-only stars for a rating such as 4.5, with the number said in words. */
export function Stars({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const t = useTranslations('reviews');
  return (
    <span
      role="img"
      aria-label={t('outOf', { rating: value })}
      className={cn('inline-flex items-center gap-0.5', className)}
    >
      {STARS.map((n) => (
        <Star
          key={n}
          aria-hidden
          className={cn(
            'h-4 w-4',
            value >= n - 0.25
              ? 'fill-amber-400 text-amber-400'
              : 'text-muted-foreground'
          )}
        />
      ))}
    </span>
  );
}

/**
 * Picking a rating: a radio group of five stars, so it works with the
 * keyboard (arrows move, the choice is announced) as well as the pointer.
 */
export function StarInput({
  value,
  onChange,
  disabled,
}: {
  value: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
}) {
  const t = useTranslations('reviews');
  const name = useId();
  return (
    <fieldset className="flex items-center gap-1" disabled={disabled}>
      <legend className="sr-only">{t('ratingLabel')}</legend>
      {STARS.map((n) => (
        <label key={n} className="cursor-pointer">
          <input
            type="radio"
            name={name}
            value={n}
            checked={value === n}
            onChange={() => onChange(n)}
            className="peer sr-only"
          />
          <span className="sr-only">{t('outOf', { rating: n })}</span>
          <Star
            aria-hidden
            className={cn(
              'peer-focus-visible:ring-ring h-6 w-6 rounded-sm peer-focus-visible:ring-2',
              value >= n
                ? 'fill-amber-400 text-amber-400'
                : 'text-muted-foreground'
            )}
          />
        </label>
      ))}
    </fieldset>
  );
}
