'use client';

import { useState, useCallback, type ComponentPropsWithoutRef } from 'react';
import { X } from 'lucide-react';

/**
 * MDX image with click-to-zoom lightbox.
 * Replaces the default `<img>` in MDX rendering.
 */
export function ImageZoom({ alt, ...props }: ComponentPropsWithoutRef<'img'>) {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* Inline image — clickable */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...props}
        alt={alt ?? ''}
        className="border-border my-8 w-full cursor-zoom-in rounded-md border"
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleOpen();
        }}
      />

      {/* Lightbox overlay */}
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label={alt ?? 'Image preview'}
        >
          <button
            onClick={handleClose}
            className="bg-background/20 text-foreground hover:bg-background/40 absolute top-4 right-4 rounded-full p-2 transition-colors"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            {...props}
            alt={alt ?? ''}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}
