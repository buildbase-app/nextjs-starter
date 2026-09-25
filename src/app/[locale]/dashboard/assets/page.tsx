import { getTranslations } from 'next-intl/server';
import { AssetsPanel } from '@/components/modules/assets-panel';

export default async function AssetsPage() {
  const t = await getTranslations('assets');
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>
      <AssetsPanel />
    </div>
  );
}
