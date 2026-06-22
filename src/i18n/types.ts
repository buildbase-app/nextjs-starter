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
    usage: string;
    permissions: string;
    events: string;
    invoices: string;
    workspace: string;
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
    tagline: string;
    sections: {
      product: string;
      resources: string;
      legal: string;
    };
    links: {
      features: string;
      pricing: string;
      dashboard: string;
      credits: string;
      blog: string;
      changelog: string;
      about: string;
      privacy: string;
      terms: string;
    };
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
  welcome: string;
  trial: {
    endingSoon: string;
    endingSoonMsg: string;
    upgrade: string;
    freeTrial: string;
    daysRemaining: string;
    endsOn: string;
    active: string;
    viewPlans: string;
    trialBadge: string;
  };
  noSubscription: {
    title: string;
    hint: string;
    choosePlan: string;
  };
  subscription: {
    title: string;
    description: string;
    loading: string;
    status: string;
    activeSubscription: string;
    changePlan: string;
    noPlan: string;
    choosePlan: string;
  };
  subscriptionGates: {
    whenSubscription: {
      title: string;
      description: string;
      fallback: string;
      content: string;
    };
    whenSubscriptionToPlans: {
      title: string;
      description: string;
      fallback: string;
      content: string;
    };
  };
  seatStatus: {
    title: string;
    description: string;
    members: string;
    includedSeats: string;
    maxUsers: string;
    canInvite: string;
    yes: string;
    no: string;
    limitReached: string;
  };
  quickActionButtons: {
    inviteTeam: string;
    manageSubscription: string;
    workspaceSettings: string;
  };
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

export interface AnalyticsMessages {
  title: string;
  description: string;
  cards: {
    plan: string;
    teamMembers: string;
    quotasTracked: string;
    creditDebits: string;
    noSubscription: string;
    unlimitedSeats: string;
    maxSeats: string;
    totalConsumed: string;
    consumptionEvents: string;
  };
  quotaConsumption: {
    title: string;
    empty: string;
  };
  featureFlags: {
    title: string;
    empty: string;
  };
  planLimits: {
    title: string;
    empty: string;
    unlimited: string;
  };
  loading: string;
}

export interface TeamMessages {
  title: string;
  description: string;
  inviteMember: string;
  seatLimitReached: string;
  cards: {
    members: string;
    includedSeats: string;
    maxUsers: string;
    availableSeats: string;
  };
  memberList: {
    title: string;
    count: string;
    empty: string;
    roleFallback: string;
  };
  manage: {
    title: string;
    description: string;
    openSettings: string;
    permissions: string;
  };
}

export interface SettingsSectionItem {
  label: string;
  description: string;
}

export interface SettingsMessages {
  title: string;
  description: string;
  card: {
    title: string;
    description: string;
  };
  danger: {
    openButton: string;
  };
  sections: {
    profile: SettingsSectionItem;
    general: SettingsSectionItem;
    users: SettingsSectionItem;
    subscription: SettingsSectionItem;
    usage: SettingsSectionItem;
    credits: SettingsSectionItem;
    features: SettingsSectionItem;
    notifications: SettingsSectionItem;
    permissions: SettingsSectionItem;
    danger: SettingsSectionItem;
  };
}

export interface DocumentsFeatureSection {
  label: string;
  description: string;
  content: string;
  lockedMessage: string;
}

export interface DocumentsMessages {
  title: string;
  description: string;
  stats: {
    featureSections: string;
    featureSectionsSubtitle: string;
    enabled: string;
    enabledSubtitle: string;
    locked: string;
    lockedSubtitle: string;
  };
  features: {
    enabled: string;
    disabled: string;
  };
  allFeatures: {
    title: string;
    description: string;
    empty: string;
  };
  featureSections: {
    advancedExports: DocumentsFeatureSection;
    documentSharing: DocumentsFeatureSection;
    eSignatures: DocumentsFeatureSection;
  };
}

export interface EventsMessages {
  title: string;
  description: string;
  clearButton: string;
  listenCard: {
    title: string;
    description: string;
  };
  liveCard: {
    title: string;
    captured: string;
    empty: string;
  };
  eventLabels: {
    userCreated: string;
    userUpdated: string;
    workspaceChanged: string;
    workspaceUpdated: string;
    memberAdded: string;
    memberRemoved: string;
    roleChanged: string;
    workspaceCreated: string;
    workspaceDeleted: string;
  };
}

export interface InvoicesMessages {
  title: string;
  description: string;
  refresh: string;
  billingPortal: string;
  billingPortalOpening: string;
  error: string;
  card: {
    title: string;
    found: string;
    empty: string;
  };
  table: {
    date: string;
    amount: string;
    status: string;
    description: string;
    links: string;
    view: string;
    pdf: string;
    loadMore: string;
  };
}

