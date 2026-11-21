'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  useSaaSAuth,
  type RequireReverificationOptions,
} from '@buildbase/sdk/react';
import { Download, ShieldCheck, Trash2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Factors = RequireReverificationOptions['factors'];

/** A sign-in this recent counts: the platform's own window for deletion. */
const RECENT_MS = 10 * 60 * 1000;

type Outcome =
  | { kind: 'idle' }
  | { kind: 'confirm-first' }
  | { kind: 'scheduled'; deleteAfter: string | null }
  | { kind: 'owns'; workspaces: string[] }
  | { kind: 'failed' };

/**
 * GDPR in one card: export everything this app and the platform hold about
 * you (Article 15), and delete your account (Article 17).
 *
 * Deleting needs a recent sign-in. The server tries first; an old session
 * comes back `403 reauth_required`, and `requireReverification()` sends the
 * person to the hosted "Confirm it's you" page and back here, still signed
 * in, where they press Delete again. `session.authTime` says whether the
 * session is recent, so the card can say so before they try.
 */
export function YourDataCard() {
  const t = useTranslations('yourData');
  const { session, requireReverification, signOut } = useSaaSAuth();
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [outcome, setOutcome] = useState<Outcome>({ kind: 'idle' });

  // The page's load time is enough: coming back from "Confirm it's you"
  // reloads the page.
  const [loadedAt] = useState(() => Date.now());
  const authTime = session?.authTime ? Date.parse(session.authTime) : NaN;
  const recent = Number.isFinite(authTime) && loadedAt - authTime < RECENT_MS;

  const exportData = async () => {
    setExporting(true);
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
      setOutcome({ kind: 'failed' });
    } finally {
      setExporting(false);
    }
  };

  const confirmItsYou = async (factors?: Factors) => {
    // Resolves 'redirecting' while the browser leaves for the hosted page.
    await requireReverification(factors?.length ? { factors } : undefined);
  };

  const deleteAccount = async () => {
    if (!window.confirm(t('delete.areYouSure'))) return;
    setDeleting(true);
    setOutcome({ kind: 'idle' });
    try {
      const res = await fetch('/api/user/delete', { method: 'DELETE' });
      const body = (await res.json().catch(() => ({}))) as {
        code?: string;
        factors?: Factors;
        deleted?: boolean;
        deleteAfter?: string | null;
        workspaces?: { name: string }[];
      };
      if (res.status === 403 && body.code === 'reauth_required') {
        setOutcome({ kind: 'confirm-first' });
        await confirmItsYou(body.factors);
        return;
      }
      if (res.status === 409) {
        setOutcome({
          kind: 'owns',
          workspaces: (body.workspaces ?? []).map((w) => w.name),
        });
        return;
      }
      if (!res.ok) {
        setOutcome({ kind: 'failed' });
        return;
      }
      if (body.deleted) {
        // The platform already ended the session; this clears the SDK's copy.
        await signOut().catch(() => {});
        window.location.assign('/');
        return;
      }
      setOutcome({ kind: 'scheduled', deleteAfter: body.deleteAfter ?? null });
    } catch {
      setOutcome({ kind: 'failed' });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={exportData} disabled={exporting}>
            <Download className="mr-2 h-4 w-4" />
            {exporting ? t('export.working') : t('export.button')}
          </Button>
          <Button
            variant="destructive"
            onClick={deleteAccount}
            disabled={deleting}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {deleting ? t('delete.working') : t('delete.button')}
          </Button>
        </div>

        <p className="text-muted-foreground flex items-start gap-1.5 text-xs">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>
            {recent ? t('delete.recent') : t('delete.needsConfirm')}{' '}
            <code>requireReverification()</code>
          </span>
        </p>

        {!recent && (
          <Button size="sm" variant="ghost" onClick={() => confirmItsYou()}>
            {t('delete.confirmNow')}
          </Button>
        )}

        {outcome.kind === 'confirm-first' && (
          <p className="text-sm">{t('delete.confirmFirst')}</p>
        )}
        {outcome.kind === 'scheduled' && (
          <p className="text-sm">
            {outcome.deleteAfter
              ? t('delete.scheduled', {
                  date: new Date(outcome.deleteAfter).toLocaleDateString(),
                })
              : t('delete.scheduledNoDate')}
          </p>
        )}
        {outcome.kind === 'owns' && (
          <p className="text-sm text-red-700 dark:text-red-400">
            {t('delete.ownsWorkspaces', {
              names: outcome.workspaces.join(', '),
            })}
          </p>
        )}
        {outcome.kind === 'failed' && (
          <p className="text-sm text-red-700 dark:text-red-400">
            {t('failed')}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
