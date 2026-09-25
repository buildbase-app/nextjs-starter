import { getTranslations } from 'next-intl/server';
import { TrackingPanel } from '@/components/tracking/tracking-panel';

export default async function TrackingPage() {
  const t = await getTranslations('tracking');
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>
      <TrackingPanel />
    </div>
  );
}
