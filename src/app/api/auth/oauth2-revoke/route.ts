import { NextRequest, NextResponse } from 'next/server';
import { handleAppRevokeRequest } from '@buildbase/sdk';
import { prisma } from '@/lib/db';
import { env } from '@/env';
import { logger } from '@/lib/logger';

/**
 * Application Revoke URL (`applicationRevokeUrl` on the BuildBase OAuth2
 * client).
 *
 * When a person revokes an agent's grant - from Connected agents here, from
 * the console, or by signing out everywhere - BuildBase calls this with a
 * short-lived JWT signed with the client secret. `handleAppRevokeRequest`
 * verifies it (401 otherwise) and hands over who and which client.
 *
 * The platform has already ended the grant's session, so the agent's next
 * tool call fails on its own; what is left for the app is to record it, which
 * is what makes a revocation visible in the app rather than only in the
 * console.
 */
export async function POST(request: NextRequest) {
  const { status, body } = await handleAppRevokeRequest({
    authorization: request.headers.get('authorization'),
    clientSecret:
      env.BUILDBASE_OAUTH2_CLIENT_SECRET || env.BUILDBASE_CLIENT_SECRET,
    onRevoke: async ({ userId, clientId, reason }) => {
      await prisma.appEvent
        .create({
          data: {
            eventType: 'agent:revoked',
            userId,
            payload: { clientId, reason },
          },
        })
        .catch((error: unknown) => {
          logger.error('Could not record an agent revocation', {
            error: error instanceof Error ? error.message : String(error),
          });
        });
      logger.info('Agent grant revoked', { userId, clientId, reason });
    },
  });
  return NextResponse.json(body, { status });
}
