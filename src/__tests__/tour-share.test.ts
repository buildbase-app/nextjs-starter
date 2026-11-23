import { describe, expect, it } from 'vitest';
import { TOUR_TASKS } from '@/tour/catalog';
import { decodeProgress, encodeProgress, tourColumns } from '@/tour/share';

describe('tour progress share codes', () => {
  it('round-trips any set of finished tasks', () => {
    const picks = [
      [],
      [TOUR_TASKS[0].id],
      [TOUR_TASKS[7].id, TOUR_TASKS[8].id, TOUR_TASKS.at(-1)!.id],
      TOUR_TASKS.map((t) => t.id),
    ];
    for (const ids of picks) {
      expect([...decodeProgress(encodeProgress(ids))].sort()).toEqual(
        [...ids].sort()
      );
    }
  });

  it('is short and URL-safe', () => {
    const code = encodeProgress(TOUR_TASKS.map((t) => t.id));
    expect(code.length).toBeLessThanOrEqual(
      Math.ceil(Math.ceil(TOUR_TASKS.length / 8) * (4 / 3))
    );
    expect(code).toMatch(/^[A-Za-z0-9_-]+$/);
  });

  it('ignores ids the catalog does not have', () => {
    expect(decodeProgress(encodeProgress(['not-a-task'])).size).toBe(0);
  });

  it('reads nothing from a malformed or hostile code', () => {
    for (const bad of [null, '', '%%%', '<script>', 'a'.repeat(500)]) {
      expect(decodeProgress(bad).size).toBe(0);
    }
  });

  it('lays out every task exactly once', () => {
    const ids = tourColumns().flatMap((c) => c.taskIds);
    expect(ids).toHaveLength(TOUR_TASKS.length);
    expect(new Set(ids).size).toBe(TOUR_TASKS.length);
  });
});
