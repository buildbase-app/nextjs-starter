'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PagefindResult {
  url: string;
  meta?: { title?: string };
  excerpt?: string;
}

interface PagefindSearchResult {
  id: string;
  data: () => Promise<PagefindResult>;
}

interface PagefindInstance {
  search: (query: string) => Promise<{ results: PagefindSearchResult[] }>;
  destroy: () => void;
}

/**
 * Blog search powered by Pagefind.
 *
 * Pagefind indexes the built HTML at build time (`npx pagefind`)
 * and serves a lightweight client-side search index from `/pagefind/`.
 * This component lazy-loads the Pagefind JS bundle on first interaction.
 */
export function BlogSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PagefindResult[]>([]);
  const [loading, setLoading] = useState(false);
  const pagefindRef = useRef<PagefindInstance | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Lazy-load Pagefind on first open
  useEffect(() => {
    if (!open) return;
    if (pagefindRef.current) {
      inputRef.current?.focus();
      return;
    }

    async function loadPagefind() {
      try {
        // Pagefind generates this file at build time in public/pagefind/
        const pf =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (await (window as any).__pagefind_init?.()) ??
          (await import(
            /* webpackIgnore: true */ '/pagefind/pagefind.js' as string
          ));
        pagefindRef.current = pf;
      } catch {
        // Pagefind not indexed yet — will show empty results
      }
    }

    loadPagefind();
    inputRef.current?.focus();
  }, [open]);

  // Search on query change
  useEffect(() => {
    if (!query.trim() || !pagefindRef.current) {
      setResults([]);
      return;
    }

    let cancelled = false;
    setLoading(true);

    async function doSearch() {
      const pf = pagefindRef.current;
      if (!pf) return;

      const search = await pf.search(query);
      const items = await Promise.all(
        search.results.slice(0, 8).map((r) => r.data())
      );

      if (!cancelled) {
        setResults(items);
        setLoading(false);
      }
    }

    const timeout = setTimeout(doSearch, 200);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [query]);

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = useCallback(
    (url: string) => {
      setOpen(false);
      setQuery('');
      setResults([]);
      router.push(url);
    },
    [router]
  );

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors"
      >
        <Search className="size-4" />
        <span>Search posts...</span>
        <kbd className="bg-muted text-muted-foreground ml-2 hidden rounded px-1.5 py-0.5 font-mono text-xs sm:inline-block">
          {typeof navigator !== 'undefined' &&
          navigator.platform?.includes('Mac')
            ? '⌘K'
            : 'Ctrl+K'}
        </kbd>
      </button>

      {/* Search modal */}
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[15vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-background border-border w-full max-w-lg overflow-hidden rounded-xl border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="border-border flex items-center gap-3 border-b px-4 py-3">
              <Search className="text-muted-foreground size-5 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search blog posts..."
                className="text-foreground placeholder:text-muted-foreground flex-1 bg-transparent text-sm outline-none"
              />
              {query ? (
                <button
                  onClick={() => {
                    setQuery('');
                    setResults([]);
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              ) : (
                <kbd className="text-muted-foreground font-mono text-xs">
                  ESC
                </kbd>
              )}
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto">
              {loading ? (
                <div className="text-muted-foreground p-6 text-center text-sm">
                  Searching...
                </div>
              ) : query && results.length === 0 ? (
                <div className="text-muted-foreground p-6 text-center text-sm">
                  No results for &ldquo;{query}&rdquo;
                </div>
              ) : (
                results.map((result, i) => (
                  <button
                    key={`${result.url}-${i}`}
                    onClick={() => handleNavigate(result.url)}
                    className="hover:bg-muted flex w-full flex-col gap-1 px-4 py-3 text-left transition-colors"
                  >
                    <span className="text-foreground text-sm font-medium">
                      {result.meta?.title ?? result.url}
                    </span>
                    {result.excerpt ? (
                      <span
                        className="text-muted-foreground line-clamp-2 text-xs"
                        dangerouslySetInnerHTML={{ __html: result.excerpt }}
                      />
                    ) : null}
                  </button>
                ))
              )}
              {!query ? (
                <div className="text-muted-foreground p-6 text-center text-sm">
                  Start typing to search...
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
