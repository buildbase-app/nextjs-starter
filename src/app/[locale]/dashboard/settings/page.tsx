'use client';

import { useTranslations } from 'next-intl';
import { useSaaSAuth } from '@buildbase/sdk/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  User,
  Building2,
  Users,
  CreditCard,
  BarChart3,
  Coins,
  Flag,
  Bell,
  ShieldCheck,
  Trash2,
  ChevronRight,
} from 'lucide-react';

type Section = Parameters<
  ReturnType<typeof useSaaSAuth>['openWorkspaceSettings']
>[0];

const SECTION_ICONS: Record<string, React.ElementType> = {
  profile: User,
  general: Building2,
  users: Users,
  subscription: CreditCard,
  usage: BarChart3,
  credits: Coins,
  features: Flag,
  notifications: Bell,
  permissions: ShieldCheck,
  danger: Trash2,
};

const SAFE_SECTIONS: Section[] = [
  'profile',
  'general',
  'users',
  'subscription',
  'usage',
  'credits',
  'features',
  'notifications',
  'permissions',
];

const DANGER_SECTIONS: Section[] = ['danger'];

export default function SettingsPage() {
  const t = useTranslations('settings');
  const { openWorkspaceSettings } = useSaaSAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('card.title')}</CardTitle>
          <CardDescription>{t('card.description')}</CardDescription>
        </CardHeader>
        <CardContent className="divide-y p-0">
          {SAFE_SECTIONS.map((section) => {
            const Icon = (section ? SECTION_ICONS[section] : null) ?? Building2;
            return (
              <button
                key={section}
                onClick={() => openWorkspaceSettings(section)}
                className="hover:bg-muted/50 flex w-full items-center gap-3 px-6 py-4 transition-colors"
              >
                <div className="bg-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-md">
                  <Icon className="text-foreground h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-sm font-medium">
                    {t(`sections.${section}.label` as `sections.profile.label`)}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {t(
                      `sections.${section}.description` as `sections.profile.description`
                    )}
                  </p>
                </div>
                <ChevronRight className="text-muted-foreground h-4 w-4 shrink-0" />
              </button>
            );
          })}
        </CardContent>
      </Card>

      {DANGER_SECTIONS.map((section) => {
        const Icon = (section ? SECTION_ICONS[section] : null) ?? Trash2;
        return (
          <Card key={section} className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive text-base">
                {t(`sections.${section}.label` as `sections.danger.label`)}
              </CardTitle>
              <CardDescription>
                {t(
                  `sections.${section}.description` as `sections.danger.description`
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="destructive"
                onClick={() => openWorkspaceSettings(section)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {t('danger.openButton')}
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
