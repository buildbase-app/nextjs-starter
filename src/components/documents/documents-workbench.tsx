'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  useSaaSWorkspaces,
  usePermissions,
  useQuotaUsageContext,
  useCreditBalanceContext,
  WhenQuotaExhausted,
  WhenQuotaThreshold,
  WhenCreditsLow,
  WhenCreditsExhausted,
} from '@buildbase/sdk/react';
import { toast } from 'sonner';
import {
  FileText,
  Plus,
  Search,
  Trash2,
  Database,
  AlertTriangle,
  Coins,
  Lock,
  Gauge,
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
import { canWriteDocuments } from '@/lib/documents/roles';

/*
 * The demo's own product: documents in a workspace. Every write goes to
 * /api/documents, which meters it on BuildBase (a `documents` quota and one
 * credit), refuses it for a viewer, and refuses it when the plan's hard cap
 * is reached. The same service backs the MCP tools, so an agent sees exactly
 * what this screen sees.
 */

const STATUSES = ['draft', 'in_review', 'published', 'archived'] as const;
type Status = (typeof STATUSES)[number];
const QUOTA_SLUG = 'documents';

interface DocumentSummary {
  id: string;
  title: string;
  status: Status;
  tags: string[];
  excerpt: string;
  wordCount: number;
  isSample: boolean;
  createdByName: string | null;
  updatedAt: string;
}

interface Stats {
  total: number;
  byStatus: Record<Status, number>;
  tags: { tag: string; count: number }[];
}

interface Metering {
  usage:
    | { recorded: true; used: number; included: number; available: number }
    | { recorded: false; reason: string };
  credits:
    | { consumed: true; amount: number; balanceAfter: number }
    | { consumed: false; reason: string };
}

const STATUS_STYLE: Record<Status, string> = {
  draft: 'bg-muted text-muted-foreground',
  in_review:
    'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
  published:
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
  archived: 'bg-muted text-muted-foreground line-through',
};

export function DocumentsWorkbench() {
  const t = useTranslations('documents.workbench');
  const { currentWorkspace } = useSaaSWorkspaces();
  const { role } = usePermissions();
  const quotaCtx = useQuotaUsageContext();
  const creditCtx = useCreditBalanceContext();
  const workspaceId = currentWorkspace?._id ?? null;
  const writer = canWriteDocuments(role);

  const [items, setItems] = useState<DocumentSummary[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<Status | ''>('');
  const [tag, setTag] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const [lastMetering, setLastMetering] = useState<Metering | null>(null);
  const [form, setForm] = useState({
    title: '',
    content: '',
    status: 'draft' as Status,
    tags: '',
  });

  const query = useMemo(() => {
    const p = new URLSearchParams();
    if (workspaceId) p.set('workspaceId', workspaceId);
    if (q) p.set('q', q);
    if (status) p.set('status', status);
    if (tag) p.set('tag', tag);
    p.set('limit', '50');
    return p.toString();
  }, [workspaceId, q, status, tag]);

  const load = useCallback(async () => {
    if (!workspaceId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/documents?${query}`);
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as {
        items: DocumentSummary[];
        stats: Stats;
      };
      setItems(data.items);
      setStats(data.stats);
    } catch {
      toast.error(t('loadFailed'));
    } finally {
      setLoading(false);
    }
  }, [workspaceId, query, t]);

  useEffect(() => {
    void load();
  }, [load]);

  /** Metering moved on the platform; make the gates and the sidebar agree. */
  const refreshMeters = async () => {
    await Promise.all([quotaCtx.refetch(), creditCtx.refetch()]);
  };

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceId) return;
    setBusy('create');
    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workspaceId, ...form }),
      });
      const data = await res.json();
      if (res.status === 402) {
        toast.error(
          t('refusedQuota', {
            consumed: data.consumed,
            included: data.included,
          })
        );
        return;
      }
      if (res.status === 403) {
        toast.error(t('refusedRole', { role: data.role }));
        return;
      }
      if (!res.ok) {
        toast.error(data.error ?? t('loadFailed'));
        return;
      }
      setLastMetering(data.metering ?? null);
      setForm({ title: '', content: '', status: 'draft', tags: '' });
      toast.success(t('created'));
      await Promise.all([load(), refreshMeters()]);
    } finally {
      setBusy(null);
    }
  };

  const setDocStatus = async (doc: DocumentSummary, next: Status) => {
    if (!workspaceId || next === doc.status) return;
    setBusy(doc.id);
    try {
      const res = await fetch(`/api/documents/${doc.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workspaceId, status: next }),
      });
      if (res.status === 403) {
        toast.error(t('refusedRole', { role: role ?? '' }));
        return;
      }
      if (!res.ok) {
        toast.error(t('loadFailed'));
        return;
      }
      await load();
    } finally {
      setBusy(null);
    }
  };

  const remove = async (doc: DocumentSummary) => {
    if (!workspaceId) return;
    setBusy(doc.id);
    try {
      const res = await fetch(
        `/api/documents/${doc.id}?workspaceId=${encodeURIComponent(workspaceId)}`,
        { method: 'DELETE' }
      );
      if (res.status === 403) {
        toast.error(t('refusedRole', { role: role ?? '' }));
        return;
      }
      if (!res.ok) {
        toast.error(t('loadFailed'));
        return;
      }
      toast.success(t('deleted'));
      await load();
    } finally {
      setBusy(null);
    }
  };

  const samples = async (action: 'load' | 'clear') => {
    if (!workspaceId) return;
    setBusy('samples');
    try {
      const res =
        action === 'load'
          ? await fetch('/api/documents/samples', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ workspaceId }),
            })
          : await fetch(
              `/api/documents/samples?workspaceId=${encodeURIComponent(workspaceId)}`,
              { method: 'DELETE' }
            );
      const data = await res.json();
      if (res.status === 403) {
        toast.error(t('refusedRole', { role: role ?? '' }));
        return;
      }
      if (!res.ok) {
        toast.error(data.error ?? t('loadFailed'));
        return;
      }
      if (action === 'load') {
        toast.success(
          data.alreadySeeded
            ? t('samplesAlready')
            : t('samplesLoaded', { count: data.inserted })
        );
      } else {
        toast.success(t('samplesCleared', { count: data.removed }));
      }
      await load();
    } finally {
      setBusy(null);
    }
  };

  const sampleCount = items.filter((d) => d.isSample).length;
  const quota = quotaCtx.quotas?.[QUOTA_SLUG];
  const quotaExhausted = !!quota && quota.available <= 0;
  const creditsExhausted =
    !!creditCtx.balance && (creditCtx.balance.available ?? 0) <= 0;

  return (
    <div className="space-y-6">
      {/* Notices the platform's gates decide on, not this app. */}
      <WhenQuotaExhausted slug={QUOTA_SLUG}>
        <Notice icon={Gauge} tone="warn">
          {t('quotaExhausted')}
        </Notice>
      </WhenQuotaExhausted>
      <WhenQuotaThreshold slug={QUOTA_SLUG} threshold={80}>
        {!quotaExhausted && (
          <Notice icon={AlertTriangle} tone="info">
            {t('quotaWarning')}
          </Notice>
        )}
      </WhenQuotaThreshold>
      <WhenCreditsExhausted>
        <Notice icon={Coins} tone="warn">
          {t('creditsExhausted')}
        </Notice>
      </WhenCreditsExhausted>
      <WhenCreditsLow threshold={5}>
        {!creditsExhausted && (
          <Notice icon={Coins} tone="info">
            {t('creditsLow')}
          </Notice>
        )}
      </WhenCreditsLow>
      {!writer && role && (
        <Notice icon={Lock} tone="info">
          {t('viewerNotice', { role })}
        </Notice>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* List */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[200px] flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t('search')}
                className="pl-8"
                aria-label={t('search')}
              />
            </div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Status | '')}
              className="border-input bg-background h-9 rounded-md border px-2 text-sm"
              aria-label={t('statusLabel')}
            >
              <option value="">{t('allStatuses')}</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {t(`statuses.${s}`)}
                </option>
              ))}
            </select>
            {stats && stats.tags.length > 0 && (
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="border-input bg-background h-9 rounded-md border px-2 text-sm"
                aria-label={t('allTags')}
              >
                <option value="">{t('allTags')}</option>
                {stats.tags.map(({ tag: name, count }) => (
                  <option key={name} value={name}>
                    {name} ({count})
                  </option>
                ))}
              </select>
            )}
          </div>

          {stats && (
            <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-xs tabular-nums">
              <span>{t('total', { count: stats.total })}</span>
              {STATUSES.map((s) => (
                <span key={s}>
                  {t(`statuses.${s}`)}: {stats.byStatus[s] ?? 0}
                </span>
              ))}
            </div>
          )}

          {loading && items.length === 0 ? (
            <div className="space-y-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-muted h-16 animate-pulse rounded-lg"
                />
              ))}
            </div>
          ) : items.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
                <FileText className="text-muted-foreground h-8 w-8" />
                <p className="text-muted-foreground text-sm">{t('empty')}</p>
                {writer && (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={busy === 'samples'}
                    onClick={() => samples('load')}
                  >
                    <Database className="mr-1 h-4 w-4" /> {t('loadSamples')}
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <ul className="divide-y rounded-lg border">
              {items.map((doc) => (
                <li
                  key={doc.id}
                  className={cn(
                    'flex flex-col gap-2 p-3 sm:flex-row sm:items-start',
                    busy === doc.id && 'opacity-60'
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="truncate text-sm font-medium">
                        {doc.title}
                      </span>
                      {doc.isSample && (
                        <Badge variant="outline" className="text-[10px]">
                          {t('sample')}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
                      {doc.excerpt}
                    </p>
                    <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="tabular-nums">
                        {t('words', { count: doc.wordCount })}
                      </span>
                      {doc.tags.map((tg) => (
                        <button
                          key={tg}
                          type="button"
                          onClick={() => setTag(tg)}
                          className="hover:text-foreground bg-muted rounded px-1.5 py-0.5"
                        >
                          #{tg}
                        </button>
                      ))}
                      {doc.createdByName && <span>{doc.createdByName}</span>}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {writer ? (
                      <select
                        value={doc.status}
                        onChange={(e) =>
                          setDocStatus(doc, e.target.value as Status)
                        }
                        disabled={busy === doc.id}
                        className={cn(
                          'h-7 rounded-full border-0 px-2 text-xs',
                          STATUS_STYLE[doc.status]
                        )}
                        aria-label={t('statusLabel')}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {t(`statuses.${s}`)}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-xs',
                          STATUS_STYLE[doc.status]
                        )}
                      >
                        {t(`statuses.${doc.status}`)}
                      </span>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      disabled={!writer || busy === doc.id}
                      title={
                        writer
                          ? t('delete')
                          : t('viewerNotice', { role: role ?? '' })
                      }
                      aria-label={t('delete')}
                      onClick={() => remove(doc)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {writer && (
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={busy === 'samples'}
                onClick={() => samples('load')}
              >
                <Database className="mr-1 h-4 w-4" /> {t('loadSamples')}
              </Button>
              {sampleCount > 0 && (
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={busy === 'samples'}
                  onClick={() => samples('clear')}
                >
                  {t('clearSamples')}
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Create */}
        <Card className="h-fit">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Plus className="h-4 w-4" /> {t('newDocument')}
            </CardTitle>
            <CardDescription>{t('newDocumentHint')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={create} className="space-y-3">
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder={t('titleLabel')}
                aria-label={t('titleLabel')}
                required
                maxLength={200}
                disabled={!writer}
              />
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder={t('contentLabel')}
                aria-label={t('contentLabel')}
                rows={5}
                disabled={!writer}
                className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
              />
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({ ...form, status: e.target.value as Status })
                  }
                  disabled={!writer}
                  className="border-input bg-background h-9 rounded-md border px-2 text-sm"
                  aria-label={t('statusLabel')}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {t(`statuses.${s}`)}
                    </option>
                  ))}
                </select>
                <Input
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder={t('tagsLabel')}
                  aria-label={t('tagsLabel')}
                  disabled={!writer}
                />
              </div>
              <WhenQuotaExhausted
                slug={QUOTA_SLUG}
                fallbackComponent={
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={
                      !writer || busy === 'create' || !form.title.trim()
                    }
                  >
                    {busy === 'create' ? t('creating') : t('create')}
                  </Button>
                }
              >
                <Button type="submit" className="w-full" disabled>
                  <Lock className="mr-1 h-4 w-4" /> {t('quotaExhaustedShort')}
                </Button>
              </WhenQuotaExhausted>
            </form>

            {lastMetering && (
              <div className="bg-muted/50 mt-4 space-y-1 rounded-md p-3 text-xs">
                <p className="text-muted-foreground font-semibold tracking-wide uppercase">
                  {t('meteringTitle')}
                </p>
                <p className="flex items-center gap-1.5">
                  <Gauge className="h-3.5 w-3.5 shrink-0" />
                  {lastMetering.usage.recorded
                    ? t('meteringUsage', {
                        used: lastMetering.usage.used,
                        included: lastMetering.usage.included,
                      })
                    : t('meteringUsageSkipped')}
                </p>
                <p className="flex items-center gap-1.5">
                  <Coins className="h-3.5 w-3.5 shrink-0" />
                  {lastMetering.credits.consumed
                    ? t('meteringCredits', {
                        amount: lastMetering.credits.amount,
                        balance: lastMetering.credits.balanceAfter,
                      })
                    : t('meteringCreditsSkipped')}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Notice({
  icon: Icon,
  tone,
  children,
}: {
  icon: React.ElementType;
  tone: 'warn' | 'info';
  children: React.ReactNode;
}) {
  return (
    <div
      role="status"
      className={cn(
        'flex items-start gap-2 rounded-lg border px-3 py-2 text-sm',
        tone === 'warn'
          ? 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200'
          : 'bg-muted/50 text-muted-foreground'
      )}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{children}</span>
    </div>
  );
}
