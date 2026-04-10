'use client';

import { useTranslations } from 'next-intl';
import { useSaaSAuth, useSaaSWorkspaces } from '@buildbase/sdk/react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  const { user } = useSaaSAuth();
  const { currentWorkspace } = useSaaSWorkspaces();
  const t = useTranslations('dashboard');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('welcome', { name: user?.name || '' })}
        </p>
      </div>

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
              {t('cards.status.active')}
            </Badge>
          </CardContent>
        </Card>
      </div>

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
