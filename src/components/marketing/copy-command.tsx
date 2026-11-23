'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CopyCommandProps {
  command: string;
  /** Accessible name of the command, e.g. "Clone command". */
  label: string;
  copyLabel: string;
  copiedLabel: string;
  className?: string;
  /**
   * A prompt for a coding agent rather than a shell command: no `$`, and the
   * text wraps instead of being cut to one line.
   */
  prompt?: boolean;
}

/**
 * A shell command with a copy button. The button says what happened
 * ("Copied") in place, and a polite live region repeats it for screen
 * readers; it settles back after two seconds.
 */
export function CopyCommand({
  command,
  label,
  copyLabel,
  copiedLabel,
  className,
  prompt = false,
}: CopyCommandProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (insecure origin, permissions). The text is
      // selectable, so the visitor can still copy it by hand.
    }
  }

  return (
    <div
      className={cn(
        'bg-card flex max-w-full gap-3 rounded-lg border py-1.5 ps-4 pe-1.5 font-mono text-sm',
        prompt ? 'items-start' : 'items-center',
        className
      )}
    >
      {prompt ? null : (
        <span aria-hidden className="text-muted-foreground select-none">
          $
        </span>
      )}
      <code
        aria-label={label}
        className={cn(
          'min-w-0 flex-1 select-all',
          prompt ? 'py-1.5 leading-relaxed whitespace-normal' : 'truncate'
        )}
        dir="ltr"
      >
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        className="text-muted-foreground hover:text-foreground hover:bg-muted focus-visible:ring-ring inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md px-2.5 font-sans text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none active:scale-[0.97]"
      >
        {copied ? (
          <Check aria-hidden className="text-success size-3.5" />
        ) : (
          <Copy aria-hidden className="size-3.5" />
        )}
        {copied ? copiedLabel : copyLabel}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ''}
      </span>
    </div>
  );
}
