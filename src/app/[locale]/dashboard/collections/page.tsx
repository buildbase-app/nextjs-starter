import { getTranslations } from 'next-intl/server';
import { ReleaseNotes } from '@/components/collections/release-notes';

export default async function CollectionsPage() {
  const t = await getTranslations('collections');
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>
      <ReleaseNotes />
    </div>
  );
}
