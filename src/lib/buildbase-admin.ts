import 'server-only';
import { logger } from '@/lib/logger';

/**
 * The organization API, for the modules the SDK does not wrap: content,
 * collections, forms, assets, short links, audience, workflows, reporting.
 *
 * Authenticated with an org API token (console → Settings → Tokens), which
 * carries the token's API role. Server-only on purpose: the token must
 * never reach a browser, so every page that shows this data reads it
 * through a route or a server component that calls this helper.
 */

const TOKEN = process.env.BUILDBASE_API_TOKEN;
const BASE = (process.env.NEXT_PUBLIC_BUILDBASE_SERVER_URL ?? '').replace(
  /\/$/,
  ''
);

export class AdminApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly body?: unknown
  ) {
    super(message);
    this.name = 'AdminApiError';
  }
}

/** True when the app has a token; pages degrade to a notice without one. */
export function hasAdminApi(): boolean {
  return Boolean(TOKEN && BASE);
}

export interface AdminFetchOptions extends Omit<RequestInit, 'body'> {
  /** Serialized as JSON unless it is FormData. */
  body?: unknown;
  /**
   * Query string parameters. Objects are expanded to bracket keys
   * (`filter[from]=…`), which is how the API's validators read `filter`,
   * `sort` and friends; a JSON string is rejected as "not an object".
   */
  query?: Record<string, string | number | boolean | object | undefined>;
}

/**
 * Call `/api/<path>` on the organization API and return the parsed body.
 * List endpoints return `{ docs, totalDocs, ... }`; single documents return
 * the document, sometimes under `doc` - callers unwrap what they expect.
 */
export async function adminFetch<T = unknown>(
  path: string,
  { body, query, headers, ...init }: AdminFetchOptions = {}
): Promise<T> {
  if (!hasAdminApi()) {
    throw new AdminApiError(503, 'BUILDBASE_API_TOKEN is not configured');
  }
  const url = new URL(`${BASE}/api/${path.replace(/^\//, '')}`);
  const setParam = (key: string, value: unknown) => {
    if (value === undefined || value === null) return;
    if (typeof value === 'object') {
      for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
        setParam(`${key}[${k}]`, v);
      }
      return;
    }
    url.searchParams.set(key, String(value));
  };
  for (const [k, v] of Object.entries(query ?? {})) setParam(k, v);
  const isForm = typeof FormData !== 'undefined' && body instanceof FormData;
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      ...(body !== undefined && !isForm
        ? { 'Content-Type': 'application/json' }
        : {}),
      ...headers,
    },
    body:
      body === undefined
        ? undefined
        : isForm
          ? (body as FormData)
          : JSON.stringify(body),
    cache: 'no-store',
  });
  const text = await res.text();
  let parsed: unknown = null;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    parsed = text;
  }
  if (!res.ok) {
    logger.warn('Organization API refused a call', {
      path,
      status: res.status,
    });
    const message =
      (parsed as { message?: string } | null)?.message ??
      `Organization API ${res.status}`;
    throw new AdminApiError(res.status, message, parsed);
  }
  // Most routes wrap the payload as `{ success, data }`.
  const wrapped = parsed as { data?: T } | null;
  return (
    wrapped && typeof wrapped === 'object' && 'data' in wrapped
      ? wrapped.data
      : parsed
  ) as T;
}
