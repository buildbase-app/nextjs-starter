import 'server-only';
import { adminFetch, AdminApiError } from '@/lib/buildbase-admin';

/**
 * A form built in the console: its fields come from a public endpoint and
 * a submission is a public POST, so the browser could talk to the platform
 * directly. This app proxies both through its server so it can add its own
 * checks (a session, a rate limit, bot protection) and tick the tour.
 */

export const FORM_NAME = 'Contact';

export interface FormField {
  slug: string;
  title: string;
  helpText?: string;
  type:
    | 'text'
    | 'rich-text'
    | 'number'
    | 'bool'
    | 'date'
    | 'color'
    | 'link'
    | 'email';
  required?: boolean;
  defaultValue?: unknown;
}

export interface FormSummary {
  _id: string;
  /** The public id, as `/api/forms/public/:orgId/:formId` expects it. */
  publicId: string;
  name: string;
  title: string;
  description?: string;
  collectionId: string;
}

export interface Submission {
  _id: string;
  data: Record<string, unknown>;
  createdAt: string;
}

const ORG_ID = process.env.NEXT_PUBLIC_BUILDBASE_ORG_ID ?? '';
const BASE = (process.env.NEXT_PUBLIC_BUILDBASE_SERVER_URL ?? '').replace(
  /\/$/,
  ''
);

export async function findForm(name = FORM_NAME): Promise<FormSummary | null> {
  const list = await adminFetch<
    { docs: Array<Record<string, unknown>> } | Array<Record<string, unknown>>
  >('forms', { query: { pagination: false } });
  const docs = Array.isArray(list) ? list : (list?.docs ?? []);
  const form = docs.find((f) => f.name === name);
  if (!form) return null;
  // The API returns `formId` prefixed with the org (`/<org>/<id>`).
  const raw = String(form.formId ?? '');
  const publicId = raw.split('/').filter(Boolean).pop() ?? raw;
  const collection = form.collectionId as { _id?: string } | string;
  return {
    _id: String(form._id),
    publicId,
    name: String(form.name),
    title: String(form.title ?? form.name),
    description:
      typeof form.description === 'string' ? form.description : undefined,
    collectionId:
      typeof collection === 'string'
        ? collection
        : String(collection?._id ?? ''),
  };
}

export async function getFields(publicId: string): Promise<FormField[]> {
  const res = await fetch(
    `${BASE}/api/forms/public/${ORG_ID}/${publicId}/fields`,
    {
      cache: 'no-store',
    }
  );
  if (!res.ok) throw new AdminApiError(res.status, 'Form fields unavailable');
  const body = (await res.json()) as { data?: FormField[] } | FormField[];
  return Array.isArray(body) ? body : (body.data ?? []);
}

export interface SubmitResult {
  ok: boolean;
  status: number;
  message?: string;
  errors?: unknown[];
}

export async function submit(
  publicId: string,
  data: Record<string, unknown>
): Promise<SubmitResult> {
  const res = await fetch(
    `${BASE}/api/forms/public/${ORG_ID}/${publicId}/submit`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      cache: 'no-store',
    }
  );
  const body = (await res.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
    errors?: unknown[];
  };
  return {
    ok: res.ok && body.success !== false,
    status: res.status,
    message: body.message,
    errors: body.errors,
  };
}

export async function listSubmissions(
  formId: string,
  limit = 20
): Promise<Submission[]> {
  const list = await adminFetch<{ docs: Submission[] } | Submission[]>(
    `forms/${formId}/submissions`,
    {
      query: { sort: { createdAt: -1 }, $limit: limit },
    }
  );
  return Array.isArray(list) ? list : (list?.docs ?? []);
}
