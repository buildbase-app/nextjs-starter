import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';

const SYSTEM_SECRET = process.env.SYSTEM_SECRET as string;

if (!SYSTEM_SECRET) {
  throw new Error('SYSTEM_SECRET environment variable is required');
}

export interface AuthToken {
  userId: string;
  workspaceId: string | null;
  userRole: string;
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
  return jwt.sign(
    { userId, workspaceId, userRole },
    SYSTEM_SECRET,
    { expiresIn: '7d' }
  );
}

/**
 * Get auth token from Authorization header (server-side)
 * Expects: Authorization: Bearer <token>
 */
export async function getAuthTokenFromHeader(): Promise<AuthToken | null> {
  try {
    const headersList = await headers();
    const authHeader = headersList.get('authorization');

    if (!authHeader?.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.slice(7);
    return jwt.verify(token, SYSTEM_SECRET) as AuthToken;
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

export function verifyAuthToken(token: string): AuthToken | null {
  try {
    return jwt.verify(token, SYSTEM_SECRET) as AuthToken;
  } catch {
    return null;
  }
}

/**
 * Client-side helper to get token from localStorage
 * Use this in client components
 */
export function getClientAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}
