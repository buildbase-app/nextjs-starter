import type { Messages } from '../types';
import type { Locale } from '../config';

import en from './en';
import hi from './hi';
import es from './es';
import fr from './fr';
import de from './de';
import ja from './ja';
import zh from './zh';
import ar from './ar';

// Type-safe messages map - TypeScript will error if any locale is missing
export const messages: Record<Locale, Messages> = {
  en,
  hi,
  es,
  fr,
  de,
  ja,
  zh,
  ar,
};

export function getMessages(locale: Locale): Messages {
  return messages[locale] ?? messages.en;
}
