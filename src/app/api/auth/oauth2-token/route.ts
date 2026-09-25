import { NextRequest, NextResponse } from 'next/server';
import { handleAppTokenRequest, mintAgentToken } from '@buildbase/sdk';
import { prisma, setAuditContext } from '@/lib/db';
import { env } from '@/env';
import { logger } from '@/lib/logger';
import { detect } from '@/tour/progress';

/**
 * Application Token URL (`applicationTokenUrl` in the BuildBase OAuth2 client).
 *
 * BuildBase calls this on EVERY grant — the initial code exchange and every
 * refresh — for OAuth2 clients of this app: AI agents connecting over MCP,
 * Zapier/n8n style integrations, or any third party you register.
 *
 * Flow (see docs/MCP-AND-AGENT-READINESS.md in @buildbase/sdk):
 *   1. `handleAppTokenRequest` verifies the platform's call — a short-lived
 *      HS256 JWT signed with the shared client secret (alg pinned, exp required).
 *   2. We mirror the user into our own database.
 *   3. `mintAgentToken` signs OUR access token with SYSTEM_SECRET: `aud` bound
 *      to the RFC 8707 resource the agent asked for, granted scopes carried
 *      through, and the per-grant BuildBase session embedded as an encrypted
 *      `sid` claim. The platform never sees SYSTEM_SECRET or the token.
 *
 * That same token is what `buildbaseAuth` verifies on /api/mcp, so an agent
 * that finishes this OAuth flow can immediately list and call tools as the user.
 */
export async function POST(request: NextRequest) {
  try {
    const { status, body } = await handleAppTokenRequest({
      authorization: request.headers.get('authorization'),
      clientSecret:
        env.BUILDBASE_OAUTH2_CLIENT_SECRET || env.BUILDBASE_CLIENT_SECRET,
      mintToken: async (claims) => {
        if (claims.blocked) {
          // Surfaced to the platform as a failed mint; the agent gets no token.
          throw new Error('User is blocked');
        }

        setAuditContext({
          userId: claims.id,
          ipAddress:
            request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            undefined,
          userAgent: request.headers.get('user-agent') || undefined,
          source: 'oauth2-token',
        });

        // Local mirror — never block a grant on our own DB being unavailable.
        await prisma.user
          .upsert({
            where: { email: claims.email },
            update: {
              id: claims.id,
              name: claims.name ?? '',
              image: claims.image || null,
              role: claims.role || 'user',
              emailVerified: claims.emailVerified || false,
            },
            create: {
              id: claims.id,
              email: claims.email,
              name: claims.name ?? '',
              image: claims.image || null,
              role: claims.role || 'user',
              emailVerified: claims.emailVerified || false,
            },
          })
          .catch((err: unknown) => {
            logger.error('Failed to mirror OAuth2 user — mint continues', {
              error: err instanceof Error ? err.message : String(err),
              userId: claims.id,
            });
          });

        // The tour: an agent just finished the OAuth flow as this person.
        await detect(claims.id, { kind: 'action', action: 'agent:connected' });

        return mintAgentToken({
          claims,
          secret: env.SYSTEM_SECRET,
          expiresInSec: 60 * 60, // 1h — refresh re-mints with a fresh session
          extraClaims: { userRole: claims.role || 'user' },
        });
      },
    });

    return NextResponse.json(body, { status });
  } catch (error) {
    logger.error('OAuth2 token endpoint failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    return NextResponse.json(
      { success: false, token: '', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
