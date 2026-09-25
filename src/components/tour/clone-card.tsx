'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, Copy, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cloneCommand, siteConfig } from '@/config/site';

/**
 * Everything on the tour is in one public repository. This card says so at
 * the top, with the clone command, so a visitor can read how any task is
 * built or start their own app from it.
 */
export function CloneCard() {
  const t = useTranslations('tour');
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(cloneCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* the command stays selectable */
    }
  };

  return (
    <div className="bg-card flex flex-col gap-4 rounded-xl border p-5 md:flex-row md:items-center">
      <div className="flex-1 space-y-1">
        <h2 className="flex items-center gap-2 font-semibold">
          <Github className="h-4 w-4" /> {t('cloneTitle')}
        </h2>
        <p className="text-muted-foreground text-sm">{t('cloneBody')}</p>
        <div className="bg-muted mt-2 flex items-center gap-2 rounded-md px-3 py-2 font-mono text-xs">
          <code className="flex-1 overflow-x-auto whitespace-nowrap select-all">
            {cloneCommand}
          </code>
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? t('copied') : t('copy')}
            className="text-muted-foreground hover:text-foreground shrink-0"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
      <Button asChild variant="outline" className="shrink-0">
        <a href={siteConfig.repo} target="_blank" rel="noopener noreferrer">
          {t('browseCode')}
        </a>
      </Button>
    </div>
  );
}
