import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Team | Dashboard',
  description:
    'Manage your team members and permissions. Invite users and set roles.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Team</h1>
        <p className="text-muted-foreground">
          Manage your team members and permissions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Your team members will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Team management content goes here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
