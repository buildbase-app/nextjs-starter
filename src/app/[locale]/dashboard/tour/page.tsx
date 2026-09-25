import { getTranslations } from 'next-intl/server';
import { TourList } from '@/components/tour/tour-list';
import { CloneCard } from '@/components/tour/clone-card';
import { TOUR_TASKS } from '@/tour/catalog';

export default async function TourPage({
  searchParams,
}: {
  searchParams: Promise<{ task?: string }>;
}) {
  const t = await getTranslations('tour');
  const { task } = await searchParams;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('subtitle', { total: TOUR_TASKS.length })}
        </p>
      </div>
      <CloneCard />
      <TourList initialOpen={task} />
    </div>
  );
}
