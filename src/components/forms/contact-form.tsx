'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import {
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Field {
  slug: string;
  title: string;
  helpText?: string;
  type: string;
  required?: boolean;
}

interface Submission {
  _id: string;
  data: Record<string, unknown>;
  createdAt: string;
}

interface FormPayload {
  form: { _id: string; publicId: string; title: string; description?: string };
  fields: Field[];
  submissions: Submission[];
}

/**
 * The form's fields come from the platform, so a field added in the console
 * appears here on the next load. Submission goes through this app's server,
 * which forwards it to the platform's public endpoint and shows every
 * validation error the platform returns.
 */
export function ContactForm() {
  const t = useTranslations('forms');
  const [payload, setPayload] = useState<FormPayload | null>(null);
  const [state, setState] = useState<
    'loading' | 'ready' | 'missing' | 'unconfigured'
  >('loading');
  const [values, setValues] = useState<Record<string, string | boolean>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [lastResult, setLastResult] = useState<'ok' | 'rejected' | null>(null);

  const load = useCallback(async () => {
    const res = await fetch('/api/forms');
    if (res.status === 503) return setState('unconfigured');
    if (res.status === 404) return setState('missing');
    if (!res.ok) return setState('missing');
    const data = (await res.json()) as FormPayload;
    setPayload(data);
    setState('ready');
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payload) return;
    setSending(true);
    setErrors([]);
    try {
      const body: Record<string, unknown> = {};
      for (const f of payload.fields) {
        const v = values[f.slug];
        if (f.type === 'bool') body[f.slug] = Boolean(v);
        else if (f.type === 'number')
          body[f.slug] = v === '' || v === undefined ? undefined : Number(v);
        else if (v !== undefined && v !== '') body[f.slug] = v;
      }
      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as {
        ok: boolean;
        message?: string;
        errors?: unknown[];
      };
      if (data.ok) {
        setLastResult('ok');
        setValues({});
        toast.success(t('toast.sent'));
        await load();
      } else {
        setLastResult('rejected');
        const list = (data.errors ?? []).map((err) =>
          typeof err === 'string' ? err : JSON.stringify(err)
        );
        setErrors(list.length ? list : [data.message ?? t('errors.generic')]);
      }
    } finally {
      setSending(false);
    }
  };

  if (state === 'loading') {
    return <p className="text-muted-foreground text-sm">{t('loading')}</p>;
  }
  if (state !== 'ready' || !payload) {
    return (
      <Card>
        <CardContent className="space-y-2 pt-6 text-sm">
          <p className="font-medium">{t('missing.title')}</p>
          <p className="text-muted-foreground">
            {state === 'unconfigured' ? t('missing.token') : t('missing.form')}
          </p>
          <code className="bg-muted block rounded px-2 py-1 font-mono text-xs">
            node scripts/seed-org.mjs forms
          </code>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ClipboardList className="h-4 w-4" /> {payload.form.title}
          </CardTitle>
          <CardDescription>
            {payload.form.description ?? t('fromConsole')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            {payload.fields.map((f) => (
              <div key={f.slug} className="space-y-1">
                <label htmlFor={`f-${f.slug}`} className="text-sm font-medium">
                  {f.title}
                  {f.required && <span className="text-destructive"> *</span>}
                  <span className="text-muted-foreground ms-2 font-mono text-[11px]">
                    {f.type}
                  </span>
                </label>
                {f.type === 'bool' ? (
                  <input
                    id={`f-${f.slug}`}
                    type="checkbox"
                    checked={Boolean(values[f.slug])}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [f.slug]: e.target.checked }))
                    }
                    className="h-4 w-4"
                  />
                ) : f.type === 'rich-text' ? (
                  <textarea
                    id={`f-${f.slug}`}
                    rows={4}
                    value={String(values[f.slug] ?? '')}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [f.slug]: e.target.value }))
                    }
                    className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
                  />
                ) : (
                  <Input
                    id={`f-${f.slug}`}
                    type={
                      f.type === 'email'
                        ? 'email'
                        : f.type === 'number'
                          ? 'number'
                          : f.type === 'date'
                            ? 'date'
                            : f.type === 'link'
                              ? 'url'
                              : 'text'
                    }
                    value={String(values[f.slug] ?? '')}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [f.slug]: e.target.value }))
                    }
                  />
                )}
                {f.helpText && (
                  <p className="text-muted-foreground text-xs">{f.helpText}</p>
                )}
              </div>
            ))}
            {errors.length > 0 && (
              <div className="border-destructive/40 bg-destructive/5 rounded-md border p-3 text-sm">
                <p className="text-destructive flex items-center gap-2 font-medium">
                  <AlertCircle className="h-4 w-4" /> {t('errors.title')}
                </p>
                <ul className="text-destructive mt-1 list-disc pl-5">
                  {errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Button type="submit" disabled={sending}>
                {sending ? t('sending') : t('submit')}
              </Button>
              {lastResult === 'ok' && (
                <span className="text-primary inline-flex items-center gap-1 text-xs">
                  <CheckCircle2 className="h-3.5 w-3.5" /> {t('sent')}
                </span>
              )}
            </div>
            <p className="text-muted-foreground text-xs">{t('hint')}</p>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-base">
              {t('submissions.title')}
            </CardTitle>
            <CardDescription>{t('submissions.description')}</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => void load()}>
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">{t('submissions.refresh')}</span>
          </Button>
        </CardHeader>
        <CardContent>
          {payload.submissions.length === 0 ? (
            <p className="text-muted-foreground py-6 text-center text-sm">
              {t('submissions.empty')}
            </p>
          ) : (
            <ul className="divide-y">
              {payload.submissions.map((s) => (
                <li key={s._id} className="py-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground text-xs tabular-nums">
                      {new Date(s.createdAt).toLocaleString()}
                    </span>
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {s._id.slice(-6)}
                    </Badge>
                  </div>
                  <dl className="mt-1 grid gap-x-4 gap-y-0.5 sm:grid-cols-[auto_1fr]">
                    {payload.fields.map((f) => (
                      <div
                        key={f.slug}
                        className={cn(
                          'contents',
                          s.data[f.slug] === undefined && 'hidden'
                        )}
                      >
                        <dt className="text-muted-foreground text-xs">
                          {f.title}
                        </dt>
                        <dd className="truncate text-xs">
                          {String(s.data[f.slug] ?? '')}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
