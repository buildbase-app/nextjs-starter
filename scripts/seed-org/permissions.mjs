import { DEFAULT_ROLE_PERMISSIONS } from '@buildbase/sdk';

/**
 * The app's own permission keys and a custom role, so the Documents and
 * Permissions pages show what the organization granted rather than what the
 * app shipped. The same keys live in `src/lib/documents/roles.ts`.
 *
 * A role's entry in `permissions` is its whole list, platform keys included,
 * so each one is written as what it already holds (or the platform default)
 * plus the app keys below. Never removes a key or a role.
 */
const KEYS = [
  {
    key: 'app:documents:create',
    label: 'Create documents',
    group: 'Documents',
  },
  { key: 'app:documents:edit', label: 'Edit documents', group: 'Documents' },
  {
    key: 'app:documents:delete',
    label: 'Delete documents',
    group: 'Documents',
  },
];

/** `reviewer` is the custom role: it may change a status, nothing else. */
const CUSTOM_ROLE = 'reviewer';
const GRANTS = {
  admin: ['app:documents:create', 'app:documents:edit', 'app:documents:delete'],
  editor: ['app:documents:create', 'app:documents:edit'],
  [CUSTOM_ROLE]: ['app:documents:edit'],
  viewer: [],
};
const BASE_ROLE = { [CUSTOM_ROLE]: 'viewer' };

export async function seed(api) {
  const current = (await api.get('workspaces/settings')) ?? {};
  // Roles only exist when workspaces are shared; the platform refuses them in
  // Personal mode. Switching modes changes every workspace in the org, so the
  // seed leaves that decision to a person.
  if (current.mode === 'personal') {
    console.log(
      'permissions: skipped - the org is in Personal workspace mode. Switch it ' +
        'to shared workspaces in the console (Settings → Workspaces) and re-run.'
    );
    return;
  }
  const roles = [...new Set([...(current.roles ?? []), CUSTOM_ROLE])];

  const known = new Map(
    (current.customPermissions ?? []).map((p) => [p.key, p])
  );
  for (const k of KEYS) if (!known.has(k.key)) known.set(k.key, k);

  const permissions = { ...(current.permissions ?? {}) };
  for (const role of roles) {
    const base =
      permissions[role] ??
      DEFAULT_ROLE_PERMISSIONS[role] ??
      DEFAULT_ROLE_PERMISSIONS[BASE_ROLE[role]] ??
      [];
    permissions[role] = [...new Set([...base, ...(GRANTS[role] ?? [])])];
  }

  await api.patch('workspaces/settings', {
    roles,
    permissions,
    customPermissions: [...known.values()],
  });
  console.log(
    'permissions',
    [...known.keys()].join(', '),
    '| roles',
    roles.join(', ')
  );
}
