'use client';

import { useTranslations } from 'next-intl';
import {
  useSaaSAuth,
  useSaaSWorkspaces,
  useSubscription,
  useTrialStatus,
  useSeatStatus,
  WhenTrialing,
  WhenTrialEnding,
  WhenNotTrialing,
  WhenSubscription,
  WhenNoSubscription,
  WhenSubscriptionToPlans,
} from '@buildbase/sdk/react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  Calendar,
  CreditCard,
  Zap,
  Users,
  CheckCircle2,
} from 'lucide-react';

export default function DashboardPage() {
  const { user, openPlanPicker } = useSaaSAuth();
  const { currentWorkspace } = useSaaSWorkspaces();
  const t = useTranslations('dashboard');
  const { subscription, loading: subLoading } = useSubscription(
    currentWorkspace?._id ?? ''
  );
  const { isTrialing, daysRemaining, trialEndsAt } = useTrialStatus();
  const seatStatus = useSeatStatus(currentWorkspace ?? null);

  const plan = subscription?.plan;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('welcome', { name: user?.name || '' })}
        </p>
      </div>

      {/* Trial ending soon banner — shown when ≤5 days left */}
      <WhenTrialEnding daysThreshold={5}>
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
          <CardContent className="flex items-start gap-3 pt-6">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
                Trial ending soon
              </p>
              <p className="mt-0.5 text-sm text-amber-700 dark:text-amber-300">
                Your trial ends in {daysRemaining} day
                {daysRemaining !== 1 ? 's' : ''}. Upgrade now to keep access.
              </p>
            </div>
            <Button size="sm" onClick={openPlanPicker}>
              Upgrade
            </Button>
          </CardContent>
        </Card>
      </WhenTrialEnding>

      {/* Active trial banner — only shown when NOT ending soon */}
      <WhenTrialing>
        <WhenTrialEnding
          daysThreshold={5}
          fallbackComponent={
            <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
              <CardContent className="flex items-center gap-3 pt-6">
                <Calendar className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                    You&apos;re on a free trial
                  </p>
                  <p className="mt-0.5 text-sm text-blue-700 dark:text-blue-300">
                    {daysRemaining !== null && daysRemaining > 5
                      ? `${daysRemaining} days remaining`
                      : trialEndsAt
                        ? `Trial ends ${new Date(trialEndsAt).toLocaleDateString()}`
                        : 'Trial active'}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={openPlanPicker}>
                  View plans
                </Button>
              </CardContent>
            </Card>
          }
        >
          {null}
        </WhenTrialEnding>
      </WhenTrialing>

      {/* Not trialing + no subscription → upsell */}
      <WhenNotTrialing>
        <WhenNoSubscription fallbackComponent={null}>
          <Card className="border-dashed">
            <CardContent className="flex items-center justify-between pt-6">
              <div>
                <p className="text-sm font-medium">No active subscription</p>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  WhenNoSubscription — subscribe to unlock paid features
                </p>
              </div>
              <Button size="sm" onClick={openPlanPicker}>
                Choose a plan
              </Button>
            </CardContent>
          </Card>
        </WhenNoSubscription>
      </WhenNotTrialing>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('cards.workspace.title')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {currentWorkspace?.name || t('cards.workspace.empty')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('cards.role.title')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold capitalize">
              {user?.role || t('cards.role.empty')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('cards.email.title')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="truncate text-lg font-medium">{user?.email}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('cards.status.title')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="text-sm">
              {isTrialing ? 'Trial' : t('cards.status.active')}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Subscription card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base">Subscription</CardTitle>
            <CardDescription>
              Current plan from the BuildBase SDK
            </CardDescription>
          </div>
          <CreditCard className="text-muted-foreground h-5 w-5" />
        </CardHeader>
        <CardContent>
          {subLoading ? (
            <p className="text-muted-foreground text-sm">Loading...</p>
          ) : plan ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold">{plan.name}</p>
                <p className="text-muted-foreground mt-0.5 text-sm">
                  {subscription?.subscription?.subscriptionStatus
                    ? `Status: ${subscription.subscription?.subscriptionStatus}`
                    : 'Active subscription'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {subscription?.subscription?.subscriptionStatus ?? 'active'}
                </Badge>
                <Button variant="outline" size="sm" onClick={openPlanPicker}>
                  <Zap className="mr-1.5 h-3.5 w-3.5" />
                  Change plan
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm">No active plan</p>
              <Button size="sm" onClick={openPlanPicker}>
                Choose a plan
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Subscription gates demo */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">WhenSubscription gate</CardTitle>
            <CardDescription>
              Only visible when workspace has an active subscription
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WhenSubscription
              fallbackComponent={
                <p className="text-muted-foreground text-sm">
                  No subscription active — upgrade to see this content.
                </p>
              }
            >
              <p className="flex items-center gap-1.5 text-sm text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                You have an active subscription — this card is visible.
              </p>
            </WhenSubscription>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              WhenSubscriptionToPlans gate
            </CardTitle>
            <CardDescription>
              Only visible when subscribed to a specific plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WhenSubscriptionToPlans
              plans={['pro', 'enterprise', 'growth']}
              fallbackComponent={
                <p className="text-muted-foreground text-sm">
                  Not on a Pro / Enterprise / Growth plan.
                </p>
              }
            >
              <p className="flex items-center gap-1.5 text-sm text-green-700 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                You&apos;re on Pro, Enterprise, or Growth — premium content
                unlocked.
              </p>
            </WhenSubscriptionToPlans>
          </CardContent>
        </Card>
      </div>

      {/* Seat status card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base">Seat status</CardTitle>
            <CardDescription>
              <code className="text-xs">useSeatStatus()</code> — member count vs
              plan limits
            </CardDescription>
          </div>
          <Users className="text-muted-foreground h-5 w-5" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-muted-foreground text-xs">Members</p>
              <p className="text-2xl font-bold">{seatStatus.memberCount}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Included seats</p>
              <p className="text-2xl font-bold">
                {seatStatus.includedSeats || '—'}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Max users</p>
              <p className="text-2xl font-bold">
                {seatStatus.maxUsers === 0 ? '∞' : seatStatus.maxUsers}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Can invite</p>
              <Badge variant={seatStatus.canInvite ? 'default' : 'destructive'}>
                {seatStatus.canInvite ? 'Yes' : 'No'}
              </Badge>
            </div>
          </div>
          {!seatStatus.canInvite && (
            <p className="mt-3 text-sm text-amber-700 dark:text-amber-400">
              Seat limit reached — upgrade your plan to invite more members.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('quickActions.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button>{t('quickActions.createProject')}</Button>
            <Button variant="outline">{t('quickActions.viewReports')}</Button>
            <Button variant="outline">{t('quickActions.inviteTeam')}</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
