/**
 * The message namespaces client components on the public pages read.
 *
 * The locale layout sends only these to the browser; the dashboard layout
 * adds the full catalog for itself. The whole catalog is about 50 KB per
 * locale, serialized into every page's HTML and parsed before the page is
 * interactive, and the marketing pages need a fraction of it.
 *
 * `src/__tests__/public-messages.test.ts` walks every public route's client
 * components and fails when one reads a namespace missing from this list.
 */
export const PUBLIC_CLIENT_NAMESPACES = [
  'account',
  'blog',
  'common',
  'creditStore',
  'errors',
  'gifts',
  'help',
  'home',
  'pricing',
] as const;
