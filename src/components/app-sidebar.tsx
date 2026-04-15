'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import {
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  BarChart3,
  Bell,
  LogOut,
  ChevronUp,
  CreditCard,
  User,
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
} from '@buildbase/sdk/react';
import { LanguageSwitcher } from './language-switcher';

type NavKey =
  | 'dashboard'
  | 'analytics'
  | 'documents'
  | 'team'
  | 'notifications'
  | 'settings';

const menuItems: {
  navKey: NavKey;
  url: string;
  icon: typeof LayoutDashboard;
}[] = [
  {
    navKey: 'dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    navKey: 'analytics',
    url: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    navKey: 'documents',
    url: '/dashboard/documents',
    icon: FileText,
  },
  {
    navKey: 'team',
    url: '/dashboard/team',
    icon: Users,
  },
  {
    navKey: 'notifications',
    url: '/dashboard/notifications',
    icon: Bell,
  },
  {
    navKey: 'settings',
    url: '/dashboard/settings',
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user, signOut, openWorkspaceSettings } = useSaaSAuth();
  const t = useTranslations('common');

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
    <Sidebar>
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
                  <div className="text-muted-foreground flex h-10 items-center rounded-md border px-3 text-sm">
                    {t('buttons.loading')}
                  </div>
                );
              }
              return (
                <div className="hover:bg-muted flex h-10 cursor-pointer items-center gap-2 rounded-md border px-3">
                  {currentWorkspace ? (
                    <>
                      {currentWorkspace.image ? (
                        <Image
                          src={currentWorkspace.image}
                          alt={currentWorkspace.name}
                          width={24}
                          height={24}
                          className="rounded"
                        />
                      ) : null}
                      <span className="truncate text-sm font-medium">
                        {currentWorkspace.name}
                      </span>
                    </>
                  ) : (
                    <span className="text-muted-foreground text-sm">
                      {t('nav.selectWorkspace')}
                    </span>
                  )}
                </div>
              );
            }}
          />
        </WhenAuthenticated>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('nav.menu')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const title = t(`nav.${item.navKey}`);
                return (
                  <SidebarMenuItem key={item.navKey}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      tooltip={title}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
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
