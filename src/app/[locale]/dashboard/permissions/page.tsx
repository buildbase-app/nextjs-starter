'use client';

import {
  usePermissions,
  WhenWorkspaceRoles,
  WhenPermission,
  Permission,
} from '@buildbase/sdk/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Shield, Users } from 'lucide-react';

const ALL_PERMISSIONS = Object.entries(Permission) as [string, string][];

function PermissionRow({ label, slug }: { label: string; slug: string }) {
  return (
    <WhenPermission
      permission={slug}
      fallback={
        <div className="flex items-center justify-between py-1.5 text-sm">
          <span className="font-mono text-xs">{slug}</span>
          <span className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
            <XCircle className="h-4 w-4" />
            Denied
          </span>
        </div>
      }
    >
      <div className="flex items-center justify-between py-1.5 text-sm">
        <span className="font-mono text-xs">{slug}</span>
        <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
          <CheckCircle2 className="h-4 w-4" />
          Granted
        </span>
      </div>
    </WhenPermission>
  );
}

export default function PermissionsPage() {
  const { role, isOwner, permissions } = usePermissions();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Permissions</h1>
        <p className="text-muted-foreground">
          Live permission resolution via{' '}
          <code className="text-xs">usePermissions()</code> and{' '}
          <code className="text-xs">&lt;WhenPermission&gt;</code>
        </p>
      </div>

      {/* Current role card */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Your role</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold capitalize">{role ?? '—'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Owner</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant={isOwner ? 'default' : 'secondary'}>
              {isOwner ? 'Yes' : 'No'}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Permissions granted</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{permissions.size}</p>
          </CardContent>
        </Card>
      </div>

      {/* Role-gated sections */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Shield className="h-5 w-5" />
            <div>
              <CardTitle className="text-base">Owner / Admin only</CardTitle>
              <CardDescription>
                <code className="text-xs">
                  WhenWorkspaceRoles roles={['owner', 'admin']}
                </code>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <WhenWorkspaceRoles
              roles={['owner', 'admin']}
              fallback={
                <p className="text-muted-foreground text-sm">
                  Not visible to your role ({role}).
                </p>
              }
            >
              <p className="text-sm text-green-700 dark:text-green-400">
                You can see this because you are an owner or admin.
              </p>
            </WhenWorkspaceRoles>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Users className="h-5 w-5" />
            <div>
              <CardTitle className="text-base">All members</CardTitle>
              <CardDescription>
                <code className="text-xs">
                  WhenWorkspaceRoles roles={['owner', 'admin', 'member']}
                </code>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <WhenWorkspaceRoles
              roles={['owner', 'admin', 'member']}
              fallback={
                <p className="text-muted-foreground text-sm">
                  You are not a member of this workspace.
                </p>
              }
            >
              <p className="text-sm text-green-700 dark:text-green-400">
                You can see this because you are a workspace member.
              </p>
            </WhenWorkspaceRoles>
          </CardContent>
        </Card>
      </div>

      {/* Full permission matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Permission matrix</CardTitle>
          <CardDescription>
            All platform permissions checked against your current role via{' '}
            <code className="text-xs">WhenPermission</code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {ALL_PERMISSIONS.map(([key, slug]) => (
              <PermissionRow key={key} label={key} slug={slug} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
