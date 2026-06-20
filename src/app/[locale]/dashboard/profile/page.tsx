'use client';

import { useState } from 'react';
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
      setSaveMsg('Saved!');
      setEditKey('');
      setEditValue('');
    } catch {
      setSaveMsg('Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  const attrEntries = Object.entries(attributes ?? {});
  const featureEntries = Object.entries(features ?? {});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
        <p className="text-muted-foreground">
          Attributes via <code className="text-xs">useUserAttributes()</code> ·
          Feature flags via <code className="text-xs">useUserFeatures()</code> ·
          Workspace flags via{' '}
          <code className="text-xs">WhenWorkspaceFeatureEnabled</code>
        </p>
      </div>

      {/* Identity */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <User className="h-5 w-5" />
          <div>
            <CardTitle className="text-base">Identity</CardTitle>
            <CardDescription>From useSaaSAuth()</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <p className="text-muted-foreground text-xs">Name</p>
            <p className="font-medium">{user?.name ?? '—'}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Email</p>
            <p className="font-medium">{user?.email ?? '—'}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Role</p>
            <p className="font-medium capitalize">{user?.role ?? '—'}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">ID</p>
            <p className="font-mono text-xs">{user?.id ?? '—'}</p>
          </div>
        </CardContent>
      </Card>

      {/* Workspace feature flag gates */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <Flag className="h-5 w-5" />
          <div>
            <CardTitle className="text-base">Workspace feature flags</CardTitle>
            <CardDescription>
              <code className="text-xs">WhenWorkspaceFeatureEnabled</code> /{' '}
              <code className="text-xs">WhenWorkspaceFeatureDisabled</code>
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
                      Enabled
                    </Badge>
                  </span>
                </WhenWorkspaceFeatureEnabled>
                <WhenWorkspaceFeatureDisabled slug={slug}>
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <XCircle className="h-4 w-4" />
                    <Badge variant="secondary" className="text-xs">
                      Disabled
                    </Badge>
                  </span>
                </WhenWorkspaceFeatureDisabled>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User attributes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <Sliders className="h-5 w-5" />
            <div>
              <CardTitle className="text-base">User Attributes</CardTitle>
              <CardDescription>
                Custom key-value pairs stored per user
              </CardDescription>
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
              No attributes set yet.
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

          {/* Write a new attribute */}
          <div className="border-t pt-4">
            <p className="mb-3 text-sm font-medium">
              Set an attribute (live demo)
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex-1">
                <Input
                  placeholder="key (e.g. theme)"
                  value={editKey}
                  onChange={(e) => setEditKey(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Input
                  placeholder="value"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
              </div>
              <Button onClick={handleSave} disabled={saving || !editKey.trim()}>
                {saving ? 'Saving…' : 'Save'}
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

      {/* Feature flags */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base">User Feature Flags</CardTitle>
            <CardDescription>
              User-level feature flags from{' '}
              <code className="text-xs">useUserFeatures()</code>
            </CardDescription>
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
            <p className="text-muted-foreground text-sm">Loading...</p>
          ) : featureEntries.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No feature flags configured for this user.
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
                          Enabled
                        </Badge>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4" />
                        <Badge variant="secondary" className="text-xs">
                          Disabled
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
