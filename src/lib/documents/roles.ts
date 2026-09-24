/**
 * Roles that may create, edit and delete documents. Client-safe, so the UI
 * can hide what the server will refuse; the server still refuses it (see
 * `WRITE_ROLES` in `src/lib/server-auth.ts`, which this mirrors).
 */
export const DOCUMENT_WRITE_ROLES = ['owner', 'admin', 'member', 'editor'];

export function canWriteDocuments(role: string | null | undefined): boolean {
  return !!role && DOCUMENT_WRITE_ROLES.includes(role);
}
