import { getTranslations } from 'next-intl/server';
import { AudiencePanel } from '@/components/modules/audience-panel';

export default async function AudiencePage() {
  const t = await getTranslations('audience');
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>
      <AudiencePanel />
    </div>
  );
}
