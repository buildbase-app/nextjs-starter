import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

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

export async function getAuthToken(): Promise<AuthToken | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return null;
    }

    return jwt.verify(token, SYSTEM_SECRET) as AuthToken;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const token = await getAuthToken();
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
