'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  usePermissions,
  useSaaSSettings,
  useSaaSWorkspaces,
} from '@buildbase/sdk/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, KeyRound, XCircle } from 'lucide-react';

/**
 * The organization's own permissions, defined in the BuildBase console, and
 * what the signed-in member may do with each.
 *
 * Two answers sit side by side on purpose. "In the app" is the SDK's `can()`,
 * which decides what to show. "Your backend" is what this app's own API route
 * got when it asked BuildBase, which decides what actually happens. They
 * should always agree; the "Try it" button goes through the backend, so a
 * member who is not allowed is refused there too, not only hidden here.
 */

type ServerAnswer = {
  role: string | null;
  isOwner: boolean;
  permissions: string[];
};
type TryResult = 'allowed' | 'refused' | 'error';

function Answer({
  yes,
  yesText,
  noText,
}: {
  yes: boolean;
  yesText: string;
  noText: string;
}) {
  return yes ? (
    <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
      <CheckCircle2 className="h-4 w-4" />
      {yesText}
    </span>
  ) : (
    <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
      <XCircle className="h-4 w-4" />
      {noText}
    </span>
  );
}

export function AppPermissionsCard() {
  const t = useTranslations('permissions.appPermissions');
  const { can, appPermissionDefinitions } = usePermissions();
  const { currentWorkspace } = useSaaSWorkspaces();
  const { settings } = useSaaSSettings();
  const workspaceId = currentWorkspace?._id;
  // Keys the console defines. A key that only this app's code names (the
  // `defaultPermissions` prop) is unknown to BuildBase, so only the browser
  // can check it; the table says so rather than calling it denied.
  const catalogued = new Set(
    (settings?.workspace?.customPermissions ?? []).map((p) => p.key)
  );

  const [server, setServer] = useState<ServerAnswer | null>(null);
  const [tried, setTried] = useState<Record<string, TryResult>>({});

  // What this app's backend is told for the member, asked once per workspace.
  useEffect(() => {
    if (!workspaceId) return;
    let cancelled = false;
    fetch(`/api/permissions?workspaceId=${workspaceId}`)
      .then((res) => (res.ok ? (res.json() as Promise<ServerAnswer>) : null))
      .then((answer) => {
        if (!cancelled) setServer(answer);
      })
      .catch(() => {
        if (!cancelled) setServer(null);
      });
    return () => {
      cancelled = true;
    };
  }, [workspaceId]);

  const tryIt = async (permission: string) => {
    const res = await fetch('/api/permissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workspaceId, permission }),
    });
    // Keyed by workspace too, so switching workspace never shows a result
    // from the previous one.
    setTried((prev) => ({
      ...prev,
      [`${workspaceId}:${permission}`]: res.ok
        ? 'allowed'
        : res.status === 403
          ? 'refused'
          : 'error',
    }));
  };

  const groups = useMemo(() => {
    const byGroup = new Map<string, typeof appPermissionDefinitions>();
    for (const def of appPermissionDefinitions) {
      const group = def.group ?? '';
      byGroup.set(group, [...(byGroup.get(group) ?? []), def]);
    }
    return [...byGroup.entries()];
  }, [appPermissionDefinitions]);

  const held = new Set(server?.permissions ?? []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-2 pb-2">
        <KeyRound className="mt-0.5 h-5 w-5" />
        <div>
          <CardTitle className="text-base">{t('title')}</CardTitle>
          <CardDescription>{t('description')}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {appPermissionDefinitions.length === 0 ? (
          <p className="text-muted-foreground text-sm">{t('empty')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b text-left">
                  <th className="py-2 pr-4 font-medium">{t('permission')}</th>
                  <th className="px-3 py-2 font-medium">{t('inApp')}</th>
                  <th className="px-3 py-2 font-medium">{t('backend')}</th>
                  <th className="py-2 pl-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {groups.map(([group, defs]) => (
                  <PermissionGroup
                    key={group || '_'}
                    group={groups.length > 1 ? group : ''}
                    rows={defs.map((def) => ({
                      ...def,
                      inApp: can(def.key),
                      backend: server ? held.has(def.key) : null,
                      inConsole: catalogued.has(def.key),
                      tried: tried[`${workspaceId}:${def.key}`],
                    }))}
                    onTry={tryIt}
                    t={t}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PermissionGroup({
  group,
  rows,
  onTry,
  t,
}: {
  group: string;
  rows: {
    key: string;
    label: string;
    inApp: boolean;
    backend: boolean | null;
    inConsole: boolean;
    tried?: TryResult;
  }[];
  onTry: (key: string) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <>
      {group && (
        <tr>
          <td
            colSpan={4}
            className="text-muted-foreground pt-4 pb-1 text-xs font-semibold tracking-wide uppercase"
          >
            {group}
          </td>
        </tr>
      )}
      {rows.map((row) => (
        <tr
          key={row.key}
          className="border-b last:border-0"
          data-permission={row.key}
        >
          <td className="py-2 pr-4">
            <div>{row.label}</div>
            <code className="text-muted-foreground text-xs">{row.key}</code>
          </td>
          <td className="px-3 py-2">
            <Answer
              yes={row.inApp}
              yesText={t('allowed')}
              noText={t('denied')}
            />
          </td>
          <td className="px-3 py-2">
            {!row.inConsole ? (
              <span className="text-muted-foreground text-xs">
                {t('codeOnly')}
              </span>
            ) : row.backend === null ? (
              <span className="text-muted-foreground">…</span>
            ) : (
              <Answer
                yes={row.backend}
                yesText={t('allowed')}
                noText={t('denied')}
              />
            )}
          </td>
          <td className="py-2 pl-3 text-right whitespace-nowrap">
            {!row.inConsole ? null : row.tried ? (
              <span
                className={
                  row.tried === 'allowed'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }
              >
                {t(`tried.${row.tried}`)}
              </span>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onTry(row.key)}
              >
                {t('tryIt')}
              </Button>
            )}
          </td>
        </tr>
      ))}
    </>
  );
}
