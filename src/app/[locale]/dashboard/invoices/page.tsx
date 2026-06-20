'use client';

import {
  useInvoices,
  useBillingPortal,
  useSaaSWorkspaces,
} from '@buildbase/sdk/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, CreditCard, RefreshCw } from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  paid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  open: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  void: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  uncollectible: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  draft: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
};

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amount / 100);
}

export default function InvoicesPage() {
  const { currentWorkspace } = useSaaSWorkspaces();
  const { invoices, hasMore, loading, error, refetch } = useInvoices(
    currentWorkspace?._id
  );
  const { openBillingPortal, loading: portalLoading } = useBillingPortal(
    currentWorkspace?._id
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">
            Billing history via <code className="text-xs">useInvoices()</code> ·{' '}
            <code className="text-xs">useBillingPortal()</code>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refetch}
            disabled={loading}
          >
            <RefreshCw
              className={`mr-1.5 h-4 w-4 ${loading ? 'animate-spin' : ''}`}
            />
            Refresh
          </Button>
          <Button
            size="sm"
            onClick={() => openBillingPortal(window.location.href)}
            disabled={portalLoading}
          >
            <CreditCard className="mr-1.5 h-4 w-4" />
            {portalLoading ? 'Opening…' : 'Billing portal'}
          </Button>
        </div>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <CardContent className="pt-6">
            <p className="text-sm text-red-700 dark:text-red-300">
              Failed to load invoices.
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <FileText className="h-5 w-5" />
          <div>
            <CardTitle className="text-base">Invoice history</CardTitle>
            <CardDescription>
              {loading
                ? 'Loading…'
                : `${invoices.length} invoice${invoices.length !== 1 ? 's' : ''} found`}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground text-sm">Loading invoices…</p>
          ) : invoices.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              No invoices yet. Invoices appear here after you subscribe to a
              paid plan.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="pb-2 text-left font-medium">Date</th>
                    <th className="pb-2 text-left font-medium">Amount</th>
                    <th className="pb-2 text-left font-medium">Status</th>
                    <th className="hidden pb-2 text-left font-medium md:table-cell">
                      Description
                    </th>
                    <th className="pb-2 text-right font-medium">Links</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="py-2">
                      <td className="py-2 text-xs">
                        {new Date(inv.created * 1000).toLocaleDateString()}
                      </td>
                      <td className="py-2 font-mono text-xs">
                        {formatCurrency(inv.amount_due, inv.currency)}
                      </td>
                      <td className="py-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[inv.status] ?? ''}`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="text-muted-foreground hidden py-2 text-xs md:table-cell">
                        {inv.description ?? '—'}
                      </td>
                      <td className="py-2 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {inv.hosted_invoice_url && (
                            <a
                              href={inv.hosted_invoice_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 inline-flex items-center gap-1 text-xs"
                            >
                              View
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                          {inv.invoice_pdf && (
                            <a
                              href={inv.invoice_pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 inline-flex items-center gap-1 text-xs"
                            >
                              PDF
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {hasMore && (
                <div className="pt-4 text-center">
                  <Button variant="outline" size="sm" onClick={refetch}>
                    Load more
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
