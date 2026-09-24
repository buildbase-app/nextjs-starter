'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  useSaaSWorkspaces,
  useSaaSSettings,
  type useWorkspaceInvitations,
  WhenPermission,
} from '@buildbase/sdk/react';
import { Permission } from '@buildbase/sdk';
import {
  isInvitationError,
  resendCooldownSeconds,
  inviterNameOf,
} from '@buildbase/sdk';
import { toast } from 'sonner';
import { Loader2, Mail, RotateCw, UserPlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Props {
  /** From `useSeatStatus`, already counting the pending invitations. */
  canInvite: boolean;
  /** The page's `useWorkspaceInvitations`, shared so the seat line and this list agree. */
  list: ReturnType<typeof useWorkspaceInvitations>;
}

const selectClass =
  'border-input bg-background h-9 rounded-md border px-3 text-sm shadow-xs';

/**
 * Invite by email, and the invitations still waiting. The address needs no
 * account: the person signs up or in from the link and accepts. A pending
 * row holds a seat until it is answered, so the seat line and the plan agree.
 */
export function InvitationsCard({ canInvite, list }: Props) {
  const t = useTranslations('team');
  const { currentWorkspace, inviteMember } = useSaaSWorkspaces();
  const workspaceId = currentWorkspace?._id ?? null;
  const { invitations, pendingCount, loading, busy, resend, revoke, refresh } =
    list;

  // The roles a workspace offers and its default are organization settings,
  // set in the console; the workspace echoes them once loaded.
  const { settings } = useSaaSSettings();
  const roles = settings?.workspace?.roles?.length
    ? settings.workspace.roles
    : (currentWorkspace?.roles ?? []);
  const defaultRole = settings?.workspace?.defaultRole;
  const [email, setEmail] = useState('');
  const [chosenRole, setChosenRole] = useState<string | null>(null);
  const role =
    chosenRole && roles.includes(chosenRole)
      ? chosenRole
      : defaultRole && roles.includes(defaultRole)
        ? defaultRole
        : (roles[roles.length - 1] ?? '');
  const [sending, setSending] = useState(false);

  const pending = invitations.filter((i) => i.status === 'invited');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceId || !email.trim()) return;
    setSending(true);
    try {
      // The emailed link lands on the auth client's first allowed redirect
      // URL. Pass `landingUrl` only if it is one of those, or the server
      // refuses the invitation.
      await inviteMember(workspaceId, email.trim(), role);
      setEmail('');
      toast.success(t('invite.sent', { email: email.trim() }));
      await refresh();
    } catch (err) {
      toast.error(
        isInvitationError(err) || err instanceof Error
          ? err.message
          : t('invite.failed')
      );
    } finally {
      setSending(false);
    }
  };

  const onResend = async (id: string) => {
    try {
      await resend(id);
      toast.success(t('invite.resent'));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('invite.failed'));
    }
  };

  const onRevoke = async (id: string) => {
    try {
      await revoke(id);
      toast.success(t('invite.revoked'));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t('invite.failed'));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <UserPlus className="h-4 w-4" />
          {t('invite.title')}
        </CardTitle>
        <CardDescription>{t('invite.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <WhenPermission
          permission={Permission.WORKSPACE_MEMBERS_INVITE}
          fallback={
            <p className="text-muted-foreground text-sm">
              {t('invite.noPermission')}
            </p>
          }
        >
          {canInvite ? (
            <form
              onSubmit={submit}
              className="flex flex-col gap-2 sm:flex-row sm:items-center"
            >
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('invite.emailPlaceholder')}
                aria-label={t('invite.emailPlaceholder')}
                className="sm:flex-1"
              />
              <select
                value={role}
                onChange={(e) => setChosenRole(e.target.value)}
                aria-label={t('invite.role')}
                className={selectClass}
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <Button
                type="submit"
                disabled={sending || !email.trim() || !role}
              >
                {sending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="mr-2 h-4 w-4" />
                )}
                {t('invite.send')}
              </Button>
            </form>
          ) : (
            <p className="text-sm text-amber-700 dark:text-amber-300">
              {t('seatLimitReached')}
            </p>
          )}
        </WhenPermission>

        <p className="text-muted-foreground text-xs">
          {t('invite.seatNote', { count: pendingCount })}
        </p>

        <div>
          <h3 className="mb-2 text-sm font-medium">
            {t('invite.pendingTitle')}{' '}
            <span className="text-muted-foreground tabular-nums">
              ({pending.length})
            </span>
          </h3>
          {loading ? (
            <p className="text-muted-foreground text-sm">
              {t('invite.loading')}
            </p>
          ) : pending.length === 0 ? (
            <p className="text-muted-foreground text-sm">{t('invite.none')}</p>
          ) : (
            <ul className="divide-y rounded-md border">
              {pending.map((inv) => {
                const cooldown = resendCooldownSeconds(inv);
                const inviter = inviterNameOf(inv);
                return (
                  <li
                    key={inv._id}
                    className="flex flex-wrap items-center gap-3 px-3 py-2"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {inv.email}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {inviter
                          ? t('invite.invitedBy', { name: inviter })
                          : t('invite.pendingLabel')}
                        {inv.validTill &&
                          ` · ${t('invite.expires', {
                            date: new Date(inv.validTill).toLocaleDateString(),
                          })}`}
                      </p>
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {inv.role}
                    </Badge>
                    <WhenPermission
                      permission={Permission.WORKSPACE_MEMBERS_INVITE}
                    >
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={busy === inv._id || cooldown > 0}
                        onClick={() => onResend(inv._id)}
                        title={
                          cooldown > 0
                            ? t('invite.cooldown', { seconds: cooldown })
                            : undefined
                        }
                      >
                        <RotateCw className="mr-1 h-3.5 w-3.5" />
                        {t('invite.resend')}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={busy === inv._id}
                        onClick={() => onRevoke(inv._id)}
                      >
                        <X className="mr-1 h-3.5 w-3.5" />
                        {t('invite.revoke')}
                      </Button>
                    </WhenPermission>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
