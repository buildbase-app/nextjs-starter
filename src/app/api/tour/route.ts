import { NextResponse } from 'next/server';
import { getSessionContext } from '@/lib/server-auth';
import { getProgress } from '@/tour/progress';

/** The signed-in person's tour progress. */
export async function GET() {
  const session = await getSessionContext();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const progress = await getProgress(session.userId);
  return NextResponse.json({ progress });
}
