'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Headings read from the DOM after mount, through useSyncExternalStore (no
 * setState in an effect). `subscribe` must keep one identity: an inline one
 * is re-subscribed on every render, and a subscribe that reports a change
 * each time loops until React gives up ("Maximum update depth exceeded").
 * So it lives at module level and only notifies when the headings changed,
 * e.g. after a client-side move to another post.
 */
const EMPTY: TocItem[] = [];
let headingsSnapshot: TocItem[] = EMPTY;

function readHeadings(): TocItem[] {
  return Array.from(document.querySelectorAll('article h2, article h3'))
    .filter((el) => el.id)
    .map((el) => ({
      id: el.id,
      text: el.textContent ?? '',
      level: el.tagName === 'H2' ? 2 : 3,
    }));
}

const keyOf = (items: TocItem[]) =>
  items.map((i) => `${i.level}:${i.id}:${i.text}`).join('|');

function subscribeHeadings(onChange: () => void) {
  const next = readHeadings();
  if (keyOf(next) !== keyOf(headingsSnapshot)) {
    headingsSnapshot = next;
    onChange();
  }
  return () => {};
}

const getHeadings = () => headingsSnapshot;
const getServerHeadings = () => EMPTY;

function useHeadings(): TocItem[] {
  return useSyncExternalStore(
    subscribeHeadings,
    getHeadings,
    getServerHeadings
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
