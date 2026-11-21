'use client';

import { EnterpriseAccess } from '@buildbase/sdk/react';

/**
 * Enterprise: single sign-on (SAML, OIDC) and directory sync for a
 * customer's company, through the app owner's own WorkOS account, plus the
 * company's own admins, roles, groups, domains, access policy, activity and
 * keys. `<EnterpriseAccess />` is the SDK's whole screen for it, with its own
 * title and copy in every locale; it says itself when the organization's
 * plan or console has no enterprise set up. The same screen is in the
 * workspace settings dialog (`openWorkspaceSettings('enterprise')`).
 */
export default function EnterprisePage() {
  return <EnterpriseAccess />;
}
