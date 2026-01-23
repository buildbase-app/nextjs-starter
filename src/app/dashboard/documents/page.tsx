import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
