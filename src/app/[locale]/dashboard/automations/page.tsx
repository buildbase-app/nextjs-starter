import { getTranslations } from 'next-intl/server';
import { ExternalLink, LayoutTemplate, Mail } from 'lucide-react';
import { InstancesCard } from '@/components/automations/instances-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { siteConfig } from '@/config/site';

/** Where to start a new workflow or email: the console's ready-made sets. */
const CONSOLE_STARTERS = [
  {
    key: 'workflowTemplates',
    icon: LayoutTemplate,
    path: '/dashboard/admin/workflows/templates',
  },
  {
    key: 'emailLibrary',
    icon: Mail,
    path: '/dashboard/admin/emails/templates',
  },
] as const;

export default async function AutomationsPage() {
  const t = await getTranslations('automations');
  const tc = await getTranslations('account.console');
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>
      <InstancesCard />
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{tc('title')}</CardTitle>
          <CardDescription>{tc('description')}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {CONSOLE_STARTERS.map(({ key, icon: Icon, path }) => (
            <a
              key={key}
              href={`${siteConfig.buildbase.console}${path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-muted/50 flex items-start gap-3 rounded-lg border p-3 transition-colors"
            >
              <Icon className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
              <span className="space-y-0.5">
                <span className="flex items-center gap-1 text-sm font-medium">
                  {tc(`${key}.title`)}
                  <ExternalLink className="h-3 w-3" />
                </span>
                <span className="text-muted-foreground block text-xs">
                  {tc(`${key}.description`)}
                </span>
              </span>
            </a>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
