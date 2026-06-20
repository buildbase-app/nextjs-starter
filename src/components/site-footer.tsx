import { Link } from '@/i18n/routing';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Credits', href: '/dashboard/credits' },
  ],
  Resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Changelog', href: '/changelog' },
    { label: 'About', href: '/about' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
} as const;

interface SiteFooterProps {
  title: string;
}

export function SiteFooter({ title }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/50 bg-background w-full border-t">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-1 flex flex-col gap-4">
            <Link
              href="/"
              className="text-foreground text-xl font-bold tracking-tight"
            >
              {title}
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A live demo app showing the BuildBase SDK in action. Sign in to
              explore auth, workspaces, credits, push notifications, and i18n.
            </p>
          </div>

          {/* Link columns */}
          {(
            Object.entries(FOOTER_LINKS) as [
              string,
              readonly { label: string; href: string }[],
            ][]
          ).map(([section, links]) => (
            <div key={section} className="flex flex-col gap-3">
              <h3 className="text-foreground text-sm font-semibold">
                {section}
              </h3>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-border/50 mt-10 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-muted-foreground text-xs">
            © {year} {title}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
