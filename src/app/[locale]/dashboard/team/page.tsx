'use client';

import {
  useSaaSAuth,
  useSaaSWorkspaces,
  useSeatStatus,
} from '@buildbase/sdk/react';
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
  const { openWorkspaceSettings } = useSaaSAuth();
  const { currentWorkspace } = useSaaSWorkspaces();
  const seatStatus = useSeatStatus(currentWorkspace ?? null);

  const members = currentWorkspace?.users ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground">
            Workspace members from{' '}
            <code className="text-xs">currentWorkspace.users</code>
          </p>
        </div>
        <Button
          onClick={() => openWorkspaceSettings('users')}
          disabled={!seatStatus.canInvite}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Invite member
        </Button>
      </div>

      {/* Seat status summary */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Members</CardDescription>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{seatStatus.memberCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Included seats</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {seatStatus.includedSeats || '—'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Max users</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {seatStatus.maxUsers === 0 ? '∞' : seatStatus.maxUsers}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Available seats</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {seatStatus.availableSeats === null
                ? '∞'
                : seatStatus.availableSeats}
            </p>
          </CardContent>
        </Card>
      </div>

      {!seatStatus.canInvite && (
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
          <CardContent className="pt-4 text-sm text-amber-700 dark:text-amber-300">
            Seat limit reached — upgrade your plan to invite more members.
          </CardContent>
        </Card>
      )}

      {/* Member list */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Members</CardTitle>
          <CardDescription>
            {members.length} member{members.length !== 1 ? 's' : ''} in this
            workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          {members.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No members loaded. Make sure you are authenticated.
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
                    <Badge
                      variant={
                        member.role === 'owner' ? 'default' : 'secondary'
                      }
                      className="capitalize"
                    >
                      {member.role ?? 'member'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Manage members</CardTitle>
          <CardDescription>
            Open the workspace settings panel to manage roles and invitations
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() => openWorkspaceSettings('users')}
          >
            <Users className="mr-2 h-4 w-4" />
            Open member settings
          </Button>
          <Button
            variant="outline"
            onClick={() => openWorkspaceSettings('permissions')}
          >
            <ShieldCheck className="mr-2 h-4 w-4" />
            Permissions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
