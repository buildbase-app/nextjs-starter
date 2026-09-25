import { NextRequest, NextResponse } from 'next/server';
import { adminFetch, AdminApiError } from '@/lib/buildbase-admin';
import { detect } from '@/tour/progress';
import {
  adminErrorResponse,
  requireSessionAndAdmin,
} from '../../modules-shared';

const LIST_NAME = 'newsletter';

interface AudienceRow {
  _id: string;
  email: string;
  name: string;
}

/**
 * POST /api/audience/subscribe { email, name? }
 * An audience contact is a marketing record, not an account: it is created
 * (or found) by email and added to the `newsletter` list.
 */
export async function POST(request: NextRequest) {
  const gate = await requireSessionAndAdmin();
  if (!gate.ok) return gate.response;
  const body = (await request.json().catch(() => ({}))) as {
    email?: string;
    name?: string;
  };
  const email = body.email?.trim().toLowerCase();
  const name = body.name?.trim() || gate.session.name || email;
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json(
      { error: 'a valid email is required' },
      { status: 400 }
    );
  }

  try {
    let contact: AudienceRow | null = null;
    try {
      contact = await adminFetch<AudienceRow>('audience', {
        method: 'POST',
        body: { name, email, source: 'app-newsletter' },
      });
    } catch (error) {
      // Already a contact: find them and carry on to the list.
      if (!(error instanceof AdminApiError) || error.status !== 409)
        throw error;
      const found = await adminFetch<{ docs: AudienceRow[] }>('audience', {
        query: { filter: { email }, limit: 1 },
      });
      contact = found?.docs?.[0] ?? null;
    }
    if (!contact) {
      return NextResponse.json({ error: 'contact_not_found' }, { status: 502 });
    }

    const lists = await adminFetch<{ docs: { _id: string; name: string }[] }>(
      'audience-lists',
      { query: { filter: { name: LIST_NAME }, limit: 1 } }
    );
    const list = lists?.docs?.find((l) => l.name === LIST_NAME) ?? null;
    let listed = false;
    if (list) {
      try {
        await adminFetch(`audience-lists/${list._id}/members/add`, {
          method: 'POST',
          body: { members: [contact._id] },
        });
        listed = true;
      } catch (error) {
        // Already a member reads as a refusal on some versions; that is fine.
        if (!(error instanceof AdminApiError) || error.status >= 500)
          throw error;
        listed = true;
      }
    }

    await detect(
      gate.session.userId,
      { kind: 'action', action: 'audience:subscribed' },
      { email, listed }
    );
    return NextResponse.json({ contact, list: list?.name ?? null, listed });
  } catch (error) {
    return adminErrorResponse(error);
  }
}
