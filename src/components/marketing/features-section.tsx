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
  type LucideIcon,
} from 'lucide-react';
import { Link } from '@/i18n/routing';

interface Feature {
  icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
  tryHref: string;
  tryLabel: string;
}

const FEATURES: Feature[] = [
  {
    icon: ShieldCheck,
    badge: 'Auth',
    title: 'OAuth sign-in, out of the box',
    description:
      'The Sign In button above uses the BuildBase SDK — one hook, no session logic to write. After signing in you get a JWT, workspace token, and role automatically.',
    tryHref: '#',
    tryLabel: 'Sign in to try it',
  },
  {
    icon: Building2,
    badge: 'Workspaces',
    title: 'Multi-tenant workspace switcher',
    description:
      'Every user can belong to multiple workspaces with different roles. The dashboard sidebar shows your current workspace and lets you switch between them.',
    tryHref: '/dashboard',
    tryLabel: 'Open dashboard',
  },
  {
    icon: Coins,
    badge: 'Credits',
    title: 'Live credit balance & consumption',
    description:
      "The credits page shows your live balance, lets you buy more via a built-in modal, and has test buttons that call the SDK's consumeCredits() in real time.",
    tryHref: '/dashboard/credits',
    tryLabel: 'Try credit consumption',
  },
  {
    icon: Bell,
    badge: 'Notifications',
    title: 'Browser push & email delivery',
    description:
      'The notifications page lets you subscribe your browser, compose a notification with title, urgency, action buttons, and scheduled delivery — then send it live.',
    tryHref: '/dashboard/notifications',
    tryLabel: 'Send a test notification',
  },
  {
    icon: Globe,
    badge: 'i18n',
    title: '8 languages including Arabic RTL',
    description:
      'Use the language switcher in the header to switch between English, Hindi, Spanish, French, German, Japanese, Chinese, and Arabic — the layout flips to RTL automatically.',
    tryHref: '/ar',
    tryLabel: 'Switch to Arabic',
  },
  {
    icon: FileText,
    badge: 'Content',
    title: 'MDX blog & changelog, built in',
    description:
      'The blog and changelog are MDX files compiled at build time via Contentlayer2. No CMS, no database — just files with type-safe frontmatter, full-text search, and RSS.',
    tryHref: '/blog',
    tryLabel: 'Read the blog',
  },
  {
    icon: Gauge,
    badge: 'Quotas',
    title: 'Quota usage with overage gates',
    description:
      'The usage page calls useAllQuotaUsage() to show per-quota progress bars. WhenQuotaExhausted blocks UI when a quota hits zero; WhenQuotaOverage shows overage details.',
    tryHref: '/dashboard/usage',
    tryLabel: 'View quota usage',
  },
  {
    icon: Lock,
    badge: 'Permissions',
    title: 'Role-based permission matrix',
    description:
      'The permissions page uses usePermissions() and WhenPermission to show every platform permission as granted or denied based on your current workspace role in real time.',
    tryHref: '/dashboard/permissions',
    tryLabel: 'Check your permissions',
  },
  {
    icon: Radio,
    badge: 'Events',
    title: 'Live SDK event stream',
    description:
      'The events page wires up eventEmitter.setCallbacks() to capture all SDK events as they fire — workspace changes, user updates, role changes — in a live scrolling log.',
    tryHref: '/dashboard/events',
    tryLabel: 'Open event log',
  },
  {
    icon: UserCircle,
    badge: 'User data',
    title: 'User attributes & feature flags',
    description:
      'The profile page reads useUserAttributes() and useUserFeatures() to show custom key-value pairs and per-user feature flag states, and lets you write new attributes live.',
    tryHref: '/dashboard/profile',
    tryLabel: 'View your profile',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="w-full max-w-6xl px-6 py-20">
      {/* Section header */}
      <div className="mb-16 text-center">
        <p className="text-primary mb-3 font-mono text-xs font-medium tracking-widest uppercase">
          Explore the demo
        </p>
        <h2 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
          See what&apos;s working in this app
        </h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
          Each capability below is live — sign in and click through to see the
          BuildBase SDK in action, not just in writing.
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => {
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
