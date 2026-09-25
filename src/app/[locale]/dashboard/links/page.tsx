import { getTranslations } from 'next-intl/server';
import { LinksPanel } from '@/components/modules/links-panel';

export default async function LinksPage() {
  const t = await getTranslations('links');
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>
      <LinksPanel />
    </div>
  );
}
