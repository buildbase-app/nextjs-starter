import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';

interface SiteFooterProps {
  title: string;
}

export async function SiteFooter({ title }: SiteFooterProps) {
  const t = await getTranslations('common');
  const year = new Date().getFullYear();

  const footerLinks = [
    {
      section: t('footer.sections.product'),
      links: [
        { label: t('footer.links.features'), href: '/#features' },
        { label: t('footer.links.pricing'), href: '/pricing' },
        { label: t('footer.links.dashboard'), href: '/dashboard' },
        { label: t('footer.links.credits'), href: '/dashboard/credits' },
      ],
    },
    {
      section: t('footer.sections.resources'),
      links: [
        { label: t('footer.links.blog'), href: '/blog' },
        { label: t('footer.links.changelog'), href: '/changelog' },
        { label: t('footer.links.about'), href: '/about' },
      ],
    },
    {
      section: t('footer.sections.legal'),
      links: [
        { label: t('footer.links.privacy'), href: '/privacy' },
        { label: t('footer.links.terms'), href: '/terms' },
      ],
    },
  ];

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
              {t('footer.tagline')}
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map(({ section, links }) => (
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
            © {year} {title}. {t('footer.rights')}.
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
