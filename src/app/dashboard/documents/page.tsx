import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Documents | Dashboard',
  description:
    'Manage your documents and files. Upload, organize, and share documents.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <p className="text-muted-foreground">
          Manage your documents and files.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Documents</CardTitle>
          <CardDescription>Your documents will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Documents content goes here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
