'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Read headings from the DOM once after mount. Uses useSyncExternalStore
 * with a snapshot to avoid the "setState in effect" lint error.
 */
function useHeadings(): TocItem[] {
  const cached = useRef<TocItem[]>([]);

  return useSyncExternalStore(
    // subscribe — headings are static after first paint, no-op
    (cb) => {
      // Read on first subscribe (client mount)
      const headings = Array.from(
        document.querySelectorAll('article h2, article h3')
      );
      cached.current = headings
        .filter((el) => el.id)
        .map((el) => ({
          id: el.id,
          text: el.textContent ?? '',
          level: el.tagName === 'H2' ? 2 : 3,
        }));
      cb();
      return () => {};
    },
    // getSnapshot
    () => cached.current,
    // getServerSnapshot
    () => []
  );
}

/**
 * Auto-generated table of contents from headings in the page.
 * Reads h2/h3 elements from the DOM after mount (works with MDX
 * since headings get id attributes from rehype-slug).
 */
export function TableOfContents() {
  const items = useHeadings();
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav className="border-border rounded-lg border p-5">
      <p className="text-foreground mb-3 text-sm font-medium">On this page</p>
      <ul className="flex flex-col gap-1.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-sm leading-relaxed transition-colors ${
                item.level === 3 ? 'pl-4' : ''
              } ${
                activeId === item.id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
