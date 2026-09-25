// Type-safe translation keys
// When you add a new key in English, TypeScript will show errors for missing keys in other languages

export interface CommonMessages {
  nav: {
    home: string;
    dashboard: string;
    documents: string;
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
    tour: string;
    inbox: string;
    modules: string;
    forms: string;
    collections: string;
    assets: string;
    links: string;
    audience: string;
    tracking: string;
    automations: string;
    reports: string;
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
      tour: string;
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
  pages: {
    lastUpdated: string;
  };
  redirecting: string;
}

export interface HomeFeature {
  badge: string;
  title: string;
  description: string;
  tryLabel: string;
}

export interface HomeMessages {
  title: string;
  hero: {
    badge: string;
    heading: string;
    description: string;
    signInToExplore: string;
    openDashboard: string;
    viewSource: string;
    builtWith: string;
  };
  stats: {
    languages: { label: string; sublabel: string };
    tasks: { label: string; sublabel: string };
    groups: { label: string; sublabel: string };
    authCode: { label: string; sublabel: string };
  };
  cta: {
    heading: string;
    description: string;
    signIn: string;
    openDashboard: string;
    howBuilt: string;
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
    changeRole: string;
  };
  invite: {
    title: string;
    description: string;
    noPermission: string;
    emailPlaceholder: string;
    role: string;
    send: string;
    sent: string;
    failed: string;
    resent: string;
    revoked: string;
    seatNote: string;
    pendingTitle: string;
    loading: string;
    none: string;
    invitedBy: string;
    pendingLabel: string;
    expires: string;
    cooldown: string;
    resend: string;
    revoke: string;
  };
  roleChanged: string;
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
  featureGates: { title: string; description: string };
  workbench: {
    title: string;
    description: string;
    search: string;
    allStatuses: string;
    allTags: string;
    newDocument: string;
    newDocumentHint: string;
    titleLabel: string;
    contentLabel: string;
    statusLabel: string;
    tagsLabel: string;
    create: string;
    creating: string;
    created: string;
    deleted: string;
    delete: string;
    loadSamples: string;
    clearSamples: string;
    samplesLoaded: string;
    samplesAlready: string;
    samplesCleared: string;
    sample: string;
    empty: string;
    total: string;
    words: string;
    loadFailed: string;
    viewerNotice: string;
    quotaExhausted: string;
    quotaExhaustedShort: string;
    quotaWarning: string;
    creditsLow: string;
    creditsExhausted: string;
    refusedQuota: string;
    refusedRole: string;
    meteringTitle: string;
    meteringUsage: string;
    meteringUsageSkipped: string;
    meteringCredits: string;
    meteringCreditsSkipped: string;
    statuses: {
      draft: string;
      in_review: string;
      published: string;
      archived: string;
    };
  };
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
  webhooks: {
    title: string;
    description: string;
    empty: string;
    refresh: string;
    event: string;
    received: string;
    signature: string;
    verified: string;
    payload: string;
    when: string;
  };
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
    description: string;
    openInbox: string;
  };
  toast: {
    workspaceRequired: string;
    sent: string;
    notSent: string;
    inboxHint: string;
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
  agents: {
    title: string;
    description: string;
    guideTitle: string;
    guideDescription: string;
  };
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
  blogNotFound: {
    title: string;
    description: string;
    browseAll: string;
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
  shareAriaX: string;
  shareAriaLinkedin: string;
  shareAriaFacebook: string;
  shareAriaCopy: string;
  shareAriaCopied: string;
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

export interface InboxMessages {
  title: string;
  description: string;
  rules: {
    live: string;
    read: string;
    email: string;
  };
}

export interface TourMessages {
  title: string;
  subtitle: string;
  progress: string;
  markDone: string;
  undo: string;
  open: string;
  detected: string;
  manual: string;
  why: string;
  steps: string;
  fromSdk: string;
  fromConsole: string;
  fromApp: string;
  requires: string;
  allDone: string;
  homeTitle: string;
  homeSubtitle: string;
  homeCta: string;
  dashboardCard: string;
  next: string;
  dashboardCta: string;
}

export interface HelpMessages {
  title: string;
  description: string;
  notConfigured: {
    title: string;
    token: string;
    empty: string;
  };
  from: {
    richContent: string;
    docs: string;
    faqs: string;
    testimonials: string;
  };
  docs: {
    title: string;
    empty: string;
  };
  faq: {
    title: string;
  };
  testimonials: {
    title: string;
  };
}

export interface FormsMessages {
  title: string;
  description: string;
  loading: string;
  fromConsole: string;
  submit: string;
  sending: string;
  sent: string;
  hint: string;
  errors: {
    title: string;
    generic: string;
  };
  missing: {
    title: string;
    token: string;
    form: string;
  };
  toast: {
    sent: string;
  };
  submissions: {
    title: string;
    description: string;
    refresh: string;
    empty: string;
  };
}

export interface CollectionsMessages {
  title: string;
  description: string;
  loading: string;
  liveVersion: string;
  noLiveVersion: string;
  refresh: string;
  empty: string;
  actions: string;
  delete: string;
  hint: string;
  missing: {
    title: string;
    token: string;
    collection: string;
  };
  toast: {
    deleted: string;
    deleteFailed: string;
  };
}

export interface TrackingMessages {
  title: string;
  description: string;
  loading: string;
  consent: {
    title: string;
    description: string;
    noTags: string;
    privacy: string;
    analytics: string;
    marketing: string;
    acceptAll: string;
    analyticsOnly: string;
    denyAll: string;
    state: string;
    unset: string;
  };
  installed: {
    title: string;
    description: string;
    none: string;
  };
  custom: {
    title: string;
    description: string;
    button: string;
    fired: string;
  };
  attribution: {
    title: string;
    description: string;
    empty: string;
  };
  log: {
    title: string;
    description: string;
    empty: string;
  };
}

export interface AutomationsMessages {
  title: string;
  description: string;
  refresh: string;
  loading: string;
  notConfigured: string;
  error: string;
  runs: {
    title: string;
    description: string;
    empty: string;
    workflow: string;
    event: string;
    status: string;
    nodes: string;
    started: string;
  };
  calls: {
    title: string;
    description: string;
    empty: string;
  };
}

export interface ReportsMessages {
  title: string;
  description: string;
  notConfigured: string;
  loading: string;
  refresh: string;
  window: string;
  unavailable: string;
  series: {
    users: {
      title: string;
      description: string;
    };
    forms: {
      title: string;
      description: string;
    };
    links: {
      title: string;
      description: string;
    };
  };
}

export interface AssetsMessages {
  title: string;
  description: string;
  upload: string;
  uploading: string;
  limit: string;
  uploaded: string;
  gallery: string;
  empty: string;
  public: string;
  private: string;
  makePrivate: string;
  makePublic: string;
  nowPublic: string;
  nowPrivate: string;
  openUrl: string;
  tooLarge: string;
  loadFailed: string;
  notConfigured: string;
}

export interface LinksMessages {
  title: string;
  description: string;
  create: string;
  createHint: string;
  name: string;
  url: string;
  createButton: string;
  created: string;
  yourLinks: string;
  clicksHint: string;
  refresh: string;
  empty: string;
  clicks: string;
  copy: string;
  copied: string;
  follow: string;
  changeDestination: string;
  save: string;
  cancel: string;
  updated: string;
  chart: string;
  chartHint: string;
  chartEmpty: string;
  loadFailed: string;
  notConfigured: string;
}

export interface AudienceMessages {
  title: string;
  description: string;
  failed: string;
  notConfigured: string;
  onboarding: {
    title: string;
    description: string;
    items: {
      profile: string;
      workspace: string;
      invite: string;
    };
    role: string;
    save: string;
    saved: string;
    already: string;
  };
  attributes: {
    title: string;
    description: string;
    empty: string;
  };
  locale: {
    title: string;
    description: string;
    country: string;
    timezone: string;
    currency: string;
    save: string;
    saved: string;
  };
  newsletter: {
    title: string;
    description: string;
    email: string;
    subscribe: string;
    subscribed: string;
    listed: string;
    noList: string;
    waitlistHint: string;
  };
}

export interface WaitlistMessages {
  title: string;
  description: string;
  success: string;
  note: string;
}

// Combined messages type
export interface Messages {
  common: CommonMessages;
  home: HomeMessages;
  dashboard: DashboardMessages;
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
  tour: TourMessages;
  inbox: InboxMessages;
  tracking: TrackingMessages;
  automations: AutomationsMessages;
  reports: ReportsMessages;
  help: HelpMessages;
  forms: FormsMessages;
  collections: CollectionsMessages;
  assets: AssetsMessages;
  links: LinksMessages;
  audience: AudienceMessages;
  waitlist: WaitlistMessages;
}

// For next-intl type inference
declare module 'next-intl' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}
