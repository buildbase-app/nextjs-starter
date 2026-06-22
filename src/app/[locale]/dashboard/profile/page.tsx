'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  useUserAttributes,
  useUserFeatures,
  useSaaSAuth,
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  CheckCircle2,
  XCircle,
  RefreshCw,
  User,
  Sliders,
  Flag,
} from 'lucide-react';

const DEMO_FEATURE_SLUGS = [
  'premium-analytics',
  'advanced-exports',
  'beta-features',
  'custom-branding',
];

export default function ProfilePage() {
  const t = useTranslations('profile');
  const { user } = useSaaSAuth();
  const {
    attributes,
    isLoading: attrsLoading,
    updateAttribute,
    refreshAttributes,
  } = useUserAttributes();
  const {
    features,
    isLoading: featuresLoading,
    refreshFeatures,
  } = useUserFeatures();

  const [editKey, setEditKey] = useState('');
  const [editValue, setEditValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  const handleSave = async () => {
    if (!editKey.trim()) return;
    setSaving(true);
    setSaveMsg('');
    try {
      await updateAttribute(editKey.trim(), editValue);
      setSaveMsg(t('attributes.saved'));
      setEditKey('');
      setEditValue('');
    } catch {
      setSaveMsg(t('attributes.failed'));
    } finally {
      setSaving(false);
    }
  };

  const attrEntries = Object.entries(attributes ?? {});
  const featureEntries = Object.entries(features ?? {});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <User className="h-5 w-5" />
          <div>
            <CardTitle className="text-base">{t('identity.title')}</CardTitle>
            <CardDescription>{t('identity.subtitle')}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <p className="text-muted-foreground text-xs">
              {t('identity.name')}
            </p>
            <p className="font-medium">{user?.name ?? '—'}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">
              {t('identity.email')}
            </p>
            <p className="font-medium">{user?.email ?? '—'}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">
              {t('identity.role')}
            </p>
            <p className="font-medium capitalize">{user?.role ?? '—'}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">{t('identity.id')}</p>
            <p className="font-mono text-xs">{user?.id ?? '—'}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <Flag className="h-5 w-5" />
          <div>
            <CardTitle className="text-base">
              {t('workspaceFeatures.title')}
            </CardTitle>
            <CardDescription>
              <code className="text-xs">WhenWorkspaceFeatureEnabled</code>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {DEMO_FEATURE_SLUGS.map((slug) => (
              <div
                key={slug}
                className="flex items-center justify-between py-2 text-sm"
              >
                <span className="font-mono text-xs">{slug}</span>
                <WhenWorkspaceFeatureEnabled slug={slug}>
                  <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <Badge variant="default" className="text-xs">
                      {t('workspaceFeatures.enabled')}
                    </Badge>
                  </span>
                </WhenWorkspaceFeatureEnabled>
                <WhenWorkspaceFeatureDisabled slug={slug}>
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <XCircle className="h-4 w-4" />
                    <Badge variant="secondary" className="text-xs">
                      {t('workspaceFeatures.disabled')}
                    </Badge>
                  </span>
                </WhenWorkspaceFeatureDisabled>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <Sliders className="h-5 w-5" />
            <div>
              <CardTitle className="text-base">
                {t('attributes.title')}
              </CardTitle>
              <CardDescription>{t('attributes.description')}</CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshAttributes}
            disabled={attrsLoading}
          >
            <RefreshCw
              className={`h-4 w-4 ${attrsLoading ? 'animate-spin' : ''}`}
            />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {attrEntries.length === 0 && !attrsLoading ? (
            <p className="text-muted-foreground text-sm">
              {t('attributes.empty')}
            </p>
          ) : (
            <div className="divide-y">
              {attrEntries.map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-2 text-sm"
                >
                  <span className="font-mono text-xs">{key}</span>
                  <span className="text-muted-foreground max-w-[60%] truncate text-xs">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="border-t pt-4">
            <p className="mb-3 text-sm font-medium">
              {t('attributes.setTitle')}
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex-1">
                <Input
                  placeholder={t('attributes.keyPlaceholder')}
                  value={editKey}
                  onChange={(e) => setEditKey(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Input
                  placeholder={t('attributes.valuePlaceholder')}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              </div>
              <Button onClick={handleSave} disabled={saving || !editKey.trim()}>
                {saving ? t('attributes.saving') : t('attributes.save')}
              </Button>
            </div>
            {saveMsg && (
              <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                {saveMsg}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base">
              {t('userFeatures.title')}
            </CardTitle>
            <CardDescription>{t('userFeatures.description')}</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshFeatures}
            disabled={featuresLoading}
          >
            <RefreshCw
              className={`h-4 w-4 ${featuresLoading ? 'animate-spin' : ''}`}
            />
          </Button>
        </CardHeader>
        <CardContent>
          {featuresLoading ? (
            <p className="text-muted-foreground text-sm">
              {t('userFeatures.loading')}
            </p>
          ) : featureEntries.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {t('userFeatures.empty')}
            </p>
          ) : (
            <div className="divide-y">
              {featureEntries.map(([key, enabled]) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-2 text-sm"
                >
                  <span className="font-mono text-xs">{key}</span>
                  <span
                    className={`flex items-center gap-1.5 ${enabled ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}
                  >
                    {enabled ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        <Badge variant="default" className="text-xs">
                          {t('userFeatures.enabled')}
                        </Badge>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4" />
                        <Badge variant="secondary" className="text-xs">
                          {t('userFeatures.disabled')}
                        </Badge>
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
