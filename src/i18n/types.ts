// Type-safe translation keys
// When you add a new key in English, TypeScript will show errors for missing keys in other languages

export interface CommonMessages {
  nav: {
    home: string;
    dashboard: string;
    documents: string;
    analytics: string;
    team: string;
    notifications: string;
    settings: string;
    menu: string;
    selectWorkspace: string;
    profile: string;
    manageWorkspace: string;
    generalSettings: string;
    userManagement: string;
    billingPayments: string;
    credits: string;
    creditUsage: string;
    creditsAvailable: string;
  };
  buttons: {
    signIn: string;
    signOut: string;
    submit: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    create: string;
    loading: string;
  };
  auth: {
    signInPrompt: string;
    signOutConfirm: string;
  };
  footer: {
    rights: string;
  };
  language: {
    select: string;
    current: string;
  };
  accessibility: {
    skipToContent: string;
  };
  theme: {
    toggle: string;
    light: string;
    dark: string;
    system: string;
  };
  redirecting: string;
}

export interface HomeMessages {
  title: string;
  hero: {
    heading: string;
    description: string;
  };
  meta: {
    title: string;
    description: string;
    tagline: string;
  };
}

export interface DashboardMessages {
  title: string;
  welcome: string; // Supports {name} placeholder
  cards: {
    workspace: {
      title: string;
      empty: string;
    };
    role: {
      title: string;
      empty: string;
    };
    email: {
      title: string;
    };
    status: {
      title: string;
      active: string;
      inactive: string;
    };
  };
  quickActions: {
    title: string;
    createProject: string;
    viewReports: string;
    inviteTeam: string;
  };
  pages: {
    documents: {
      title: string;
      description: string;
      placeholder: string;
    };
    analytics: {
      title: string;
      description: string;
      placeholder: string;
    };
    team: {
      title: string;
      description: string;
      placeholder: string;
    };
    settings: {
      title: string;
      description: string;
      placeholder: string;
    };
  };
}

export interface PricingMessages {
  title: string;
  subtitle: string;
  billing: string;
  monthly: string;
  quarterly: string;
  yearly: string;
  perMonth: string;
  perQuarter: string;
  perYear: string;
  currency: string;
  quotas: string;
  limits: string;
  credits: string;
  creditsPerPeriod: string;
  features: string;
  included: string;
  perUnit: string;
  loading: string;
  noPlans: string;
  error: string;
  meta: {
    title: string;
    description: string;
  };
}

export interface ErrorMessages {
  generic: {
    title: string;
    description: string;
    tryAgain: string;
    goHome: string;
  };
  notFound: {
    title: string;
    description: string;
    goBack: string;
  };
}

export interface CreditsMessages {
  title: string;
  description: string;
  balance: string;
  creditsAvailable: string;
  manageCredits: string;
  buyCredits: string;
  choosePlan: string;
  noCredits: string;
  buyMore: string;
  testConsume: {
    title: string;
    description: string;
    use: string;
    apiDescription: string;
    success: string;
    insufficient: string;
  };
}

export interface CreditStoreMessages {
  title: string;
  subtitle: string;
  buy: string;
  validFor: string;
  noExpiry: string;
  noPackages: string;
  error: string;
}

// Combined messages type
export interface Messages {
  common: CommonMessages;
  home: HomeMessages;
  dashboard: DashboardMessages;
  credits: CreditsMessages;
  creditStore: CreditStoreMessages;
  pricing: PricingMessages;
  errors: ErrorMessages;
}

// For next-intl type inference
declare module 'next-intl' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}
