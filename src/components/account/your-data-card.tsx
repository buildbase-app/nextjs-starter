'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSaaSAuth } from '@buildbase/sdk/react';
import { Download, Trash2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * GDPR in one card.
 *
 * Export (Article 15) is this app's own: it bundles the app's copy of you
 * with your platform profile (/api/user/export).
 *
 * Delete (Article 17) is the SDK's: its Security screen deletes the account
 * on the platform, asks for Confirm it's you when the sign-in is older than
 * 10 minutes, names the workspaces that block it, and shows a scheduled
 * deletion with Cancel. This app's copy is erased when the platform reports
 * `user.deleted` (src/app/api/webhooks/buildbase/route.ts).
 */
export function YourDataCard() {
  const t = useTranslations('yourData');
  const { openWorkspaceSettings } = useSaaSAuth();
  const [exporting, setExporting] = useState(false);
  const [failed, setFailed] = useState(false);

  const exportData = async () => {
    setExporting(true);
    setFailed(false);
    try {
      const res = await fetch('/api/user/export');
      if (!res.ok) throw new Error(String(res.status));
      const blob = new Blob([JSON.stringify(await res.json(), null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `my-data-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setFailed(true);
    } finally {
      setExporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={exportData} disabled={exporting}>
            <Download className="mr-2 h-4 w-4" />
            {exporting ? t('export.working') : t('export.button')}
          </Button>
          <Button
            variant="destructive"
            onClick={() => openWorkspaceSettings('security')}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {t('delete.button')}
          </Button>
        </div>
        <p className="text-muted-foreground text-xs">{t('delete.where')}</p>
        {failed && (
          <p className="text-sm text-red-700 dark:text-red-400">
            {t('failed')}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