export interface NotificationsMessages {
  title: string;
  description: string;
  pushCard: {
    title: string;
    description: string;
    subscribed: string;
    notSubscribed: string;
    subscribe: string;
    unsubscribe: string;
  };
  sendCard: {
    title: string;
    description: string;
  };
  fields: {
    eventSlug: string;
    eventSlugHint: string;
    title: string;
    message: string;
    url: string;
    target: string;
    channel: string;
  };
  placeholders: {
    eventSlug: string;
    title: string;
    message: string;
    url: string;
  };
  buttons: {
    meOnly: string;
    allMembers: string;
    both: string;
    emailOnly: string;
    pushOnly: string;
    showAdvanced: string;
    hideAdvanced: string;
    send: string;
    sending: string;
    silent: string;
    requireInteraction: string;
    renotify: string;
    default: string;
  };
  advanced: {
    media: string;
    behavior: string;
    delivery: string;
    actions: string;
    iconUrl: string;
    imageUrl: string;
    badgeUrl: string;
    tag: string;
    tagHint: string;
    behaviorHint: string;
    urgency: string;
    ttl: string;
    schedule: string;
    action1: string;
    action2: string;
    actionTitlePlaceholder: string;
    actionKeyPlaceholder: string;
    iconUrlPlaceholder: string;
    imageUrlPlaceholder: string;
    badgeUrlPlaceholder: string;
    ttlPlaceholder: string;
  };
  context: {
    workspace: string;
    user: string;
    none: string;
  };
  resultCard: {
    title: string;
  };
  toast: {
    workspaceRequired: string;
    sent: string;
    notSent: string;
    pushEnabled: string;
    pushDisabled: string;
    pushFailed: string;
    networkError: string;
  };
}

export interface PermissionsMessages {
  title: string;
  description: string;
  cards: {
    role: string;
    owner: string;
    ownerYes: string;
    ownerNo: string;
    granted: string;
  };
  ownerAdmin: {
    title: string;
    notVisible: string;
    visible: string;
  };
  allMembers: {
    title: string;
    notMember: string;
    visible: string;
  };
  matrix: {
    title: string;
    description: string;
    denied: string;
    grantedStatus: string;
  };
}

export interface ProfileMessages {
  title: string;
  description: string;
  identity: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    role: string;
    id: string;
  };
  workspaceFeatures: {
    title: string;
    enabled: string;
    disabled: string;
  };
  attributes: {
    title: string;
    description: string;
    empty: string;
    setTitle: string;
    keyPlaceholder: string;
    valuePlaceholder: string;
    saving: string;
    save: string;
    saved: string;
    failed: string;
  };
  userFeatures: {
    title: string;
    description: string;
    empty: string;
    loading: string;
    enabled: string;
    disabled: string;
  };
}

export interface UsageMessages {
  title: string;
  description: string;
  loading: string;
  error: string;
  empty: string;
  quotaCard: {
    remaining: string;
    unlimited: string;
    exhausted: string;
    overage: string;
    threshold: string;
    overageMsg: string;
    exhaustedMsg: string;
    used: string;
    overageAllowed: string;
  };
  record: {
    title: string;
    description: string;
    slugPlaceholder: string;
    qtyPlaceholder: string;
    recording: string;
    record: string;
    success: string;
    failed: string;
  };
  logs: {
    title: string;
    description: string;
    loading: string;
    empty: string;
    table: {
      quota: string;
      quantity: string;
      source: string;
      date: string;
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
  packages: {
    title: string;
    loading: string;
    error: string;
    empty: string;
    credits: string;
    validFor: string;
    buyNow: string;
  };
  testConsume: {
    title: string;
    description: string;
    use: string;
    apiDescription: string;
    success: string;
    insufficient: string;
  };
  lowCredits: {
    title: string;
    description: string;
  };
  expiring: {
    title: string;
    description: string;
    expiresIn: string;
    noExpiring: string;
    days: string;
    loading: string;
  };
  transactions: {
    title: string;
    description: string;
    empty: string;
    loading: string;
    columns: {
      type: string;
      amount: string;
      balance: string;
      description: string;
    };
    types: {
      credit: string;
      debit: string;
    };
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

export interface BlogMessages {
  label: string;
  heading: string;
  description: string;
  noPosts: string;
  noPostsTag: string;
  noPostsCategory: string;
  noPostsAuthor: string;
  postsByAuthor: string;
  postsTaggedCount: string;
  postsInCategoryCount: string;
  readMore: string;
  read: string;
  allPosts: string;
  previous: string;
  next: string;
  pageOf: string;
  relatedPosts: string;
  share: string;
  rssLabel: string;
  search: {
    trigger: string;
    placeholder: string;
    searching: string;
    noResults: string;
    startTyping: string;
  };
  meta: {
    title: string;
    titlePage: string;
    description: string;
    tagTitle: string;
    tagDescription: string;
    categoryTitle: string;
    categoryDescription: string;
  };
}

export interface ChangelogMessages {
  label: string;
  heading: string;
  description: string;
  rssLabel: string;
  permalink: string;
  meta: {
    title: string;
    description: string;
  };
}

export interface CookieConsentMessages {
  title: string;
  descriptionBefore: string;
  policyLinkPrivacy: string;
  policyLinkCookie: string;
  dismissAriaLabel: string;
  necessary: {
    title: string;
    description: string;
  };
  analytics: {
    title: string;
    description: string;
  };
  marketing: {
    title: string;
    description: string;
  };
  acceptAll: string;
  rejectAll: string;
  savePreferences: string;
  customize: string;
}

// Combined messages type
export interface Messages {
  common: CommonMessages;
  home: HomeMessages;
  dashboard: DashboardMessages;
  analytics: AnalyticsMessages;
  team: TeamMessages;
  settings: SettingsMessages;
  documents: DocumentsMessages;
  events: EventsMessages;
  invoices: InvoicesMessages;
  notifications: NotificationsMessages;
  permissions: PermissionsMessages;
  profile: ProfileMessages;
  usage: UsageMessages;
  credits: CreditsMessages;
  creditStore: CreditStoreMessages;
  pricing: PricingMessages;
  errors: ErrorMessages;
  cookieConsent: CookieConsentMessages;
  blog: BlogMessages;
  changelog: ChangelogMessages;
}

// For next-intl type inference
declare module 'next-intl' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}
