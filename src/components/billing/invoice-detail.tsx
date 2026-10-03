'use client';

import { useTranslations } from 'next-intl';
import { useInvoice } from '@buildbase/sdk/react';
import { ExternalLink, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Props {
  workspaceId: string | null | undefined;
  invoiceId: string | null;
  onClose: () => void;
}

function money(amount: number, currency: string) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function day(seconds: number | null) {
  return seconds ? new Date(seconds * 1000).toLocaleDateString() : '—';
}

/** One invoice, fetched on its own with `useInvoice(workspaceId, id)`. */
export function InvoiceDetail({ workspaceId, invoiceId, onClose }: Props) {
  const t = useTranslations('account.invoice');
  const { invoice, loading, error } = useInvoice(workspaceId, invoiceId);

  return (
    <Dialog open={!!invoiceId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t('title', { number: invoice?.number ?? invoiceId ?? '' })}
          </DialogTitle>
          <DialogDescription>
            <code className="text-xs">useInvoice(workspaceId, invoiceId)</code>
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <p className="text-muted-foreground text-sm">{t('loading')}</p>
        ) : error || !invoice ? (
          <p className="text-sm text-red-600">{error ?? t('missing')}</p>
        ) : (
          <div className="space-y-4">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-muted-foreground">{t('status')}</dt>
              <dd className="capitalize">{invoice.status}</dd>
              <dt className="text-muted-foreground">{t('amountDue')}</dt>
              <dd>{money(invoice.amount_due, invoice.currency)}</dd>
              <dt className="text-muted-foreground">{t('amountPaid')}</dt>
              <dd>{money(invoice.amount_paid, invoice.currency)}</dd>
              <dt className="text-muted-foreground">{t('created')}</dt>
              <dd>{day(invoice.created)}</dd>
              <dt className="text-muted-foreground">{t('due')}</dt>
              <dd>{day(invoice.due_date)}</dd>
              {invoice.description && (
                <>
                  <dt className="text-muted-foreground">{t('note')}</dt>
                  <dd>{invoice.description}</dd>
                </>
              )}
            </dl>
            <div className="flex gap-2">
              {invoice.hosted_invoice_url && (
                <Button asChild variant="outline" size="sm">
                  <a
                    href={invoice.hosted_invoice_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                    {t('open')}
                  </a>
                </Button>
              )}
              {invoice.invoice_pdf && (
                <Button asChild variant="outline" size="sm">
                  <a
                    href={invoice.invoice_pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="mr-1.5 h-3.5 w-3.5" />
                    {t('pdf')}
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
