'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SETTINGS_SCREENS, useSaaSAuth } from '@buildbase/sdk/react';

type Section = Parameters<
  ReturnType<typeof useSaaSAuth>['openWorkspaceSettings']
>[0];

/**
 * Opens the SDK's own settings dialog from a link: any dashboard URL with
 * `?settings=<section>` (`/dashboard?settings=users`) opens that section, then
 * drops the parameter so a reload does not open it again. This app has no
 * pages of its own for what the dialog already does (profile, security,
 * members, plan and invoices, add-ons, credits, selling, single sign-on, the
 * workspace's settings), so the tour and the agent guide link here.
 */
export function SettingsDeepLink() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, openWorkspaceSettings } = useSaaSAuth();
  const section = params.get('settings');

  useEffect(() => {
    if (!isAuthenticated || !section) return;
    if (SETTINGS_SCREENS.has(section as NonNullable<Section>)) {
      openWorkspaceSettings(section as Section);
    }
    const rest = new URLSearchParams(params.toString());
    rest.delete('settings');
    const query = rest.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }, [
    isAuthenticated,
    section,
    params,
    pathname,
    router,
    openWorkspaceSettings,
  ]);

  return null;
}
