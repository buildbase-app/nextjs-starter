'use client';

import Image from 'next/image';
import { useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import {
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  Bell,
  LogOut,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  CreditCard,
  Coins,
  User,
  Gauge,
  Lock,
  Radio,
  UserCircle,
  Receipt,
  Building2,
  ListChecks,
  ClipboardList,
  Database,
  Image as ImageIcon,
  Link2,
  Contact,
  Activity,
  Workflow,
  PieChart,
  Inbox,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  useSaaSAuth,
  WorkspaceSwitcher,
  WhenAuthenticated,
  CreditBalance,
} from '@buildbase/sdk/react';
import { LanguageSwitcher } from './language-switcher';

type NavKey =
  | 'dashboard'
  | 'tour'
  | 'inbox'
  | 'documents'
  | 'credits'
  | 'invoices'
  | 'usage'
  | 'permissions'
  | 'events'
  | 'profile'
  | 'team'
  | 'notifications'
  | 'settings';

type ModuleNavKey =
  | 'forms'
  | 'collections'
  | 'assets'
  | 'links'
  | 'audience'
  | 'tracking'
  | 'automations'
  | 'reports';

type NavItem = {
  navKey: NavKey | ModuleNavKey;
  url: string;
  icon: typeof LayoutDashboard;
};

type SectionKey = 'start' | 'product' | 'billing' | 'platform';

/**
 * The menu in the tour's order: where you start, the product, billing,
 * then the platform plumbing. Modules - the org-API pages - sit in their
 * own collapsible section below.
 */
const sections: { key: SectionKey; items: NavItem[] }[] = [
  {
    key: 'start',
    items: [
      { navKey: 'dashboard', url: '/dashboard', icon: LayoutDashboard },
      { navKey: 'tour', url: '/dashboard/tour', icon: ListChecks },
      { navKey: 'inbox', url: '/dashboard/inbox', icon: Inbox },
    ],
  },
  {
    key: 'product',
    items: [
      { navKey: 'documents', url: '/dashboard/documents', icon: FileText },
      { navKey: 'team', url: '/dashboard/team', icon: Users },
      { navKey: 'profile', url: '/dashboard/profile', icon: UserCircle },
    ],
  },
  {
    key: 'billing',
    items: [
      { navKey: 'credits', url: '/dashboard/credits', icon: Coins },
      { navKey: 'invoices', url: '/dashboard/invoices', icon: Receipt },
      { navKey: 'usage', url: '/dashboard/usage', icon: Gauge },
    ],
  },
  {
    key: 'platform',
    items: [
      { navKey: 'permissions', url: '/dashboard/permissions', icon: Lock },
      { navKey: 'events', url: '/dashboard/events', icon: Radio },
      { navKey: 'notifications', url: '/dashboard/notifications', icon: Bell },
      { navKey: 'settings', url: '/dashboard/settings', icon: Settings },
    ],
  },
];

/** The platform modules the SDK does not wrap, read through the org API. */
const moduleItems: NavItem[] = [
  { navKey: 'forms', url: '/dashboard/forms', icon: ClipboardList },
  { navKey: 'collections', url: '/dashboard/collections', icon: Database },
  { navKey: 'assets', url: '/dashboard/assets', icon: ImageIcon },
  { navKey: 'links', url: '/dashboard/links', icon: Link2 },
  { navKey: 'audience', url: '/dashboard/audience', icon: Contact },
  { navKey: 'tracking', url: '/dashboard/tracking', icon: Activity },
  { navKey: 'automations', url: '/dashboard/automations', icon: Workflow },
  { navKey: 'reports', url: '/dashboard/reports', icon: PieChart },
];

const MODULES_OPEN_KEY = 'sidebar-modules-open';
const MODULES_EVENT = 'sidebar-modules-open';

/** Whether the visitor left Modules open; null when never chosen or blocked. */
function readModulesOpen(): boolean | null {
  try {
    const v = localStorage.getItem(MODULES_OPEN_KEY);
    return v === null ? null : v === '1';
  } catch {
    return null;
  }
}

function writeModulesOpen(open: boolean) {
  try {
    localStorage.setItem(MODULES_OPEN_KEY, open ? '1' : '0');
  } catch {
    /* not remembered */
  }
  window.dispatchEvent(new Event(MODULES_EVENT));
}

function subscribeModulesOpen(onChange: () => void) {
  window.addEventListener(MODULES_EVENT, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(MODULES_EVENT, onChange);
    window.removeEventListener('storage', onChange);
  };
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const t = useTranslations('common');
  const title = t(`nav.${item.navKey}`);
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={active}
        tooltip={title}
        className="h-7"
      >
        <Link href={item.url}>
          <item.icon />
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar({ side = 'left' }: { side?: 'left' | 'right' }) {
  const pathname = usePathname();
  const { user, signOut, openWorkspaceSettings } = useSaaSAuth();
  const t = useTranslations('common');

  // As the visitor left it; until they choose, open only on a module page.
  const inModules = moduleItems.some((item) => item.url === pathname);
  const modulesStored = useSyncExternalStore(
    subscribeModulesOpen,
    readModulesOpen,
    () => null
  );
  const modulesOpen = modulesStored ?? inModules;
  const toggleModules = () => {
    writeModulesOpen(!modulesOpen);
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Sidebar side={side}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/" className="flex items-center gap-2 px-2 py-1">
              <span className="text-lg font-semibold">{t('nav.home')}</span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        <WhenAuthenticated>
          <WorkspaceSwitcher
            trigger={(isLoading, currentWorkspace) => {
              if (isLoading) {
                return (
                  <div className="bg-sidebar-accent text-muted-foreground flex h-10 animate-pulse items-center gap-2 rounded-md px-3 text-sm">
                    <div className="bg-muted h-6 w-6 rounded" />
                    <span className="flex-1">{t('buttons.loading')}</span>
                  </div>
                );
              }
              return (
                <div className="hover:bg-sidebar-accent group flex h-10 w-full cursor-pointer items-center gap-2 rounded-md px-3 transition-colors">
                  {currentWorkspace?.image ? (
                    <Image
                      src={currentWorkspace.image}
                      alt={currentWorkspace.name}
                      width={20}
                      height={20}
                      className="rounded"
                    />
                  ) : (
                    <div className="bg-primary/10 text-primary flex h-5 w-5 shrink-0 items-center justify-center rounded">
                      <Building2 className="h-3 w-3" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm leading-none font-semibold">
                      {currentWorkspace?.name ?? t('nav.selectWorkspace')}
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-xs leading-none">
                      {t('nav.workspace')}
                    </p>
                  </div>
                  <ChevronsUpDown className="text-muted-foreground h-4 w-4 shrink-0 opacity-60 group-hover:opacity-100" />
                </div>
              );
            }}
          />
        </WhenAuthenticated>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        {sections.map((section) => (
          <SidebarGroup key={section.key} className="py-0">
            <SidebarGroupLabel className="h-5">
              {t(`nav.sections.${section.key}`)}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0">
                {section.items.map((item) => (
                  <NavLink
                    key={item.navKey}
                    item={item}
                    active={pathname === item.url}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarGroup className="py-0">
          <SidebarGroupLabel asChild className="h-5">
            <button
              type="button"
              onClick={toggleModules}
              aria-expanded={modulesOpen}
              aria-controls="sidebar-modules"
              className="hover:text-sidebar-foreground flex w-full items-center justify-between"
            >
              <span>{t('nav.modules')}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${modulesOpen ? '' : '-rotate-90'}`}
              />
            </button>
          </SidebarGroupLabel>
          {modulesOpen && (
            <SidebarGroupContent id="sidebar-modules">
              <SidebarMenu className="gap-0">
                {moduleItems.map((item) => (
                  <NavLink
                    key={item.navKey}
                    item={item}
                    active={pathname === item.url}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <WhenAuthenticated>
          <CreditBalance>
            {({ balance, loading }) => {
              const available = balance?.available ?? 0;
              const granted = balance?.totalGranted ?? 0;
              const used = granted > 0 ? granted - available : 0;
              const percent =
                granted > 0 ? Math.round((used / granted) * 100) : 0;
              const isLow = granted > 0 && percent >= 80;
              const isExhausted = granted > 0 && available === 0;

              return (
                <Link
                  href="/dashboard/credits"
                  className="hover:bg-muted/50 block space-y-2 rounded-md border p-3 text-sm transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-foreground font-medium">
                      {t('nav.creditUsage')}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {loading ? '...' : `${percent}%`}
                    </span>
                  </div>
                  <div className="bg-muted h-2 w-full rounded-full">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isExhausted
                          ? 'bg-red-500'
                          : isLow
                            ? 'bg-amber-500'
                            : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(percent, 100)}%` }}
                    />
                  </div>
                  <div className="text-muted-foreground flex items-center justify-between text-xs">
                    <span>
                      {loading
                        ? '...'
                        : `${available.toLocaleString()} / ${granted.toLocaleString()}`}
                    </span>
                    <span>{t('nav.creditsAvailable')}</span>
                  </div>
                </Link>
              );
            }}
          </CreditBalance>
        </WhenAuthenticated>
        <SidebarMenu>
          <SidebarMenuItem>
            <LanguageSwitcher />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.image} alt={user?.name} />
                    <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user?.email}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="top"
                align="start"
                sideOffset={4}
              >
                <DropdownMenuItem
                  onClick={() => openWorkspaceSettings('profile')}
                >
                  <User className="mr-2 h-4 w-4" />
                  {t('nav.profile')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    {t('nav.manageWorkspace')}
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => openWorkspaceSettings('general')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    {t('nav.generalSettings')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => openWorkspaceSettings('users')}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    {t('nav.userManagement')}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => openWorkspaceSettings('subscription')}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    {t('nav.billingPayments')}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  {t('buttons.signOut')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
