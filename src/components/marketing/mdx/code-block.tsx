'use client';

import { useState, useCallback, type ComponentPropsWithoutRef } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps extends ComponentPropsWithoutRef<'pre'> {
  code: string;
}

export function CodeBlock({ code, children, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="group relative my-6">
      <pre
        {...props}
        className="bg-muted border-border overflow-x-auto rounded-md border p-4 font-mono text-sm leading-relaxed [&>code]:border-0 [&>code]:bg-transparent [&>code]:p-0"
      >
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="text-muted-foreground hover:text-foreground absolute top-3 right-3 rounded-md p-1.5 opacity-0 transition-all group-hover:opacity-100"
        aria-label={copied ? 'Copied!' : 'Copy code'}
      >
        {copied ? (
          <Check className="text-success size-4" />
        ) : (
          <Copy className="size-4" />
        )}
      </button>
    </div>
  );
}
