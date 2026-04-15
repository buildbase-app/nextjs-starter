import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      home: 'Home',
      dashboard: 'Dashboard',
      documents: 'Documents',
      analytics: 'Analytics',
      team: 'Team',
      notifications: 'Notifications',
      settings: 'Settings',
      menu: 'Menu',
      selectWorkspace: 'Select workspace',
      profile: 'Profile',
      manageWorkspace: 'Manage Workspace',
      generalSettings: 'General Settings',
      userManagement: 'User Management',
      billingPayments: 'Billing & Payments',
    },
    buttons: {
      signIn: 'Sign In',
      signOut: 'Sign Out',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      loading: 'Loading...',
    },
    auth: {
      signInPrompt: 'Please sign in to continue',
      signOutConfirm: 'Are you sure you want to sign out?',
    },
    footer: {
      rights: 'All rights reserved',
    },
    language: {
      select: 'Select Language',
      current: 'Current language',
    },
    accessibility: {
      skipToContent: 'Skip to content',
    },
    theme: {
      toggle: 'Toggle theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
    },
    redirecting: 'Redirecting...',
  },
  home: {
    title: 'My App',
    hero: {
      heading: 'Welcome to My App',
      description:
        'Built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, next-themes, and BuildBase SDK.',
    },
    meta: {
      title: 'My App',
      description: 'My Next.js application with shadcn/ui and theme support',
      tagline: 'Build something amazing',
    },
  },
  dashboard: {
    title: 'Dashboard',
    welcome: 'Welcome back, {name}!',
    cards: {
      workspace: {
        title: 'Current Workspace',
        empty: 'No workspace selected',
      },
      role: {
        title: 'Your Role',
        empty: 'N/A',
      },
      email: {
        title: 'Email',
      },
      status: {
        title: 'Status',
        active: 'Active',
        inactive: 'Inactive',
      },
    },
    quickActions: {
      title: 'Quick Actions',
      createProject: 'Create Project',
      viewReports: 'View Reports',
      inviteTeam: 'Invite Team Member',
    },
    pages: {
      documents: {
        title: 'Documents',
        description: 'Manage your documents',
        placeholder: 'Documents content goes here.',
      },
      analytics: {
        title: 'Analytics',
        description: 'View your analytics',
        placeholder: 'Analytics content goes here.',
      },
      team: {
        title: 'Team',
        description: 'Manage your team',
        placeholder: 'Team management content goes here.',
      },
      settings: {
        title: 'Settings',
        description: 'Manage your settings',
        placeholder: 'Settings content goes here.',
      },
    },
  },
  pricing: {
    title: 'Pricing',
    subtitle: 'Choose the plan that fits your needs',
    billing: 'Billing',
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    yearly: 'Yearly',
    perMonth: '/mo',
    perQuarter: '/qtr',
    perYear: '/yr',
    currency: 'Currency',
    quotas: 'Quotas',
    limits: 'Limits',
    features: 'Features',
    included: 'Included',
    perUnit: 'after that',
    loading: 'Loading plans...',
    noPlans: 'No plans available',
    error: 'Failed to load pricing',
    meta: {
      title: 'Pricing',
      description: 'View our plans and pricing',
    },
  },
  errors: {
    generic: {
      title: 'Something went wrong',
      description:
        'An unexpected error occurred. Please try again or contact support if the problem persists.',
      tryAgain: 'Try again',
      goHome: 'Go to homepage',
    },
    notFound: {
      title: 'Page not found',
      description:
        "Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.",
      goBack: 'Go back',
    },
  },
};

export default messages;
