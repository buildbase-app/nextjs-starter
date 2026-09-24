import type { TaskId } from '../ids';
import type { TourGroupId } from '../types';

/** One language's words for the whole tour. Missing an id fails typecheck. */
export interface TourText {
  groups: Record<TourGroupId, { title: string; summary: string }>;
  tasks: Record<TaskId, { title: string; why: string; steps: string[] }>;
}
