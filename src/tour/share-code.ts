/**
 * Tour progress as a short, shareable code: one bit per task in the given
 * order, base64url. 122 tasks fit in 22 characters and the link carries no
 * account id. Pure and catalog-free, so a client component can use it
 * without pulling the tour catalog into the browser bundle; `./share`
 * binds it to the catalog's order for the server.
 */

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function fromBase64Url(code: string): Uint8Array | null {
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(code)) return null;
  try {
    const padded = code.replace(/-/g, '+').replace(/_/g, '/');
    const binary = atob(padded + '='.repeat((4 - (padded.length % 4)) % 4));
    return Uint8Array.from(binary, (c) => c.charCodeAt(0));
  } catch {
    return null;
  }
}

export function encodeProgressCode(
  done: Iterable<string>,
  order: readonly string[]
): string {
  const finished = new Set(done);
  const bytes = new Uint8Array(Math.ceil(order.length / 8));
  order.forEach((id, i) => {
    if (finished.has(id)) bytes[i >> 3] |= 1 << (i & 7);
  });
  return toBase64Url(bytes);
}

/** The ids a code names; a malformed code names none. */
export function decodeProgressCode(
  code: string | null | undefined,
  order: readonly string[]
): Set<string> {
  const done = new Set<string>();
  const bytes = code ? fromBase64Url(code) : null;
  if (!bytes) return done;
  order.forEach((id, i) => {
    if ((bytes[i >> 3] ?? 0) & (1 << (i & 7))) done.add(id);
  });
  return done;
}
