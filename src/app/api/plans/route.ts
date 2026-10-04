import { NextRequest, NextResponse } from 'next/server';
import { plans } from '@/lib/buildbase';
import { logger } from '@/lib/logger';

/**
 * GET /api/plans?slug= - the public plan group shown on /pricing, straight
 * from the BuildBase console, as JSON for agents and scripts. No auth; the
 * platform serves the same group without one. Advertised in llms.txt and
 * openapi.json as `getPublicPlans`.
 */
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug') || 'main-pricing';
  try {
    const group = await plans.getPublic(slug);
    return NextResponse.json(group, {
      headers: { 'Cache-Control': 'public, max-age=300' },
    });
  } catch (error) {
    const status =
      typeof (error as { status?: unknown })?.status === 'number'
        ? (error as { status: number }).status
        : 502;
    logger.debug('Public plans unavailable', {
      slug,
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { error: status === 404 ? 'not_found' : 'unavailable', slug },
      { status: status === 404 ? 404 : 502 }
    );
  }
}
