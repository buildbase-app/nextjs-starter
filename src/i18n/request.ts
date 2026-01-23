import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { Locale } from './config';
import { getMessages } from './messages';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Validate locale
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: getMessages(locale as Locale),
  };
});
