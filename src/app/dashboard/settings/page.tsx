import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Settings | Dashboard',
  description:
    'Configure your application settings and preferences. Manage account options.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure your application settings.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Manage your preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Settings content goes here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
