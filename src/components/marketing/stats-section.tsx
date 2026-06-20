const STATS = [
  {
    value: '8',
    label: 'Languages in this demo',
    sublabel: 'switch with the header toggle',
  },
  {
    value: '6',
    label: 'Live SDK features',
    sublabel: 'each has a working demo page',
  },
  {
    value: '2',
    label: 'Notification channels',
    sublabel: 'browser push + email',
  },
  {
    value: '0',
    label: 'Lines of auth code',
    sublabel: 'the SDK handles it all',
  },
] as const;

export function StatsSection() {
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
