'use client';

import {
  useSaaSWorkspaces,
  WhenWorkspaceFeatureEnabled,
  WhenWorkspaceFeatureDisabled,
} from '@buildbase/sdk/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Lock,
  Download,
  Share2,
  Signature,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

const FEATURE_SECTIONS: {
  slug: string;
  label: string;
  description: string;
  icon: React.ElementType;
  content: string;
  lockedMessage: string;
}[] = [
  {
    slug: 'advanced-exports',
    label: 'Advanced exports',
    description: 'Export documents as PDF, DOCX, or CSV',
    icon: Download,
    content: 'Export to PDF, Word, and CSV is available on your plan.',
    lockedMessage:
      'Enable the advanced-exports feature to unlock document exports.',
  },
  {
    slug: 'document-sharing',
    label: 'Document sharing',
    description: 'Share documents with external collaborators',
    icon: Share2,
    content: 'Shareable links and external collaborator access are enabled.',
    lockedMessage:
      'Enable document-sharing to allow sharing with people outside your workspace.',
  },
  {
    slug: 'e-signatures',
    label: 'E-signatures',
    description: 'Collect legally binding signatures',
    icon: Signature,
    content:
      'E-signature collection is active. Send signature requests from any document.',
    lockedMessage:
      'Enable e-signatures to collect legally binding signatures on documents.',
  },
];

export default function DocumentsPage() {
  const { currentWorkspace } = useSaaSWorkspaces();

  const features = currentWorkspace?.features ?? {};
  const enabledCount = FEATURE_SECTIONS.filter((s) => features[s.slug]).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <p className="text-muted-foreground">
          Feature-gated sections via{' '}
          <code className="text-xs">WhenWorkspaceFeatureEnabled</code>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>Feature sections</CardDescription>
            <FileText className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{FEATURE_SECTIONS.length}</p>
            <p className="text-muted-foreground mt-1 text-xs">
              document features
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Enabled for workspace</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {enabledCount}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              features active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Locked</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-2xl font-bold">
              {FEATURE_SECTIONS.length - enabledCount}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              features inactive
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FEATURE_SECTIONS.map(
          ({
            slug,
            label,
            description,
            icon: Icon,
            content,
            lockedMessage,
          }) => (
            <Card key={slug}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="text-muted-foreground h-4 w-4" />
                    <CardTitle className="text-base">{label}</CardTitle>
                  </div>
                  <WhenWorkspaceFeatureEnabled slug={slug}>
                    <Badge variant="default" className="text-xs">
                      Enabled
                    </Badge>
                  </WhenWorkspaceFeatureEnabled>
                  <WhenWorkspaceFeatureDisabled slug={slug}>
                    <Badge variant="secondary" className="text-xs">
                      Disabled
                    </Badge>
                  </WhenWorkspaceFeatureDisabled>
                </div>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent>
                <WhenWorkspaceFeatureEnabled slug={slug}>
                  <p className="flex items-start gap-1.5 text-sm text-green-700 dark:text-green-400">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    {content}
                  </p>
                </WhenWorkspaceFeatureEnabled>
                <WhenWorkspaceFeatureDisabled slug={slug}>
                  <p className="text-muted-foreground flex items-start gap-1.5 text-sm">
                    <Lock className="mt-0.5 h-4 w-4 shrink-0" />
                    {lockedMessage}
                  </p>
                </WhenWorkspaceFeatureDisabled>
              </CardContent>
            </Card>
          )
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All workspace features</CardTitle>
          <CardDescription>
            Raw feature flag state from{' '}
            <code className="text-xs">currentWorkspace.features</code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {Object.keys(features).length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No feature flags configured for this workspace.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {Object.entries(features).map(([key, enabled]) => (
                <div key={key} className="flex items-center gap-1.5">
                  {enabled ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <XCircle className="text-muted-foreground h-3.5 w-3.5" />
                  )}
                  <Badge
                    variant={enabled ? 'default' : 'secondary'}
                    className="font-mono text-xs"
                  >
                    {key}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
