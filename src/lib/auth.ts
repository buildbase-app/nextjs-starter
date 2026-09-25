import 'server-only';
import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';
import { env } from '@/env';

const SYSTEM_SECRET = env.SYSTEM_SECRET;

/**
 * The app's own access token.
 *
 * Two flavours share this format and secret:
 *  - web tokens minted by /api/auth/token and /api/auth/workspace-token
 *  - agent tokens minted by /api/auth/oauth2-token via the SDK's
 *    `mintAgentToken` (those additionally carry `aud`, `scope` and an
 *    encrypted `sid` claim that the MCP server uses)
 *
 * Both carry `userId`, so the routes below accept either.
 */
export interface AuthToken {
  userId: string;
  workspaceId: string | null;
  userRole: string;
  /** Present on agent tokens (space-separated or array, depending on minter). */
  scope?: string | string[];
  aud?: string | string[];
  iat: number;
  exp: number;
}

export interface CreateAuthTokenParams {
  userId: string;
  workspaceId?: string | null;
  userRole?: string;
}

export function createAuthToken(params: CreateAuthTokenParams): string {
  const { userId, workspaceId = null, userRole = 'member' } = params;
  return jwt.sign({ userId, workspaceId, userRole }, SYSTEM_SECRET, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });
}

export function verifyAuthToken(token: string): AuthToken | null {
  try {
    const payload = jwt.verify(token, SYSTEM_SECRET, {
      algorithms: ['HS256'],
    }) as Partial<AuthToken> & { sub?: string };
    const userId = payload.userId ?? payload.sub;
    if (!userId) return null;
    return {
      userId,
      workspaceId: payload.workspaceId ?? null,
      userRole: payload.userRole ?? 'member',
      scope: payload.scope,
      aud: payload.aud,
      iat: payload.iat ?? 0,
      exp: payload.exp ?? 0,
    };
  } catch {
    return null;
  }
}

/**
 * Get auth token from Authorization header (server-side)
 * Expects: Authorization: Bearer <token>
 */
export async function getAuthTokenFromHeader(): Promise<AuthToken | null> {
  try {
    const headersList = await headers();
    const authHeader = headersList.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) return null;
    return verifyAuthToken(authHeader.slice(7));
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const token = await getAuthTokenFromHeader();
  if (!token) return null;
  return {
    userId: token.userId,
    workspaceId: token.workspaceId,
    userRole: token.userRole,
  };
}
