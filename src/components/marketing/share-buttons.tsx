'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Check, Copy, Twitter, Linkedin, Facebook } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const t = useTranslations('blog');
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [url]);

  return (
    <div className="flex items-center gap-3">
      <span className="text-muted-foreground text-sm">{t('share')}</span>
      <div className="flex items-center gap-1">
        <a
          href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground rounded-md p-2 transition-colors"
          aria-label={t('shareAriaX')}
        >
          <Twitter className="size-4" />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground rounded-md p-2 transition-colors"
          aria-label={t('shareAriaLinkedin')}
        >
          <Linkedin className="size-4" />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground rounded-md p-2 transition-colors"
          aria-label={t('shareAriaFacebook')}
        >
          <Facebook className="size-4" />
        </a>
        <button
          onClick={handleCopy}
          className="text-muted-foreground hover:text-foreground rounded-md p-2 transition-colors"
          aria-label={copied ? t('shareAriaCopied') : t('shareAriaCopy')}
        >
          {copied ? (
            <Check className="text-success size-4" />
          ) : (
            <Copy className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}
