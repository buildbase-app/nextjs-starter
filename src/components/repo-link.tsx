import { Github } from 'lucide-react';
import { siteConfig } from '@/config/site';

/** The GitHub repository this app is built from, as an icon button. */
export function RepoLink({ label }: { label: string }) {
  return (
    <a
      href={siteConfig.repo}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="text-muted-foreground hover:text-foreground hover:bg-accent inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors"
    >
      <Github className="h-4 w-4" />
    </a>
  );
}
