/**
 * The permission keys this app guards documents with. They are the
 * organization's own keys: defined once in the BuildBase console (Workspace
 * settings → Permissions, or `npm run seed:org`), granted per role there -
 * custom roles included - and checked here with `can()` in the browser and
 * `workspace.can()` on the server. Client-safe.
 */
export const DOCUMENT_PERMISSIONS = {
  create: 'app:documents:create',
  edit: 'app:documents:edit',
  delete: 'app:documents:delete',
} as const;

export type DocumentPermission =
  (typeof DOCUMENT_PERMISSIONS)[keyof typeof DOCUMENT_PERMISSIONS];

/**
 * Roles that hold every document key while the organization has not defined
 * them. Mirrors `WRITE_ROLES` in `src/lib/server-auth.ts`, which applies the
 * same fallback on the server.
 */
export const DOCUMENT_WRITE_ROLES = ['owner', 'admin', 'member', 'editor'];

/** `defaultPermissions` for SaaSOSProvider: the fallback above, per role. */
export const DEFAULT_DOCUMENT_PERMISSIONS: Record<string, string[]> =
  Object.fromEntries(
    DOCUMENT_WRITE_ROLES.map((role) => [
      role,
      Object.values(DOCUMENT_PERMISSIONS),
    ])
  );

/** The plan feature that unlocks document exports, sold in the console's plans. */
export const EXPORT_FEATURE = 'advanced-exports';
