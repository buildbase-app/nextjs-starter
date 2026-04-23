'use client';

import { useState, useCallback } from 'react';
import { Check, Copy, Twitter, Linkedin, Facebook } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
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
      <span className="text-muted-foreground text-sm">Share</span>
      <div className="flex items-center gap-1">
        <a
          href={`https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground rounded-md p-2 transition-colors"
          aria-label="Share on X / Twitter"
        >
          <Twitter className="size-4" />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground rounded-md p-2 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="size-4" />
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground rounded-md p-2 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook className="size-4" />
        </a>
        <button
          onClick={handleCopy}
          className="text-muted-foreground hover:text-foreground rounded-md p-2 transition-colors"
          aria-label={copied ? 'Link copied!' : 'Copy link'}
        >
          {copied ? (
            <Check className="size-4 text-green-500" />
          ) : (
            <Copy className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}
