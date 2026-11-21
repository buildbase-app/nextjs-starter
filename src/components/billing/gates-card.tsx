'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import {
  useSaaSAuth,
  useSaaSWorkspaces,
  WhenLimitReached,
  WhenNotEntitled,
  WhenQuotaAvailable,
  WhenRoles,
  WhenUserEntitled,
  WhenWithinLimit,
} from '@buildbase/sdk/react';
import { CheckCircle2, Lock } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * One row per gate: its code, then what it renders for this person and
 * workspace right now. The slugs are this demo's (see PlanEntitlementsCard):
 * `max-users` limit, `videos` quota, `analytics` feature, and the Personal
 * Pro plan's `priority-support`.
 */
function GateRow({ code, children }: { code: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b py-3 last:border-0">
      <code className="text-muted-foreground text-xs">{code}</code>
      <div className="text-sm">{children}</div>
    </div>
  );
}

function Shown({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 text-green-700 dark:text-green-400">
      <CheckCircle2 aria-hidden className="h-4 w-4" />
      {children}
    </span>
  );
}

function Hidden({ children }: { children: ReactNode }) {
  return (
    <span className="text-muted-foreground flex items-center gap-1.5">
      <Lock aria-hidden className="h-4 w-4" />
      {children}
    </span>
  );
}

/**
 * Gates by role, limit, quota and plan: each shows its children or its
 * fallback from the platform's answer, and none locks anyone out while the
 * answer is loading.
 */
export function GatesCard() {
  const t = useTranslations('gates');
  const { currentWorkspace } = useSaaSWorkspaces();
  const { openPlanPicker, openWorkspaceSettings } = useSaaSAuth();
  const members = currentWorkspace?.users?.length ?? 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <GateRow code={`<WhenRoles roles={['admin']}>`}>
          <WhenRoles
            roles={['admin']}
            fallback={<Hidden>{t('roles.hidden')}</Hidden>}
          >
            <Shown>{t('roles.shown')}</Shown>
          </WhenRoles>
        </GateRow>

        <GateRow
          code={`<WhenWithinLimit slug="max-users" current={${members}}>`}
        >
          <WhenWithinLimit
            slug="max-users"
            current={members}
            fallbackComponent={<Hidden>{t('limit.full')}</Hidden>}
          >
            <Button
              size="sm"
              variant="outline"
              onClick={() => openWorkspaceSettings('users')}
            >
              {t('limit.invite')}
            </Button>
          </WhenWithinLimit>
        </GateRow>

        <GateRow
          code={`<WhenLimitReached slug="max-users" current={${members}}>`}
        >
          <WhenLimitReached
            slug="max-users"
            current={members}
            fallbackComponent={<Shown>{t('limit.room')}</Shown>}
          >
            <Button size="sm" variant="outline" onClick={openPlanPicker}>
              {t('limit.upgrade')}
            </Button>
          </WhenLimitReached>
        </GateRow>

        <GateRow code={`<WhenQuotaAvailable slug="videos">`}>
          <WhenQuotaAvailable
            slug="videos"
            fallbackComponent={<Hidden>{t('quota.used')}</Hidden>}
          >
            <Shown>{t('quota.available')}</Shown>
          </WhenQuotaAvailable>
        </GateRow>

        <GateRow code={`<WhenNotEntitled slug="analytics">`}>
          <WhenNotEntitled
            slug="analytics"
            fallbackComponent={<Shown>{t('upsell.included')}</Shown>}
          >
            <Button size="sm" variant="outline" onClick={openPlanPicker}>
              <Lock aria-hidden className="mr-2 h-4 w-4" />
              {t('upsell.cta')}
            </Button>
          </WhenNotEntitled>
        </GateRow>

        <GateRow code={`<WhenUserEntitled slug="priority-support">`}>
          <WhenUserEntitled
            slug="priority-support"
            fallbackComponent={
              <Button
                size="sm"
                variant="outline"
                onClick={() => openWorkspaceSettings('billing')}
              >
                {t('personal.cta')}
              </Button>
            }
          >
            <Shown>{t('personal.included')}</Shown>
          </WhenUserEntitled>
        </GateRow>
      </CardContent>
    </Card>
  );
}
