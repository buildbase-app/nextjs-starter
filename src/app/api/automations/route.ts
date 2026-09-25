import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { AdminApiError, adminFetch, hasAdminApi } from '@/lib/buildbase-admin';
import { getSessionContext } from '@/lib/server-auth';
import { detect } from '@/tour/progress';

interface InstanceDoc {
  _id: string;
  workflow?: { _id?: string; name?: string } | string;
  workflowVersion?: number;
  status?: string;
  trigger?: { event?: string };
  startedAt?: string;
  completedAt?: string | null;
  completedNodeIds?: string[];
  failedNodeIds?: string[];
  currentNodeIds?: string[];
  error?: string | null;
}

/**
 * The signed-in person's workflow runs, read from the org API, plus the
 * provisioning calls workflows made into this app. Workflows have no SDK
 * surface; the org token stays on the server.
 */
export async function GET() {
  const session = await getSessionContext();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const calls = await prisma.webhookEvent.findMany({
    where: { event: 'workflow.http_webhook', userId: session.userId },
    orderBy: { receivedAt: 'desc' },
    take: 10,
    select: { id: true, payload: true, receivedAt: true },
  });

  if (!hasAdminApi()) {
    return NextResponse.json({
      configured: false,
      instances: [],
      calls: calls.map(serializeCall),
    });
  }

  try {
    const result = await adminFetch<{ docs?: InstanceDoc[] } | InstanceDoc[]>(
      `workflows/user/${encodeURIComponent(session.userId)}/instances`,
      { query: { $limit: 25, sort: { startedAt: -1 } } }
    );
    const docs = Array.isArray(result) ? result : (result?.docs ?? []);
    await detect(session.userId, {
      kind: 'action',
      action: 'automations:viewed',
    });
    return NextResponse.json({
      configured: true,
      instances: docs.map((d) => ({
        id: d._id,
        workflow:
          typeof d.workflow === 'object' && d.workflow
            ? (d.workflow.name ?? d.workflow._id ?? '')
            : String(d.workflow ?? ''),
        version: d.workflowVersion ?? null,
        status: d.status ?? 'unknown',
        event: d.trigger?.event ?? null,
        startedAt: d.startedAt ?? null,
        completedAt: d.completedAt ?? null,
        completed: d.completedNodeIds?.length ?? 0,
        failed: d.failedNodeIds?.length ?? 0,
        current: d.currentNodeIds ?? [],
        error: d.error ?? null,
      })),
      calls: calls.map(serializeCall),
    });
  } catch (error) {
    const status = error instanceof AdminApiError ? error.status : 500;
    return NextResponse.json(
      {
        configured: true,
        error: error instanceof Error ? error.message : 'Failed',
        instances: [],
        calls: calls.map(serializeCall),
      },
      { status: status >= 500 ? 502 : status }
    );
  }
}

function serializeCall(c: { id: string; payload: unknown; receivedAt: Date }) {
  return {
    id: c.id,
    payload: c.payload,
    receivedAt: c.receivedAt.toISOString(),
  };
}
