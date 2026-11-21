'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useCreditAutoTopUp, useCreditPackages } from '@buildbase/sdk/react';
import { CreditCard, RefreshCcw } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const PAUSE_REASONS = [
  'payment_failed',
  'no_payment_method',
  'monthly_cap',
  'dunning',
  'currency_unavailable',
  'package_unavailable',
  'tax_requires_checkout',
  'terms_changed',
] as const;

type Draft = {
  threshold: string;
  creditPackageId: string;
  monthlyCap: string;
};

/**
 * Auto top-up: buy a credit pack on the saved card whenever the balance
 * falls under a threshold, at most `monthlyCap` times a calendar month.
 * The platform runs it; the app only reads and changes the setting
 * (`useCreditAutoTopUp`). A top-up that cannot go through pauses the setting
 * and says why, and `resume()` clears it once the reason is fixed.
 * `settings` is null where the platform has no auto top-up, so the card
 * says so instead of offering a switch that does nothing.
 */
export function AutoTopUpCard({ workspaceId }: { workspaceId: string }) {
  const t = useTranslations('autoTopUp');
  const { settings, update, resume, addPaymentMethod, loading, saving, error } =
    useCreditAutoTopUp(workspaceId);
  const { packages } = useCreditPackages(workspaceId);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saved, setSaved] = useState(false);

  // The form starts from the saved setting; a draft exists once edited.
  const form: Draft = draft ?? {
    threshold: String(settings?.threshold ?? 20),
    creditPackageId: settings?.creditPackageId ?? packages[0]?._id ?? '',
    monthlyCap: String(settings?.monthlyCap ?? settings?.capDefault ?? 2),
  };
  const edit = (patch: Partial<Draft>) => {
    setSaved(false);
    setDraft({ ...form, ...patch });
  };

  const save = async (enabled: boolean) => {
    setSaved(false);
    try {
      await update({
        enabled,
        threshold: Math.max(0, Number(form.threshold) || 0),
        creditPackageId: form.creditPackageId || undefined,
        monthlyCap: Math.max(1, Number(form.monthlyCap) || 1),
      });
      setDraft(null);
      setSaved(true);
    } catch {
      // `error` says why, in the reader's language.
    }
  };

  const reason = settings?.pausedReason;
  const knownReason = PAUSE_REASONS.find((r) => r === reason);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-2">
        <RefreshCcw className="mt-0.5 h-5 w-5" />
        <div className="flex-1">
          <CardTitle className="flex items-center gap-2 text-base">
            {t('title')}
            {settings && (
              <Badge variant={settings.enabled ? 'default' : 'secondary'}>
                {settings.enabled ? t('on') : t('off')}
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            {t('description')}{' '}
            <code className="text-xs">useCreditAutoTopUp()</code>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <p className="text-muted-foreground text-sm">{t('loading')}</p>
        ) : !settings ? (
          <p className="text-muted-foreground text-sm">{t('unavailable')}</p>
        ) : (
          <>
            {reason && (
              <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
                <p>
                  {knownReason
                    ? t(`paused.${knownReason}`)
                    : t('paused.other', { reason })}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2"
                  onClick={() => resume().catch(() => {})}
                  disabled={saving}
                >
                  {t('resume')}
                </Button>
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-3">
              <label className="space-y-1 text-sm">
                <span className="text-muted-foreground text-xs">
                  {t('threshold')}
                </span>
                <Input
                  type="number"
                  min={0}
                  value={form.threshold}
                  onChange={(e) => edit({ threshold: e.target.value })}
                />
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-muted-foreground text-xs">
                  {t('pack')}
                </span>
                <select
                  className="border-input bg-background h-9 w-full rounded-md border px-2 text-sm"
                  value={form.creditPackageId}
                  onChange={(e) => edit({ creditPackageId: e.target.value })}
                >
                  {packages.length === 0 && <option value="">—</option>}
                  {packages.map((pkg) => (
                    <option key={pkg._id} value={pkg._id}>
                      {t('packOption', {
                        name: pkg.name,
                        credits: pkg.creditAmount,
                      })}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-muted-foreground text-xs">
                  {t('monthlyCap', {
                    min: settings.capMin ?? 1,
                    max: settings.capMax ?? 50,
                  })}
                </span>
                <Input
                  type="number"
                  min={settings.capMin ?? 1}
                  max={settings.capMax ?? 50}
                  value={form.monthlyCap}
                  onChange={(e) => edit({ monthlyCap: e.target.value })}
                />
              </label>
            </div>

            <p className="text-muted-foreground text-xs">
              {t('usage', {
                used: settings.capUsed,
                cap: settings.monthlyCap,
              })}
              {settings.lastTopUpAt &&
                ` ${t('lastTopUp', {
                  date: new Date(settings.lastTopUpAt).toLocaleString(),
                })}`}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <CreditCard className="text-muted-foreground h-4 w-4" />
              {settings.paymentMethod ? (
                <span>
                  {t('card', {
                    brand: settings.paymentMethod.brand,
                    last4: settings.paymentMethod.last4,
                  })}
                </span>
              ) : (
                <span className="text-muted-foreground">{t('noCard')}</span>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => addPaymentMethod().catch(() => {})}
              >
                {settings.paymentMethod ? t('changeCard') : t('addCard')}
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                onClick={() => save(true)}
                disabled={saving || !form.creditPackageId}
              >
                {settings.enabled ? t('save') : t('turnOn')}
              </Button>
              {settings.enabled && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => save(false)}
                  disabled={saving}
                >
                  {t('turnOff')}
                </Button>
              )}
            </div>

            {saved && (
              <p className="text-sm text-green-700 dark:text-green-400">
                {t('saved')}
              </p>
            )}
          </>
        )}
        {error && (
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        )}
      </CardContent>
    </Card>
  );
}
