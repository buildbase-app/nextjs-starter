import 'server-only';
import { NextResponse } from 'next/server';
import { AdminApiError, hasAdminApi } from '@/lib/buildbase-admin';
import { getSessionContext, type SessionContext } from '@/lib/server-auth';

/**
 * The module routes (assets, links, audience, …) act for the signed-in
 * person with the org API token. Two refusals are shared: no session, and
 * no token configured - the second is a setup gap, not a permissions one,
 * so it says so.
 */
export async function requireSessionAndAdmin(): Promise<
  { ok: true; session: SessionContext } | { ok: false; response: NextResponse }
> {
  const session = await getSessionContext();
  if (!session) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    };
  }
  if (!hasAdminApi()) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'not_configured', message: 'BUILDBASE_API_TOKEN is not set' },
        { status: 503 }
      ),
    };
  }
  return { ok: true, session };
}

/** Turn an org API failure into the same status for the browser. */
export function adminErrorResponse(error: unknown): NextResponse {
  if (error instanceof AdminApiError) {
    return NextResponse.json(
      { error: error.message, details: error.body },
      { status: error.status >= 400 && error.status < 600 ? error.status : 502 }
    );
  }
  return NextResponse.json(
    { error: error instanceof Error ? error.message : 'Unknown error' },
    { status: 500 }
  );
}
