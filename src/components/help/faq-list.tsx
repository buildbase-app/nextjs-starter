'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqItem {
  _id: string;
  question: string;
  answer: string;
}

export function FaqList({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <ul className="mt-4 divide-y rounded-xl border">
      {faqs.map((faq) => {
        const isOpen = open === faq._id;
        return (
          <li key={faq._id}>
            <button
              type="button"
              className="hover:bg-muted/50 flex w-full items-center justify-between gap-3 px-4 py-3 text-start text-sm font-medium"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : faq._id)}
            >
              {faq.question}
              <ChevronDown
                className={cn(
                  'text-muted-foreground h-4 w-4 shrink-0 transition-transform',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            {isOpen && (
              <div
                className="text-muted-foreground px-4 pb-4 text-sm leading-relaxed [&_a]:underline [&_p]:my-2"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}
