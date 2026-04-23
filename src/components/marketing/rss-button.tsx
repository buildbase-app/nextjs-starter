import { Rss } from 'lucide-react';

interface RssButtonProps {
  href: string;
  label?: string;
}

export function RssButton({ href, label = 'RSS Feed' }: RssButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors"
      aria-label={label}
    >
      <Rss className="size-4" />
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}
