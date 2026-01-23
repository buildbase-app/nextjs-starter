import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          View your analytics and insights.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>
            Your analytics data will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Analytics content goes here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
