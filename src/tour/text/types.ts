import type { TaskId } from '../ids';
import type { TourGroupId } from '../types';

/** One language's words for the whole tour. Missing an id fails typecheck. */
export interface TourText {
  groups: Record<TourGroupId, { title: string; summary: string }>;
  tasks: Record<TaskId, { title: string; why: string; steps: string[] }>;
}

/** A translation: any id it lacks falls back to English. */
export interface TourTextPartial {
  groups: Partial<Record<TourGroupId, { title: string; summary: string }>>;
  tasks: Partial<
    Record<TaskId, { title: string; why: string; steps: string[] }>
  >;
}
