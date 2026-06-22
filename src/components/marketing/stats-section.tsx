import { getTranslations } from 'next-intl/server';

export async function StatsSection() {
  const t = await getTranslations('home');

  const STATS = [
    {
      value: '8',
      label: t('stats.languages.label'),
      sublabel: t('stats.languages.sublabel'),
    },
    {
      value: '13',
      label: t('stats.sdkFeatures.label'),
      sublabel: t('stats.sdkFeatures.sublabel'),
    },
    {
      value: '2',
      label: t('stats.notifications.label'),
      sublabel: t('stats.notifications.sublabel'),
    },
    {
      value: '0',
      label: t('stats.authCode.label'),
      sublabel: t('stats.authCode.sublabel'),
    },
  ];

  return (
    <section className="border-border/50 w-full border-y">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y md:grid-cols-4 md:divide-y-0">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1 px-8 py-10 text-center"
          >
            <span className="text-primary text-3xl font-bold tracking-tight md:text-4xl">
              {stat.value}
            </span>
            <span className="text-foreground text-sm font-semibold">
              {stat.label}
            </span>
            <span className="text-muted-foreground text-xs">
              {stat.sublabel}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
