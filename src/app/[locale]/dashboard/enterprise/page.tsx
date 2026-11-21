'use client';

import { useTranslations } from 'next-intl';
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
  const t = useTranslations('enterprise');
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>
      <EnterpriseAccess />
    </div>
  );
}
