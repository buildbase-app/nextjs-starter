'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { useSaaSAuth } from '@buildbase/sdk/react';

export interface TourMapColumn {
  id: string;
  title: string;
  taskIds: string[];
}

const GAP = 12; // distance between dot centres, px
const R = 3.5; // dot radius, px

/**
 * The whole tour at a glance: one column per group, one dot per task, so the
 * shape of the tour is visible before reading a word of it. Signed in, the
 * tasks you have finished fill in (from /api/tour, the same progress the
 * dashboard shows), so the page is a little different each time you come
 * back.
 *
 * The map is a picture of the index beside it, which carries the same
 * information as text, so the SVG is one labelled image rather than 122
 * focusable dots. Progress is fetched only once the SDK says the visitor is
 * signed in: a signed-out request would 401 and log a console error.
 */
export function TourMap({
  columns,
  total,
}: {
  columns: TourMapColumn[];
  total: number;
}) {
  const t = useTranslations('home.tourMap');
  const { isAuthenticated } = useSaaSAuth();
  const [done, setDone] = useState<Set<string> | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    const controller = new AbortController();
    fetch('/api/tour', { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((body: { progress?: { taskId: string }[] } | null) => {
        if (body?.progress)
          setDone(new Set(body.progress.map((row) => row.taskId)));
      })
      .catch(() => {
        // Progress is a bonus here; the map still reads without it.
      });
    return () => controller.abort();
  }, [isAuthenticated]);

  const tallest = Math.max(...columns.map((c) => c.taskIds.length));
  const width = columns.length * GAP;
  const height = tallest * GAP;
  const doneCount = done
    ? columns.reduce(
        (n, c) => n + c.taskIds.filter((id) => done.has(id)).length,
        0
      )
    : 0;
  const caption = done
    ? t('progress', { done: doneCount, total })
    : t('signedOut');

  let order = 0;

  return (
    <figure className="mt-12">
      <svg
        role="img"
        aria-label={`${t('label')} ${caption}`}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        className="max-w-full overflow-visible"
      >
        {columns.map((column, x) => (
          <g key={column.id} className="tour-map-column">
            <title>{`${column.title}: ${column.taskIds.length}`}</title>
            {/* A transparent hit area, so the whole column shows its title. */}
            <rect
              x={x * GAP}
              y={0}
              width={GAP}
              height={height}
              fill="transparent"
            />
            {column.taskIds.map((id, y) => {
              const isDone = done?.has(id) ?? false;
              const index = isDone ? order++ : 0;
              return (
                <circle
                  key={id}
                  cx={x * GAP + GAP / 2}
                  // Bottom-aligned, like a bar chart of dots.
                  cy={height - y * GAP - GAP / 2}
                  r={R}
                  className={
                    isDone
                      ? 'tour-map-dot fill-brand stroke-brand'
                      : 'tour-map-dot stroke-muted-foreground/50 fill-transparent'
                  }
                  strokeWidth={1}
                  style={
                    {
                      '--delay': `${Math.min(index, 40) * 18}ms`,
                    } as CSSProperties
                  }
                />
              );
            })}
          </g>
        ))}
      </svg>
      <figcaption className="text-muted-foreground mt-4 max-w-xs text-sm text-pretty">
        <span className="text-foreground font-medium tabular-nums">
          {caption}
        </span>{' '}
        {t('label')}
      </figcaption>
    </figure>
  );
}
