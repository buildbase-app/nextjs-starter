import { NextRequest, NextResponse } from 'next/server';
import { getSessionContext } from '@/lib/server-auth';
import { taskById } from '@/tour/catalog';
import { completeTask, uncompleteTask } from '@/tour/progress';

type Params = { params: Promise<{ taskId: string }> };

/** "Mark done" for a task nothing can observe. */
export async function POST(_request: NextRequest, { params }: Params) {
  const session = await getSessionContext();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { taskId } = await params;
  if (!taskById(taskId)) {
    return NextResponse.json({ error: 'Unknown task' }, { status: 404 });
  }
  const ok = await completeTask(session.userId, taskId, 'manual');
  if (!ok) {
    return NextResponse.json({ error: 'Could not save' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

/** Undo. */
export async function DELETE(_request: NextRequest, { params }: Params) {
  const session = await getSessionContext();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { taskId } = await params;
  await uncompleteTask(session.userId, taskId);
  return NextResponse.json({ ok: true });
}
