import type { Locale } from '@/i18n/config';
import { TOUR_GROUP_IDS, TOUR_TASKS } from '../catalog';
import type { TourGroup, TourTask } from '../types';
import { en } from './en';
import { hi } from './hi';
import { es } from './es';
import { fr } from './fr';
import { de } from './de';
import { ja } from './ja';
import { zh } from './zh';
import { ar } from './ar';
import type { TourText, TourTextPartial } from './types';

const TEXT: Record<Locale, TourText | TourTextPartial> = {
  en,
  hi,
  es,
  fr,
  de,
  ja,
  zh,
  ar,
};

function textFor(locale: string): TourTextPartial {
  return TEXT[locale as Locale] ?? en;
}

/** The groups, worded for a language. */
export function tourGroups(locale: string): TourGroup[] {
  const text = textFor(locale);
  return TOUR_GROUP_IDS.map((id) => ({
    id,
    ...(text.groups[id] ?? en.groups[id]),
  }));
}

/** Every task, worded for a language, in tour order. */
export function tourTasks(locale: string): TourTask[] {
  const text = textFor(locale);
  return TOUR_TASKS.map((task) => ({
    ...task,
    ...(text.tasks[task.id] ?? en.tasks[task.id]),
  }));
}
