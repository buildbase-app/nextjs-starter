'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';
import { locales, localeNames, type Locale } from '@/i18n/config';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('common.language');

  const switchLocale = (newLocale: Locale) => {
    // Get the path without the current locale prefix
    const segments = pathname.split('/');

    // Check if the first segment is a locale
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      // If no locale in path, add the new locale
      segments.splice(1, 0, newLocale);
    }

    const newPath = segments.join('/') || '/';
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" title={t('select')}>
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t('select')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => switchLocale(loc)}
            className={locale === loc ? 'bg-accent' : ''}
          >
            {localeNames[loc]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
