import { AlertTriangle, Info, CheckCircle2, Flame } from 'lucide-react';

type CalloutKind = 'info' | 'success' | 'warning' | 'danger';

interface CalloutProps {
  kind?: CalloutKind;
  title?: string;
  children: React.ReactNode;
}

const KIND_CONFIG: Record<
  CalloutKind,
  { icon: React.ComponentType<{ className?: string }>; tone: string }
> = {
  info: { icon: Info, tone: 'text-primary' },
  success: { icon: CheckCircle2, tone: 'text-green-600' },
  warning: { icon: AlertTriangle, tone: 'text-yellow-600' },
  danger: { icon: Flame, tone: 'text-destructive' },
};

export function Callout({ kind = 'info', title, children }: CalloutProps) {
  const { icon: Icon, tone } = KIND_CONFIG[kind];

  return (
    <aside className="border-border bg-muted my-6 flex gap-4 rounded-md border p-5">
      <Icon className={`${tone} mt-0.5 size-5 shrink-0`} />
      <div className="flex flex-col gap-1">
        {title ? (
          <p className="text-foreground text-sm font-medium">{title}</p>
        ) : null}
        <div className="text-muted-foreground text-sm leading-relaxed [&>p]:m-0">
          {children}
        </div>
      </div>
    </aside>
  );
}
