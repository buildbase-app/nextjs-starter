'use client';

import { useTranslations } from 'next-intl';
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

const FEATURE_SLUGS: {
  slug: string;
  key: 'advancedExports' | 'documentSharing' | 'eSignatures';
  icon: React.ElementType;
}[] = [
  { slug: 'advanced-exports', key: 'advancedExports', icon: Download },
  { slug: 'document-sharing', key: 'documentSharing', icon: Share2 },
  { slug: 'e-signatures', key: 'eSignatures', icon: Signature },
];

export default function DocumentsPage() {
  const t = useTranslations('documents');
  const { currentWorkspace } = useSaaSWorkspaces();

  const features = currentWorkspace?.features ?? {};
  const enabledCount = FEATURE_SLUGS.filter((s) => features[s.slug]).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription>{t('stats.featureSections')}</CardDescription>
            <FileText className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{FEATURE_SLUGS.length}</p>
            <p className="text-muted-foreground mt-1 text-xs">
              {t('stats.featureSectionsSubtitle')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('stats.enabled')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {enabledCount}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              {t('stats.enabledSubtitle')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t('stats.locked')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-2xl font-bold">
              {FEATURE_SLUGS.length - enabledCount}
            </p>
            <p className="text-muted-foreground mt-1 text-xs">
              {t('stats.lockedSubtitle')}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FEATURE_SLUGS.map(({ slug, key, icon: Icon }) => (
          <Card key={slug}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="text-muted-foreground h-4 w-4" />
                  <CardTitle className="text-base">
                    {t(`featureSections.${key}.label`)}
                  </CardTitle>
                </div>
                <WhenWorkspaceFeatureEnabled slug={slug}>
                  <Badge variant="default" className="text-xs">
                    {t('features.enabled')}
                  </Badge>
                </WhenWorkspaceFeatureEnabled>
                <WhenWorkspaceFeatureDisabled slug={slug}>
                  <Badge variant="secondary" className="text-xs">
                    {t('features.disabled')}
                  </Badge>
                </WhenWorkspaceFeatureDisabled>
              </div>
              <CardDescription>
                {t(`featureSections.${key}.description`)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WhenWorkspaceFeatureEnabled slug={slug}>
                <p className="flex items-start gap-1.5 text-sm text-green-700 dark:text-green-400">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  {t(`featureSections.${key}.content`)}
                </p>
              </WhenWorkspaceFeatureEnabled>
              <WhenWorkspaceFeatureDisabled slug={slug}>
                <p className="text-muted-foreground flex items-start gap-1.5 text-sm">
                  <Lock className="mt-0.5 h-4 w-4 shrink-0" />
                  {t(`featureSections.${key}.lockedMessage`)}
                </p>
              </WhenWorkspaceFeatureDisabled>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('allFeatures.title')}</CardTitle>
          <CardDescription>{t('allFeatures.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.keys(features).length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {t('allFeatures.empty')}
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
