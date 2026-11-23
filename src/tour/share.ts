import { TOUR_GROUP_IDS, TOUR_TASKS } from './catalog';
import { decodeProgressCode, encodeProgressCode } from './share-code';

/**
 * Share codes bound to the catalog's task order (server side; the client
 * gets the order as a prop and uses ./share-code directly).
 *
 * The bit order is the catalog's, so a task added or reordered later shifts
 * what an old link shows. Accepted: a shared link is a snapshot to look at,
 * not a record.
 */
export const TASK_ORDER: readonly string[] = TOUR_TASKS.map((t) => t.id);

export function encodeProgress(done: Iterable<string>): string {
  return encodeProgressCode(done, TASK_ORDER);
}

export function decodeProgress(code: string | null | undefined): Set<string> {
  return decodeProgressCode(code, TASK_ORDER);
}

/** The map's columns: one per group, its task ids in catalog order. */
export function tourColumns(): { id: string; taskIds: string[] }[] {
  return TOUR_GROUP_IDS.map((id) => ({
    id,
    taskIds: TOUR_TASKS.filter((t) => t.group === id).map((t) => t.id),
  }));
}
