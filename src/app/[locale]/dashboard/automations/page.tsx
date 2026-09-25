import { getTranslations } from 'next-intl/server';
import { InstancesCard } from '@/components/automations/instances-card';

export default async function AutomationsPage() {
  const t = await getTranslations('automations');
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>
      <InstancesCard />
    </div>
  );
}
