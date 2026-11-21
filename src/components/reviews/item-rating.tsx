'use client';

import { useTranslations } from 'next-intl';
import { useItemReviews } from '@buildbase/sdk/react';
import { Stars } from './star-rating';

/**
 * An item's rating and its newest review, from verified buyers only
 * (`useItemReviews`). Nothing shows until the item has a review.
 */
export function ItemRating({ itemId }: { itemId: string }) {
  const t = useTranslations('reviews');
  const { data } = useItemReviews(itemId, { sort: 'newest', limit: 1 });
  if (!data || data.rating.count === 0) return null;
  const latest = data.docs[0];
  return (
    <div className="space-y-1 text-sm">
      <p className="flex items-center gap-2">
        <Stars value={data.rating.average} />
        <span className="text-muted-foreground">
          {t('summary', {
            average: data.rating.average,
            count: data.rating.count,
          })}
        </span>
      </p>
      {latest?.text && (
        <blockquote className="text-muted-foreground border-l-2 pl-2 italic">
          “{latest.text}” - {latest.authorName ?? t('verifiedBuyer')}
        </blockquote>
      )}
    </div>
  );
}
