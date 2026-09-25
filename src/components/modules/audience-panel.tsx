'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useSaaSAuth, useUserAttributes } from '@buildbase/sdk/react';
import { countries, currencies, timezones } from '@buildbase/sdk/data';
import { CheckCircle2, Globe, Mail, UserRoundCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from '@/i18n/routing';

const CHECKS = ['profile', 'workspace', 'invite'] as const;

async function noteDone(keys: string[]) {
  await fetch('/api/audience/attributes-done', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keys }),
  }).catch(() => undefined);
}

/**
 * Three things the platform keeps about a person beyond the account: custom
 * attributes (written by the SDK as the user), a marketing audience contact
 * (written by the server with the org token), and locale-ish preferences
 * from the SDK's data lists.
 */
export function AudiencePanel() {
  const t = useTranslations('audience');
  const { user } = useSaaSAuth();
  const { attributes, loading, updateAttributes, refetch } =
    useUserAttributes();

  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [roleTitle, setRoleTitle] = useState('');
  const [saving, setSaving] = useState<string | null>(null);
  const [country, setCountry] = useState(String(attributes.country ?? ''));
  const [timezone, setTimezone] = useState(String(attributes.timezone ?? ''));
  const [currency, setCurrency] = useState(String(attributes.currency ?? ''));
  const [email, setEmail] = useState(user?.email ?? '');
  const [subscribed, setSubscribed] = useState<string | null>(null);

  const allChecked = CHECKS.every((c) => checks[c]);
  const entries = useMemo(() => Object.entries(attributes), [attributes]);

  const saveOnboarding = async () => {
    setSaving('onboarding');
    try {
      await updateAttributes({
        onboarded: true,
        ...(roleTitle.trim() ? { 'role-title': roleTitle.trim() } : {}),
      });
      await noteDone(['onboarded', 'role-title']);
      await refetch();
      toast.success(t('onboarding.saved'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('failed'));
    } finally {
      setSaving(null);
    }
  };

  const saveLocale = async () => {
    setSaving('locale');
    try {
      const updates: Record<string, string> = {};
      if (country) updates.country = country;
      if (timezone) updates.timezone = timezone;
      if (currency) updates.currency = currency;
      await updateAttributes(updates);
      await noteDone(Object.keys(updates));
      await refetch();
      toast.success(t('locale.saved'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('failed'));
    } finally {
      setSaving(null);
    }
  };

  const subscribe = async () => {
    setSaving('newsletter');
    try {
      const res = await fetch('/api/audience/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: user?.name }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        list?: string | null;
        error?: string;
        message?: string;
      };
      if (res.status === 503) {
        toast.error(t('notConfigured'));
        return;
      }
      if (!res.ok)
        throw new Error(data.message ?? data.error ?? String(res.status));
      setSubscribed(data.list ?? '');
      toast.success(t('newsletter.subscribed'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('failed'));
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CheckCircle2 className="h-4 w-4" /> {t('onboarding.title')}
          </CardTitle>
          <CardDescription>{t('onboarding.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {CHECKS.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm">
              <input
                id={`onboarding-${c}`}
                type="checkbox"
                checked={Boolean(checks[c])}
                onChange={(e) =>
                  setChecks((s) => ({ ...s, [c]: e.target.checked }))
                }
              />
              {t(`onboarding.items.${c}`)}
            </label>
          ))}
          <Input
            id="role-title"
            placeholder={t('onboarding.role')}
            value={roleTitle}
            onChange={(e) => setRoleTitle(e.target.value)}
          />
          <Button
            disabled={!allChecked || saving === 'onboarding'}
            onClick={saveOnboarding}
          >
            {t('onboarding.save')}
          </Button>
          {attributes.onboarded === true && (
            <p className="text-muted-foreground text-xs">
              {t('onboarding.already')}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <UserRoundCog className="h-4 w-4" /> {t('attributes.title')}
          </CardTitle>
          <CardDescription>{t('attributes.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground text-sm">…</p>
          ) : entries.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {t('attributes.empty')}
            </p>
          ) : (
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
              {entries.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-muted-foreground font-mono text-xs">
                    {k}
                  </dt>
                  <dd className="truncate">{String(v)}</dd>
                </div>
              ))}
            </dl>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="h-4 w-4" /> {t('locale.title')}
          </CardTitle>
          <CardDescription>{t('locale.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <select
            id="attr-country"
            className="bg-background w-full rounded-md border px-3 py-2 text-sm"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">{t('locale.country')}</option>
            {countries.map((c) => (
              <option key={c.value} value={c.value}>
                {c.flag} {c.text}
              </option>
            ))}
          </select>
          <select
            id="attr-timezone"
            className="bg-background w-full rounded-md border px-3 py-2 text-sm"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          >
            <option value="">{t('locale.timezone')}</option>
            {timezones.map((z) => (
              <option key={z.value} value={z.value}>
                {z.text}
              </option>
            ))}
          </select>
          <select
            id="attr-currency"
            className="bg-background w-full rounded-md border px-3 py-2 text-sm"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="">{t('locale.currency')}</option>
            {currencies.map((c) => (
              <option key={c.value} value={c.value}>
                {c.text}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            disabled={
              saving === 'locale' || (!country && !timezone && !currency)
            }
            onClick={saveLocale}
          >
            {t('locale.save')}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Mail className="h-4 w-4" /> {t('newsletter.title')}
          </CardTitle>
          <CardDescription>{t('newsletter.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('newsletter.email')}
            />
            <Button
              disabled={saving === 'newsletter' || !email}
              onClick={subscribe}
            >
              {t('newsletter.subscribe')}
            </Button>
          </div>
          {subscribed !== null && (
            <p className="text-muted-foreground text-xs">
              {subscribed
                ? t('newsletter.listed', { list: subscribed })
                : t('newsletter.noList')}
            </p>
          )}
          <p className="text-muted-foreground text-xs">
            {t('newsletter.waitlistHint')}{' '}
            <Link
              href="/waitlist"
              className="text-primary underline-offset-4 hover:underline"
            >
              /waitlist
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
