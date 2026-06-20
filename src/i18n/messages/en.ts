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
      credits: 'Credits',
      creditUsage: 'Credit Usage',
      creditsAvailable: 'Available',
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
  creditStore: {
    title: 'Credit Packages',
    subtitle:
      'Purchase credits to unlock premium features like AI generation, exports, and more.',
    buy: 'Buy Credits',
    validFor: 'Valid for {days} days',
    noExpiry: 'Never expires',
    noPackages: 'No credit packages available at this time.',
    error: 'Failed to load credit packages',
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
    credits: 'AI Credits',
    creditsPerPeriod: 'credits / period',
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
  credits: {
    title: 'Credits',
    description:
      'Use credits for premium actions. Manage packages in workspace settings.',
    balance: 'Credit Balance',
    creditsAvailable: 'credits available',
    manageCredits: 'Manage Credits',
    buyCredits: 'Buy Credits',
    choosePlan: 'Choose Plan',
    noCredits:
      'You have no credits remaining. Purchase more to continue using premium features.',
    buyMore: 'Buy Credits',
    testConsume: {
      title: 'Test Credit Consumption',
      description:
        'Use these buttons to test consuming credits from your balance.',
      use: 'Use {amount}',
      apiDescription: 'Test: consume {amount} credits',
      success: 'Consumed {amount} credits. Balance: {balance}',
      insufficient:
        'Not enough credits. Available: {available}, Requested: {requested}',
    },
    lowCredits: {
      title: 'Running low on credits',
      description:
        'Your credit balance is low. Top up now to avoid interruption.',
    },
    expiring: {
      title: 'Expiring Credits',
      description: 'Credits expiring in the next 30 days',
      expiresIn: 'Expires {date}',
      noExpiring: 'No credits expiring soon',
      days: '{count} credits',
    },
    transactions: {
      title: 'Transaction History',
      description: 'Recent credit additions and deductions',
      empty: 'No transactions yet',
      columns: {
        type: 'Type',
        amount: 'Amount',
        balance: 'Balance after',
        description: 'Description',
      },
      types: {
        credit: 'Credit',
        debit: 'Debit',
      },
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
