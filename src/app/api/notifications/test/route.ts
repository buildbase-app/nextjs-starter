import { NextRequest, NextResponse } from 'next/server';
import { notification } from '@/lib/buildbase';
import { getSessionContext } from '@/lib/server-auth';
import { detect } from '@/tour/progress';

/**
 * Send a notification from the app. One call; the platform decides which
 * channels fire from the event's settings, the workspace defaults and the
 * person's own preferences, and every recipient gets an inbox item either way.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSessionContext();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { workspaceId, userId, event, ...data } = body;

    if (!workspaceId) {
      return NextResponse.json(
        { error: 'No workspace selected' },
        { status: 400 }
      );
    }

    if (!event) {
      return NextResponse.json(
        { error: 'Event slug is required' },
        { status: 400 }
      );
    }

    // Strip empty strings so the SDK uses its defaults
    const cleaned = Object.fromEntries(
      Object.entries(data).filter(
        ([, v]) => v !== undefined && v !== null && v !== ''
      )
    );

    const result = await notification.send(workspaceId, event, userId, cleaned);

    if (result.sent) {
      await detect(session.userId, {
        kind: 'action',
        action: 'notification:sent',
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to send notification';
    console.error('Notification test error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
