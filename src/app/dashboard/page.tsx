'use client';

import { useSaaSAuth, useSaaSWorkspaces } from '@buildbase/sdk';
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Current Workspace</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {currentWorkspace?.name || 'No workspace selected'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Your Role</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold capitalize">
              {user?.role || 'N/A'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Email</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium truncate">{user?.email}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Status</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="text-sm">
              Active
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button>Create Project</Button>
            <Button variant="outline">View Reports</Button>
            <Button variant="outline">Invite Team Member</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
