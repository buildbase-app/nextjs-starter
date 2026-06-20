'use client';

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

const SECTIONS: {
  section: Section;
  label: string;
  description: string;
  icon: React.ElementType;
  destructive?: boolean;
}[] = [
  {
    section: 'profile',
    label: 'Profile',
    description: 'Your name, avatar, and personal details',
    icon: User,
  },
  {
    section: 'general',
    label: 'General',
    description: 'Workspace name, slug, and basic settings',
    icon: Building2,
  },
  {
    section: 'users',
    label: 'Members & invitations',
    description: 'Manage team members, roles, and pending invites',
    icon: Users,
  },
  {
    section: 'subscription',
    label: 'Subscription',
    description: 'View and change your current plan',
    icon: CreditCard,
  },
  {
    section: 'usage',
    label: 'Usage',
    description: 'Quota consumption and usage history',
    icon: BarChart3,
  },
  {
    section: 'credits',
    label: 'Credits',
    description: 'Credit balance and top-up options',
    icon: Coins,
  },
  {
    section: 'features',
    label: 'Feature flags',
    description: 'Workspace-level feature toggles',
    icon: Flag,
  },
  {
    section: 'notifications',
    label: 'Notifications',
    description: 'Email and push notification preferences',
    icon: Bell,
  },
  {
    section: 'permissions',
    label: 'Permissions',
    description: 'Role-based access control settings',
    icon: ShieldCheck,
  },
  {
    section: 'danger',
    label: 'Danger zone',
    description: 'Delete workspace or transfer ownership',
    icon: Trash2,
    destructive: true,
  },
];

export default function SettingsPage() {
  const { openWorkspaceSettings } = useSaaSAuth();

  const safe = SECTIONS.filter((s) => !s.destructive);
  const danger = SECTIONS.filter((s) => s.destructive);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          All workspace settings via{' '}
          <code className="text-xs">openWorkspaceSettings(section)</code>
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Workspace settings</CardTitle>
          <CardDescription>
            Click any section to open the BuildBase settings panel
          </CardDescription>
        </CardHeader>
        <CardContent className="divide-y p-0">
          {safe.map(({ section, label, description, icon: Icon }) => (
            <button
              key={section}
              onClick={() => openWorkspaceSettings(section)}
              className="hover:bg-muted/50 flex w-full items-center gap-3 px-6 py-4 transition-colors"
            >
              <div className="bg-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-md">
                <Icon className="text-foreground h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm font-medium">{label}</p>
                <p className="text-muted-foreground text-xs">{description}</p>
              </div>
              <ChevronRight className="text-muted-foreground h-4 w-4 shrink-0" />
            </button>
          ))}
        </CardContent>
      </Card>

      {danger.map(({ section, label, description, icon: Icon }) => (
        <Card key={section} className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive text-base">
              {label}
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              onClick={() => openWorkspaceSettings(section)}
            >
              <Icon className="mr-2 h-4 w-4" />
              Open danger zone
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
