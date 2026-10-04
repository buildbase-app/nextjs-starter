'use client';

import { useTranslations } from 'next-intl';
import {
  usePermissions,
  WhenWorkspaceRoles,
  WhenPermission,
  useSaaSSettings,
} from '@buildbase/sdk/react';
import { Permission } from '@buildbase/sdk';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, KeyRound, XCircle, Shield, Users } from 'lucide-react';

function PermissionRow({
  slug,
  denied,
  granted,
}: {
  slug: string;
  denied: string;
  granted: string;
}) {
  return (
    <WhenPermission
      permission={slug}
      fallback={
        <div className="flex items-center justify-between py-1.5 text-sm">
          <span className="font-mono text-xs">{slug}</span>
          <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
            <XCircle className="h-4 w-4" />
            {denied}
          </span>
        </div>
      }
    >
      <div className="flex items-center justify-between py-1.5 text-sm">
        <span className="font-mono text-xs">{slug}</span>
        <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
          <CheckCircle2 className="h-4 w-4" />
          {granted}
        </span>
      </div>
    </WhenPermission>
  );
}

export default function PermissionsPage() {
  const t = useTranslations('permissions');
  const { role, isOwner, permissions, can, appPermissionDefinitions } =
    usePermissions();
  const ta = useTranslations('account.permissions');
  const { settings } = useSaaSSettings();
  const memberRoles = [
    'owner',
    ...(settings?.workspace?.roles ?? ['admin', 'member']),
  ];

  const denied = t('matrix.denied');
  const grantedStatus = t('matrix.grantedStatus');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('cards.role')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold capitalize">{role ?? '—'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('cards.owner')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant={isOwner ? 'default' : 'secondary'}>
              {isOwner ? t('cards.ownerYes') : t('cards.ownerNo')}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('cards.granted')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{permissions.size}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Shield className="h-5 w-5" />
            <div>
              <CardTitle className="text-base">
                {t('ownerAdmin.title')}
              </CardTitle>
              <CardDescription>
                <code className="text-xs">
                  {"WhenWorkspaceRoles roles={['owner', 'admin']}"}
                </code>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <WhenWorkspaceRoles
              roles={['owner', 'admin']}
              fallback={
                <p className="text-muted-foreground text-sm">
                  {t('ownerAdmin.notVisible', { role: role ?? '' })}
                </p>
              }
            >
              <p className="text-sm text-green-700 dark:text-green-400">
                {t('ownerAdmin.visible')}
              </p>
            </WhenWorkspaceRoles>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Users className="h-5 w-5" />
            <div>
              <CardTitle className="text-base">
                {t('allMembers.title')}
              </CardTitle>
              <CardDescription>
                <code className="text-xs">
                  {`WhenWorkspaceRoles roles={[${memberRoles.map((r) => `'${r}'`).join(', ')}]}`}
                </code>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {/* Every role the organization defines - custom roles included -
                not a list this app hard-codes. */}
            <WhenWorkspaceRoles
              roles={memberRoles}
              fallback={
                <p className="text-muted-foreground text-sm">
                  {t('allMembers.notMember')}
                </p>
              }
            >
              <p className="text-sm text-green-700 dark:text-green-400">
                {t('allMembers.visible')}
              </p>
            </WhenWorkspaceRoles>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <KeyRound className="h-5 w-5" />
          <div>
            <CardTitle className="text-base">{ta('title')}</CardTitle>
            <CardDescription>{ta('description')}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {appPermissionDefinitions.length === 0 ? (
            <p className="text-muted-foreground text-sm">{ta('empty')}</p>
          ) : (
            <div className="divide-y">
              {appPermissionDefinitions.map((def) => (
                <div
                  key={def.key}
                  className="flex items-center justify-between gap-4 py-1.5 text-sm"
                >
                  <div className="min-w-0">
                    <span>{def.label}</span>{' '}
                    <span className="text-muted-foreground font-mono text-xs">
                      {def.key}
                    </span>
                    {def.group && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        {def.group}
                      </Badge>
                    )}
                  </div>
                  {can(def.key) ? (
                    <span className="flex shrink-0 items-center gap-1.5 text-green-600 dark:text-green-400">
                      <CheckCircle2 className="h-4 w-4" />
                      {grantedStatus}
                    </span>
                  ) : (
                    <span className="flex shrink-0 items-center gap-1.5 text-red-600 dark:text-red-400">
                      <XCircle className="h-4 w-4" />
                      {denied}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('matrix.title')}</CardTitle>
          <CardDescription>{t('matrix.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {(Object.entries(Permission) as [string, string][]).map(
              ([, slug]) => (
                <PermissionRow
                  key={slug}
                  slug={slug}
                  denied={denied}
                  granted={grantedStatus}
                />
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
