'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  useSaaSAuth,
  useSaaSWorkspaces,
  useSeatStatus,
  useSaaSSettings,
  useWorkspaceInvitations,
  WhenPermission,
} from '@buildbase/sdk/react';
import { Permission } from '@buildbase/sdk';
import { toast } from 'sonner';
import { InvitationsCard } from '@/components/team/invitations-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserPlus, Users, ShieldCheck, Crown } from 'lucide-react';

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function TeamPage() {
  const t = useTranslations('team');
  const { openWorkspaceSettings, user: me } = useSaaSAuth();
  const { currentWorkspace, updateUser } = useSaaSWorkspaces();
  const invitationList = useWorkspaceInvitations(currentWorkspace?._id);
  // A pending invitation holds a seat, so the ceiling counts it too.
  const { settings } = useSaaSSettings();
  // The org's member ceiling, as the SDK's own members screen passes it; left
  // out, this page showed no limit where that screen showed 1/50.
  const seatStatus = useSeatStatus(currentWorkspace ?? null, {
    pendingInvitations: invitationList.pendingCount,
    settingsMaxUsers: settings?.workspace?.maxWorkspaceUsers,
  });
  const [changing, setChanging] = useState<string | null>(null);

  const members = currentWorkspace?.users ?? [];
  const roles = settings?.workspace?.roles?.length
    ? settings.workspace.roles
    : (currentWorkspace?.roles ?? []);

  const changeRole = async (userId: string, role: string) => {
    if (!currentWorkspace) return;
    setChanging(userId);
    try {
      await updateUser(currentWorkspace._id, userId, { role });
      toast.success(t('roleChanged', { role }));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('invite.failed'));
    } finally {
      setChanging(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => openWorkspaceSettings('users')}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          {t('inviteMember')}
        </Button>
      </div>

      <InvitationsCard canInvite={seatStatus.canInvite} list={invitationList} />

      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>{t('cards.members')}</CardDescription>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{seatStatus.memberCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('cards.includedSeats')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {seatStatus.includedSeats || '—'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('cards.maxUsers')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {seatStatus.maxUsers === 0 ? '∞' : seatStatus.maxUsers}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('cards.availableSeats')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {Number.isFinite(seatStatus.availableSeats)
                ? seatStatus.availableSeats
                : '∞'}
            </p>
          </CardContent>
        </Card>
      </div>

      {!seatStatus.canInvite && (
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
          <CardContent className="pt-4 text-sm text-amber-700 dark:text-amber-300">
            {t('seatLimitReached')}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('memberList.title')}</CardTitle>
          <CardDescription>
            {t('memberList.count', { count: members.length })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {members.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {t('memberList.empty')}
            </p>
          ) : (
            <div className="divide-y">
              {members.map((member) => (
                <div
                  key={member._id}
                  className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-xs">
                      {initials(member.name || member.email || '?')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {member.name || member.email}
                    </p>
                    {member.name && (
                      <p className="text-muted-foreground truncate text-xs">
                        {member.email}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {member.role === 'owner' && (
                      <Crown className="h-3.5 w-3.5 text-amber-500" />
                    )}
                    {member.role === 'admin' && (
                      <ShieldCheck className="text-primary h-3.5 w-3.5" />
                    )}
                    <WhenPermission
                      permission={Permission.WORKSPACE_MEMBERS_ROLE_CHANGE}
                      fallback={
                        <Badge
                          variant={
                            member.role === 'owner' ? 'default' : 'secondary'
                          }
                          className="capitalize"
                        >
                          {member.role ?? t('memberList.roleFallback')}
                        </Badge>
                      }
                    >
                      {member.role === 'owner' ||
                      member._id === me?.id ||
                      roles.length === 0 ? (
                        <Badge
                          variant={
                            member.role === 'owner' ? 'default' : 'secondary'
                          }
                          className="capitalize"
                        >
                          {member.role ?? t('memberList.roleFallback')}
                        </Badge>
                      ) : (
                        <select
                          value={member.role}
                          disabled={changing === member._id}
                          onChange={(e) =>
                            changeRole(member._id, e.target.value)
                          }
                          aria-label={t('memberList.changeRole')}
                          className="border-input bg-background h-8 rounded-md border px-2 text-xs capitalize"
                        >
                          {roles.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      )}
                    </WhenPermission>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('manage.title')}</CardTitle>
          <CardDescription>{t('manage.description')}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() => openWorkspaceSettings('users')}
          >
            <Users className="mr-2 h-4 w-4" />
            {t('manage.openSettings')}
          </Button>
          <Button
            variant="outline"
            onClick={() => openWorkspaceSettings('permissions')}
          >
            <ShieldCheck className="mr-2 h-4 w-4" />
            {t('manage.permissions')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
