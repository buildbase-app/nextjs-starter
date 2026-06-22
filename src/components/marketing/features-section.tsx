import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Coins,
  Bell,
  Globe,
  FileText,
  Gauge,
  Lock,
  Radio,
  UserCircle,
  Receipt,
  Users,
  Flag,
  type LucideIcon,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

interface FeatureConfig {
  icon: LucideIcon;
  tryHref: string;
}

const FEATURE_CONFIGS: FeatureConfig[] = [
  { icon: ShieldCheck, tryHref: '#' },
  { icon: Building2, tryHref: '/dashboard' },
  { icon: Coins, tryHref: '/dashboard/credits' },
  { icon: Bell, tryHref: '/dashboard/notifications' },
  { icon: Globe, tryHref: '/ar' },
  { icon: FileText, tryHref: '/blog' },
  { icon: Gauge, tryHref: '/dashboard/usage' },
  { icon: Lock, tryHref: '/dashboard/permissions' },
  { icon: Radio, tryHref: '/dashboard/events' },
  { icon: UserCircle, tryHref: '/dashboard/profile' },
  { icon: Receipt, tryHref: '/dashboard/invoices' },
  { icon: Users, tryHref: '/dashboard' },
  { icon: Flag, tryHref: '/dashboard/profile' },
];

export async function FeaturesSection() {
  const t = await getTranslations('home');

  const features = [
    {
      ...FEATURE_CONFIGS[0],
      badge: t('features.auth.badge'),
      title: t('features.auth.title'),
      description: t('features.auth.description'),
      tryLabel: t('features.auth.tryLabel'),
    },
    {
      ...FEATURE_CONFIGS[1],
      badge: t('features.workspaces.badge'),
      title: t('features.workspaces.title'),
      description: t('features.workspaces.description'),
      tryLabel: t('features.workspaces.tryLabel'),
    },
    {
      ...FEATURE_CONFIGS[2],
      badge: t('features.credits.badge'),
      title: t('features.credits.title'),
      description: t('features.credits.description'),
      tryLabel: t('features.credits.tryLabel'),
    },
    {
      ...FEATURE_CONFIGS[3],
      badge: t('features.notifications.badge'),
      title: t('features.notifications.title'),
      description: t('features.notifications.description'),
      tryLabel: t('features.notifications.tryLabel'),
    },
    {
      ...FEATURE_CONFIGS[4],
      badge: t('features.i18n.badge'),
      title: t('features.i18n.title'),
      description: t('features.i18n.description'),
      tryLabel: t('features.i18n.tryLabel'),
    },
    {
      ...FEATURE_CONFIGS[5],
      badge: t('features.content.badge'),
      title: t('features.content.title'),
      description: t('features.content.description'),
      tryLabel: t('features.content.tryLabel'),
    },
    {
      ...FEATURE_CONFIGS[6],
      badge: t('features.quotas.badge'),
      title: t('features.quotas.title'),
      description: t('features.quotas.description'),
      tryLabel: t('features.quotas.tryLabel'),
    },
    {
      ...FEATURE_CONFIGS[7],
      badge: t('features.permissions.badge'),
      title: t('features.permissions.title'),
      description: t('features.permissions.description'),
      tryLabel: t('features.permissions.tryLabel'),
    },
    {
      ...FEATURE_CONFIGS[8],
      badge: t('features.events.badge'),
      title: t('features.events.title'),
      description: t('features.events.description'),
      tryLabel: t('features.events.tryLabel'),
    },
    {
      ...FEATURE_CONFIGS[9],
      badge: t('features.userData.badge'),
      title: t('features.userData.title'),
      description: t('features.userData.description'),
      tryLabel: t('features.userData.tryLabel'),
    },
    {
      ...FEATURE_CONFIGS[10],
      badge: t('features.invoices.badge'),
      title: t('features.invoices.title'),
      description: t('features.invoices.description'),
      tryLabel: t('features.invoices.tryLabel'),
    },
    {
      ...FEATURE_CONFIGS[11],
      badge: t('features.seats.badge'),
      title: t('features.seats.title'),
      description: t('features.seats.description'),
      tryLabel: t('features.seats.tryLabel'),
    },
    {
      ...FEATURE_CONFIGS[12],
      badge: t('features.featureFlags.badge'),
      title: t('features.featureFlags.title'),
      description: t('features.featureFlags.description'),
      tryLabel: t('features.featureFlags.tryLabel'),
    },
  ];

  return (
    <section id="features" className="w-full max-w-6xl px-6 py-20">
      {/* Section header */}
      <div className="mb-16 text-center">
        <p className="text-primary mb-3 font-mono text-xs font-medium tracking-widest uppercase">
          {t('features.eyebrow')}
        </p>
        <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
          {t('features.heading')}
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
          {t('features.description')}
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="border-border bg-card flex flex-col rounded-xl border p-6 transition-shadow hover:shadow-md"
            >
              <div className="bg-primary/10 mb-4 flex h-10 w-10 items-center justify-center rounded-lg">
                <Icon className="text-primary h-5 w-5" />
              </div>
              <span className="text-primary bg-primary/10 mb-2 inline-block w-fit rounded-full px-2 py-0.5 text-xs font-medium">
                {feature.badge}
              </span>
              <h3 className="text-foreground mb-2 text-lg font-semibold">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mb-4 flex-1 text-sm leading-relaxed">
                {feature.description}
              </p>
              <Link
                href={feature.tryHref}
                className="text-primary hover:text-primary/80 inline-flex items-center gap-1 text-sm font-medium transition-colors"
              >
                {feature.tryLabel}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
