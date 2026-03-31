/**
 * Client-side auth helper
 * Use this in client components to access the auth token
 */
export function getClientAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}
