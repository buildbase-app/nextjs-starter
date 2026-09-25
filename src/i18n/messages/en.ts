import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      home: 'Home',
      dashboard: 'Dashboard',
      documents: 'Documents',
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
      usage: 'Usage',
      permissions: 'Permissions',
      events: 'Events',
      invoices: 'Invoices',
      workspace: 'Workspace',
      tour: 'Tour',
      inbox: 'Inbox',
      modules: 'Modules',
      forms: 'Forms',
      collections: 'Collections',
      assets: 'Assets',
      links: 'Short links',
      audience: 'Audience',
      tracking: 'Tracking',
      automations: 'Automations',
      reports: 'Reports',
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
      tagline:
        'A live demo app showing the BuildBase SDK in action. Sign in to explore auth, workspaces, credits, push notifications, and i18n.',
      sections: {
        product: 'Product',
        resources: 'Resources',
        legal: 'Legal',
      },
      links: {
        features: 'Features',
        pricing: 'Pricing',
        dashboard: 'Dashboard',
        credits: 'Credits',
        blog: 'Blog',
        changelog: 'Changelog',
        tour: 'Tour',
        github: 'Source on GitHub',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
      },
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
    pages: {
      lastUpdated: 'Last updated:',
    },
    redirecting: 'Redirecting...',
  },
  home: {
    title: 'BuildBase Demo',
    hero: {
      badge: 'Live demo · 67 tasks',
      heading:
        'Every BuildBase capability, <highlight>one task at a time</highlight>',
      description:
        'A real app on the BuildBase SDK, with a guided tour: sign in and work through sign-up, workspaces, billing, usage, credits, notifications, agents and webhooks, each one showing where it comes from.',
      signInToExplore: 'Sign in to explore',
      openDashboard: 'Open Dashboard',
      viewSource: 'View source',
      builtWith: 'Built with',
    },
    stats: {
      languages: {
        label: 'Languages in this demo',
        sublabel: 'switch with the header toggle',
      },
      tasks: {
        label: 'Tasks in the tour',
        sublabel: 'each one a capability to try',
      },
      groups: {
        label: 'Groups',
        sublabel: 'from sign-in to webhooks',
      },
      authCode: {
        label: 'Lines of auth code',
        sublabel: 'the SDK handles it all',
      },
    },
    cta: {
      heading: 'Ready to see it all working?',
      description:
        'Sign in to open the full dashboard — try switching workspaces, consuming credits, sending a push notification, and switching between all 8 languages.',
      signIn: 'Sign in & explore',
      openDashboard: 'Open Dashboard',
      howBuilt: "How it's built",
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
    trial: {
      endingSoon: 'Trial ending soon',
      endingSoonMsg:
        'Your trial ends in {days} day{s}. Upgrade now to keep access.',
      upgrade: 'Upgrade',
      freeTrial: "You're on a free trial",
      daysRemaining: '{days} days remaining',
      endsOn: 'Trial ends {date}',
      active: 'Trial active',
      viewPlans: 'View plans',
      trialBadge: 'Trial',
    },
    noSubscription: {
      title: 'No active subscription',
      hint: 'Subscribe to unlock paid features',
      choosePlan: 'Choose a plan',
    },
    subscription: {
      title: 'Subscription',
      description: 'Your current plan',
      loading: 'Loading...',
      status: 'Status: {status}',
      activeSubscription: 'Active subscription',
      changePlan: 'Change plan',
      noPlan: 'No active plan',
      choosePlan: 'Choose a plan',
    },
    subscriptionGates: {
      whenSubscription: {
        title: 'Subscription gate',
        description: 'Only visible when workspace has an active subscription',
        fallback: 'No subscription active — upgrade to see this content.',
        content: 'You have an active subscription — this card is visible.',
      },
      whenSubscriptionToPlans: {
        title: 'Plan gate',
        description: 'Only visible when subscribed to a specific plan',
        fallback: 'Not on a Pro / Enterprise / Growth plan.',
        content:
          "You're on Pro, Enterprise, or Growth — premium content unlocked.",
      },
    },
    seatStatus: {
      title: 'Seat status',
      description: 'Member count vs plan limits',
      members: 'Members',
      includedSeats: 'Included seats',
      maxUsers: 'Max users',
      canInvite: 'Can invite',
      yes: 'Yes',
      no: 'No',
      limitReached:
        'Seat limit reached — upgrade your plan to invite more members.',
    },
    quickActionButtons: {
      inviteTeam: 'Invite team',
      manageSubscription: 'Manage subscription',
      workspaceSettings: 'Workspace settings',
    },
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
  team: {
    title: 'Team',
    description: 'Workspace members',
    inviteMember: 'Invite member',
    seatLimitReached:
      'Seat limit reached — upgrade your plan to invite more members.',
    cards: {
      members: 'Members',
      includedSeats: 'Included seats',
      maxUsers: 'Max users',
      availableSeats: 'Available seats',
    },
    memberList: {
      title: 'Members',
      count: '{count} member(s) in this workspace',
      empty: 'No members loaded. Make sure you are authenticated.',
      roleFallback: 'member',
      changeRole: 'Change role',
    },
    invite: {
      title: 'Invite by email',
      description:
        'The address needs no account yet. They get an email, follow the link, sign up or in, and accept.',
      noPermission: 'Your role cannot invite members.',
      emailPlaceholder: 'name@company.com',
      role: 'Role',
      send: 'Send invitation',
      sent: 'Invitation sent to {email}',
      failed: 'Something went wrong',
      resent: 'Invitation sent again',
      revoked: 'Invitation revoked',
      seatNote: '{count} pending invitation(s) hold a seat until answered.',
      pendingTitle: 'Pending',
      loading: 'Loading…',
      none: 'Nothing pending.',
      invitedBy: 'Invited by {name}',
      pendingLabel: 'Pending',
      expires: 'expires {date}',
      cooldown: 'Resend available in {seconds}s',
      resend: 'Resend',
      revoke: 'Revoke',
    },
    roleChanged: 'Role changed to {role}',
    manage: {
      title: 'Manage members',
      description:
        'Open the workspace settings panel to manage roles and invitations',
      openSettings: 'Open member settings',
      permissions: 'Permissions',
    },
  },
  settings: {
    title: 'Settings',
    description: 'Workspace settings',
    card: {
      title: 'Workspace settings',
      description: 'Click any section to open the BuildBase settings panel',
    },
    danger: {
      openButton: 'Open danger zone',
    },
    sections: {
      profile: {
        label: 'Profile',
        description: 'Your name, avatar, and personal details',
      },
      general: {
        label: 'General',
        description: 'Workspace name, slug, and basic settings',
      },
      users: {
        label: 'Members & invitations',
        description: 'Manage team members, roles, and pending invites',
      },
      subscription: {
        label: 'Subscription',
        description: 'View and change your current plan',
      },
      usage: {
        label: 'Usage',
        description: 'Quota consumption and usage history',
      },
      credits: {
        label: 'Credits',
        description: 'Credit balance and top-up options',
      },
      features: {
        label: 'Feature flags',
        description: 'Workspace-level feature toggles',
      },
      notifications: {
        label: 'Notifications',
        description: 'Email and push notification preferences',
      },
      permissions: {
        label: 'Permissions',
        description: 'Role-based access control settings',
      },
      danger: {
        label: 'Danger zone',
        description: 'Delete workspace or transfer ownership',
      },
    },
  },
  documents: {
    featureGates: {
      title: 'Feature gates',
      description:
        'Sections of this product that a workspace or user feature flag switches on.',
    },
    workbench: {
      title: 'Your documents',
      description:
        'Documents live in this app’s own database; the platform meters them.',
      search: 'Search documents',
      allStatuses: 'All statuses',
      allTags: 'All tags',
      newDocument: 'New document',
      newDocumentHint:
        'Creating one records usage against the documents quota and spends one credit.',
      titleLabel: 'Title',
      contentLabel: 'Content (Markdown)',
      statusLabel: 'Status',
      tagsLabel: 'Tags, comma separated',
      create: 'Create',
      creating: 'Creating…',
      created: 'Document created',
      deleted: 'Document deleted',
      delete: 'Delete',
      loadSamples: 'Load sample documents',
      clearSamples: 'Clear samples',
      samplesLoaded: '{count} sample documents loaded',
      samplesAlready: 'Samples already loaded',
      samplesCleared: '{count} sample documents removed',
      sample: 'Sample',
      empty: 'No documents yet.',
      total: '{count} total',
      words: '{count} words',
      loadFailed: 'Could not load documents',
      viewerNotice:
        'Your role here is {role}: you can read, not write. The buttons are disabled and the server refuses anyway.',
      quotaExhausted:
        'The documents quota for this plan is used up and it has no overage. Upgrade to create more.',
      quotaExhaustedShort: 'Quota used up',
      quotaWarning:
        'You have used over 80% of the documents quota on this plan.',
      creditsLow: 'Credits are running low. Each document spends one.',
      creditsExhausted:
        'No credits left. Documents still get created; the metering line shows the spend was skipped.',
      refusedQuota:
        'Refused: {consumed} of {included} documents used and the plan hard-caps.',
      refusedRole: 'Refused: the {role} role may not write.',
      meteringTitle: 'What the platform recorded',
      meteringUsage: 'Usage: {used} of {included} documents',
      meteringUsageSkipped:
        'Usage: not recorded (this plan has no documents quota)',
      meteringCredits: 'Credits: {amount} spent, {balance} left',
      meteringCreditsSkipped: 'Credits: not spent (no balance)',
      statuses: {
        draft: 'Draft',
        in_review: 'In review',
        published: 'Published',
        archived: 'Archived',
      },
    },
    title: 'Documents',
    description:
      'Your workspace’s documents: created here or by an agent, metered by the platform.',
    stats: {
      featureSections: 'Feature sections',
      featureSectionsSubtitle: 'document features',
      enabled: 'Enabled for workspace',
      enabledSubtitle: 'features active',
      locked: 'Locked',
      lockedSubtitle: 'features inactive',
    },
    features: {
      enabled: 'Enabled',
      disabled: 'Disabled',
    },
    allFeatures: {
      title: 'All workspace features',
      description: 'Raw feature flag state',
      empty: 'No feature flags configured for this workspace.',
    },
    featureSections: {
      advancedExports: {
        label: 'Advanced exports',
        description: 'Export documents as PDF, DOCX, or CSV',
        content: 'Export to PDF, Word, and CSV is available on your plan.',
        lockedMessage:
          'Enable the advanced-exports feature to unlock document exports.',
      },
      documentSharing: {
        label: 'Document sharing',
        description: 'Share documents with external collaborators',
        content:
          'Shareable links and external collaborator access are enabled.',
        lockedMessage:
          'Enable document-sharing to allow sharing with people outside your workspace.',
      },
      eSignatures: {
        label: 'E-signatures',
        description: 'Collect legally binding signatures',
        content:
          'E-signature collection is active. Send signature requests from any document.',
        lockedMessage:
          'Enable e-signatures to collect legally binding signatures on documents.',
      },
    },
  },
  events: {
    webhooks: {
      title: 'Webhooks received',
      description:
        'Signed server-to-server deliveries from the platform, stored by /api/webhooks/buildbase for this workspace.',
      empty:
        'No webhooks yet. Subscribe, invite someone or buy credits and the platform will call this app.',
      refresh: 'Refresh',
      event: 'Event',
      received: 'Received',
      signature: 'Signature',
      verified: 'Verified',
      payload: 'Payload',
      when: 'Platform time',
    },
    title: 'SDK Event Log',
    description: 'Real-time SDK events',
    clearButton: 'Clear',
    listenCard: {
      title: 'Listening for events',
      description:
        'These events fire automatically as you use the SDK — switch workspaces, sign in, or invite a member to see them appear.',
    },
    liveCard: {
      title: 'Live stream',
      captured: '{count} events captured',
      empty: 'No events yet. Try switching workspaces or refreshing the page.',
    },
    eventLabels: {
      userCreated: 'User Created',
      userUpdated: 'User Updated',
      workspaceChanged: 'Workspace Changed',
      workspaceUpdated: 'Workspace Updated',
      memberAdded: 'Member Added',
      memberRemoved: 'Member Removed',
      roleChanged: 'Role Changed',
      workspaceCreated: 'Workspace Created',
      workspaceDeleted: 'Workspace Deleted',
    },
  },
  invoices: {
    title: 'Invoices',
    description: 'Billing history',
    refresh: 'Refresh',
    billingPortal: 'Billing portal',
    billingPortalOpening: 'Opening…',
    error: 'Failed to load invoices.',
    card: {
      title: 'Invoice history',
      found: '{count} invoice(s) found',
      empty:
        'No invoices yet. Invoices appear here after you subscribe to a paid plan.',
    },
    table: {
      date: 'Date',
      amount: 'Amount',
      status: 'Status',
      description: 'Description',
      links: 'Links',
      view: 'View',
      pdf: 'PDF',
      loadMore: 'Load more',
    },
  },
  notifications: {
    title: 'Notifications',
    description: 'Send a notification from this app and watch where it lands',
    pushCard: {
      title: 'Browser Push Notifications',
      description: 'Enable browser push notifications for this device',
      subscribed: 'Subscribed',
      notSubscribed: 'Not subscribed',
      subscribe: 'Subscribe',
      unsubscribe: 'Unsubscribe',
    },
    sendCard: {
      title: 'Send Test Notification',
      description:
        "Fill in the fields below and send a notification. Merge tags like '{{name}}', '{{workspaceName}}' and '{{url}}' are resolved automatically.",
    },
    fields: {
      eventSlug: 'Event Slug',
      eventSlugHint:
        'The demo event is "{slug}", registered in the console with email and push. Any slug works for push only; email needs a registered event.',
      title: 'Title',
      message: 'Message',
      url: 'URL',
      target: 'Target',
      channel: 'Channel',
    },
    placeholders: {
      eventSlug: 'e.g. comment_added, deployment_success',
      title: 'Notification title (falls back to event name)',
      message: 'Push body + email message',
      url: 'Opens on push click',
    },
    buttons: {
      meOnly: 'Me only',
      allMembers: 'All workspace members',
      both: 'Both',
      emailOnly: 'Email only',
      pushOnly: 'Push only',
      showAdvanced: 'Show Advanced Push Options',
      hideAdvanced: 'Hide Advanced Push Options',
      send: 'Send Notification',
      sending: 'Sending...',
      silent: 'Silent',
      requireInteraction: 'Require Interaction',
      renotify: 'Renotify',
      default: 'Default',
    },
    advanced: {
      media: 'Media',
      behavior: 'Push Behavior',
      delivery: 'Delivery',
      actions: 'Action Buttons (max 2)',
      iconUrl: 'Icon URL',
      imageUrl: 'Image URL',
      badgeUrl: 'Badge URL',
      tag: 'Tag',
      tagHint: 'Replaces notification with same tag instead of stacking',
      behaviorHint:
        'Silent = no sound/vibration. Require Interaction = stays until user interacts. Renotify = sound again when replacing via tag.',
      urgency: 'Urgency',
      ttl: 'TTL (seconds)',
      schedule: 'Schedule (ISO 8601)',
      action1: 'Action 1',
      action2: 'Action 2',
      actionTitlePlaceholder: 'Button label (e.g. Reply)',
      actionKeyPlaceholder: 'Action key (e.g. reply)',
      iconUrlPlaceholder: 'Push icon (falls back to org icon)',
      imageUrlPlaceholder: 'Large image in push body',
      badgeUrlPlaceholder: 'Status bar icon (Android)',
      ttlPlaceholder: '86400 (24h default)',
    },
    context: {
      workspace: 'Workspace:',
      user: 'User:',
      none: 'None selected',
    },
    resultCard: {
      title: 'Response',
      description: 'What the platform did with the send.',
      openInbox: 'Open inbox',
    },
    toast: {
      workspaceRequired: 'Please select a workspace first',
      sent: 'Notification sent to {count} user(s)',
      notSent: 'Notification not sent: {reason}',
      inboxHint: 'Check the bell and your inbox.',
      pushEnabled: 'Push notifications enabled',
      pushDisabled: 'Push notifications disabled',
      pushFailed: 'Failed to toggle push notifications',
      networkError: 'Network error — could not reach the server',
    },
  },
  permissions: {
    title: 'Permissions',
    description: 'Live permission resolution',
    cards: {
      role: 'Your role',
      owner: 'Owner',
      ownerYes: 'Yes',
      ownerNo: 'No',
      granted: 'Permissions granted',
    },
    ownerAdmin: {
      title: 'Owner / Admin only',
      notVisible: 'Not visible to your role ({role}).',
      visible: 'You can see this because you are an owner or admin.',
    },
    allMembers: {
      title: 'All members',
      notMember: 'You are not a member of this workspace.',
      visible: 'You can see this because you are a workspace member.',
    },
    matrix: {
      title: 'Permission matrix',
      description: 'All platform permissions checked against your current role',
      denied: 'Denied',
      grantedStatus: 'Granted',
    },
  },
  profile: {
    agents: {
      title: 'Connected agents',
      description:
        'AI clients you have authorized to act as you over MCP. Disconnect revokes their access.',
      guideTitle: 'Connect an agent',
      guideDescription:
        'This app is an MCP server. Add it to Claude, Cursor or ChatGPT and sign in with your BuildBase account; the agent then reads your workspaces and this app’s documents with your permissions.',
    },
    title: 'User Profile',
    description: 'User attributes and feature flags',
    identity: {
      title: 'Identity',
      subtitle: 'From useSaaSAuth()',
      name: 'Name',
      email: 'Email',
      role: 'Role',
      id: 'ID',
    },
    workspaceFeatures: {
      title: 'Workspace feature flags',
      enabled: 'Enabled',
      disabled: 'Disabled',
    },
    attributes: {
      title: 'User Attributes',
      description: 'Custom key-value pairs stored per user',
      empty: 'No attributes set yet.',
      setTitle: 'Set an attribute (live demo)',
      keyPlaceholder: 'key (e.g. theme)',
      valuePlaceholder: 'value',
      saving: 'Saving…',
      save: 'Save',
      saved: 'Saved!',
      failed: 'Failed to save.',
    },
    userFeatures: {
      title: 'User Feature Flags',
      description: 'User-level feature flags',
      empty: 'No feature flags configured for this user.',
      loading: 'Loading...',
      enabled: 'Enabled',
      disabled: 'Disabled',
    },
  },
  usage: {
    title: 'Quota Usage',
    description: 'Live quota consumption',
    loading: 'Loading quotas...',
    error: 'Failed to load quota data.',
    empty: 'No quotas configured for this workspace.',
    quotaCard: {
      remaining: '{count} remaining',
      unlimited: 'Unlimited',
      exhausted: 'Exhausted',
      overage: 'Overage',
      threshold: 'Over 80% used ({pct}%) — approaching limit',
      overageMsg: 'In overage by {count} units',
      exhaustedMsg: 'Quota exhausted — actions using this quota are blocked',
      used: 'used',
      overageAllowed: '(allowed)',
    },
    record: {
      title: 'Record usage',
      description: 'Manually record quota usage',
      slugPlaceholder: 'quota slug (e.g. api_calls)',
      qtyPlaceholder: 'quantity',
      recording: 'Recording…',
      record: 'Record',
      success: 'Recorded {qty} unit(s) for "{slug}".',
      failed: 'Failed to record usage.',
    },
    logs: {
      title: 'Usage log',
      description: 'Recent usage entries',
      loading: 'Loading logs…',
      empty: 'No usage logs yet. Record some usage below to see entries here.',
      table: {
        quota: 'Quota',
        quantity: 'Quantity',
        source: 'Source',
        date: 'Date',
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
    packages: {
      title: 'Credit packages',
      loading: 'Loading packages…',
      error: 'Failed to load packages.',
      empty: 'No credit packages configured yet.',
      credits: 'credits',
      validFor: 'Valid for {days} days',
      buyNow: 'Buy now',
    },
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
      loading: 'Loading...',
    },
    transactions: {
      title: 'Transaction History',
      description: 'Recent credit additions and deductions',
      empty: 'No transactions yet',
      loading: 'Loading...',
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
    blogNotFound: {
      title: 'Post not found',
      description:
        "The blog post you're looking for doesn't exist, may have been removed, or is not available in your language.",
      browseAll: 'Browse all posts',
    },
  },
  blog: {
    label: 'Blog',
    heading: 'Latest Posts',
    description: 'Updates, tutorials, and insights from our team.',
    noPosts: 'No posts yet. Check back soon!',
    noPostsTag: 'No posts with this tag yet.',
    noPostsCategory: 'No posts in this category yet.',
    noPostsAuthor: 'No posts by this author yet.',
    postsByAuthor: 'Posts by {name}',
    postsTaggedCount:
      '{count, plural, one {# post tagged with "{tag}"} other {# posts tagged with "{tag}"}}',
    postsInCategoryCount:
      '{count, plural, one {# post in this category} other {# posts in this category}}',
    readMore: 'Read more',
    read: 'Read',
    allPosts: '← All posts',
    previous: 'Previous',
    next: 'Next',
    pageOf: 'Page {page} of {total}',
    relatedPosts: 'Related Posts',
    share: 'Share',
    rssLabel: 'RSS Feed',
    shareAriaX: 'Share on X / Twitter',
    shareAriaLinkedin: 'Share on LinkedIn',
    shareAriaFacebook: 'Share on Facebook',
    shareAriaCopy: 'Copy link',
    shareAriaCopied: 'Link copied!',
    search: {
      trigger: 'Search posts...',
      placeholder: 'Search blog posts...',
      searching: 'Searching...',
      noResults: 'No results for "{query}"',
      startTyping: 'Start typing to search...',
    },
    meta: {
      title: 'Blog',
      titlePage: 'Blog — Page {page}',
      description: 'Latest posts, tutorials, and updates from our team.',
      tagTitle: 'Posts tagged "{tag}"',
      tagDescription: 'All blog posts tagged with "{tag}".',
      categoryTitle: '{category} — Blog',
      categoryDescription: 'Blog posts in the "{category}" category.',
    },
  },
  changelog: {
    label: 'Changelog',
    heading: "What's New",
    description: 'All the latest updates, improvements, and fixes.',
    rssLabel: 'RSS Feed',
    permalink: 'Permalink',
    meta: {
      title: 'Changelog',
      description: 'All the latest updates, improvements, and fixes.',
    },
  },
  cookieConsent: {
    title: 'We use cookies',
    descriptionBefore:
      'We use cookies to improve your experience, analyze traffic, and personalize content. You can choose which cookies to allow. Read our',
    policyLinkPrivacy: 'privacy policy',
    policyLinkCookie: 'cookie policy',
    dismissAriaLabel: 'Dismiss for now',
    necessary: {
      title: 'Necessary',
      description: 'Required for the site to function. Cannot be disabled.',
    },
    analytics: {
      title: 'Analytics',
      description: 'Help us understand how visitors use our site.',
    },
    marketing: {
      title: 'Marketing',
      description: 'Used to deliver relevant ads and track campaigns.',
    },
    acceptAll: 'Accept all',
    rejectAll: 'Reject all',
    savePreferences: 'Save preferences',
    customize: 'Customize',
  },
  inbox: {
    title: 'Inbox',
    description:
      'Everything this app has sent you, one item per notification, however it was delivered.',
    rules: {
      live: 'New items arrive live over a socket; no reload.',
      read: 'An item is read when you open it here or click its link. Opening the email alone does not read it.',
      email:
        'Each item shows what email and push did, so you can see why a channel stayed quiet.',
    },
  },
  tour: {
    title: 'The tour',
    subtitle:
      '{total} things to try, each one a BuildBase capability and where it comes from.',
    progress: '{done} of {total} done',
    markDone: 'Mark done',
    undo: 'Undo',
    open: 'Open',
    detected: 'Detected automatically',
    manual: 'Confirm it yourself',
    why: 'Why it matters',
    steps: 'What to do',
    fromSdk: 'From the SDK',
    fromConsole: 'Configured in the console',
    fromApp: 'In this app',
    requires: 'Do first',
    allDone: 'You have done everything. Take it home.',
    homeTitle: 'Try everything, one task at a time',
    homeSubtitle:
      'Sign in and work through {total} tasks in {groups} groups. Each one shows a BuildBase capability, what it looks like in an app, and where it is configured.',
    homeCta: 'Start the tour',
    dashboardCard: 'Your tour',
    next: 'Next',
    cloneTitle: 'Clone this app',
    cloneBody:
      'Every page and task here is in one open repository. Read how any of it works, or clone it and start your own app from it.',
    browseCode: 'Browse the code',
    copy: 'Copy',
    copied: 'Copied',
    dashboardCta: 'Continue',
  },
  help: {
    title: 'Help center',
    description:
      'Everything on this page was written in the console: a policy block, docs, FAQs and testimonials. Change it there, reload here.',
    notConfigured: {
      title: 'No content yet',
      token:
        'This app has no organization API token, so it cannot read console content. Set BUILDBASE_API_TOKEN.',
      empty: 'The organization has none of the demo content yet. Seed it with:',
    },
    from: {
      richContent: 'rich content',
      docs: 'docs',
      faqs: 'faq collection',
      testimonials: 'testimonials',
    },
    docs: {
      title: 'Documentation',
      empty: 'No published docs yet.',
    },
    faq: {
      title: 'Frequently asked',
    },
    testimonials: {
      title: 'What customers say',
    },
  },
  forms: {
    title: 'Forms',
    description:
      'A form built in the console, rendered from its live schema and submitted through this app.',
    loading: 'Loading the form…',
    fromConsole: 'Fields come from the console; add one there and reload.',
    submit: 'Send',
    sending: 'Sending…',
    sent: 'Sent',
    hint: 'Submissions are stored as collection records and fire the form.submitted event.',
    errors: {
      title: 'The platform refused this submission',
      generic: 'Something was not accepted.',
    },
    missing: {
      title: 'No contact form yet',
      token: 'This app has no organization API token. Set BUILDBASE_API_TOKEN.',
      form: 'The organization has no form named Contact. Seed it with:',
    },
    toast: {
      sent: 'Submitted. It is now a record on the platform.',
    },
    submissions: {
      title: 'Latest submissions',
      description: "Read back from the form's collection.",
      refresh: 'Refresh',
      empty: 'Nothing submitted yet.',
    },
  },
  collections: {
    title: 'Collections',
    description:
      'Custom data on the platform: a versioned schema, records against the live version.',
    loading: 'Loading records…',
    liveVersion: 'Live version {version} ({name}), {fields} fields',
    noLiveVersion: 'No live version. Publish one in the console.',
    refresh: 'Refresh',
    empty: 'No records. Seed some or add one in the console.',
    actions: 'Actions',
    delete: 'Delete record',
    hint: 'Publish a new version with an extra field in the console; the column appears here on reload.',
    missing: {
      title: 'No release-notes collection yet',
      token: 'This app has no organization API token. Set BUILDBASE_API_TOKEN.',
      collection:
        'The organization has no collection with slug release-notes. Seed it with:',
    },
    toast: {
      deleted: 'Record deleted on the platform.',
      deleteFailed: 'Could not delete the record.',
    },
  },
  tracking: {
    title: 'Tracking',
    description:
      'Analytics and ad tags from the console, loaded after consent, with your own events and attribution.',
    loading: 'Loading…',
    consent: {
      title: 'Consent',
      description:
        'Built from the tags attached to this app, never from the whole library.',
      noTags:
        'No tags are attached to this app yet. Add one in the console under Settings → Tracking and attach it to the client.',
      privacy: 'Privacy',
      analytics: 'analytics',
      marketing: 'marketing',
      acceptAll: 'Accept all',
      analyticsOnly: 'Analytics only',
      denyAll: 'Deny all',
      state: 'Current state',
      unset: 'not asked yet',
    },
    installed: {
      title: 'Installed providers',
      description: 'What actually loaded in this browser after consent.',
      none: 'Nothing loaded. Give consent, or attach a tag in the console.',
    },
    custom: {
      title: 'Track a custom event',
      description:
        'Your own events go to the data layer and every installed vendor.',
      button: 'Track report_exported',
      fired: 'Fired {count} time(s)',
    },
    attribution: {
      title: 'Attribution',
      description:
        'Where this visitor came from: click ids and campaign parameters, captured on the first page.',
      empty: 'Nothing captured. Reload with',
    },
    log: {
      title: 'Live event log',
      description:
        'Every event the SDK fired in this tab, including the ones it fires on its own.',
      empty: 'No events yet. Navigate around, or track one above.',
    },
  },
  automations: {
    title: 'Automations',
    description:
      'Workflows are built in the console; this app causes the events they listen for and reads what ran for you.',
    refresh: 'Refresh',
    loading: 'Loading…',
    notConfigured:
      'BUILDBASE_API_TOKEN is not configured, so this app cannot read workflow runs.',
    error: 'Could not load runs',
    runs: {
      title: 'Your runs',
      description: 'Workflow instances the platform started for your account.',
      empty:
        'No runs yet. Submit the contact form, or sign up a new user, and refresh.',
      workflow: 'Workflow',
      event: 'Event',
      status: 'Status',
      nodes: 'Nodes done',
      started: 'Started',
    },
    calls: {
      title: 'Calls into this app',
      description:
        "What a workflow's HTTP Webhook action sent to /api/buildbase/provision, verified by shared secret.",
      empty: 'No provisioning calls received yet.',
    },
  },
  reports: {
    title: 'Reports',
    description:
      'Every module reports through the same chart and count endpoints; three of them, for the last thirty days.',
    notConfigured:
      'BUILDBASE_API_TOKEN is not configured, so this app cannot read reports.',
    loading: 'Loading…',
    refresh: 'Refresh',
    window: '{from} to {to}',
    unavailable: 'Unavailable',
    series: {
      users: {
        title: 'Sign-ups',
        description: 'New users per day.',
      },
      forms: {
        title: 'Form submissions',
        description: 'Submissions of the contact form per day.',
      },
      links: {
        title: 'Link clicks',
        description: 'Short-link clicks per day.',
      },
    },
  },
  assets: {
    title: 'Assets',
    description:
      'Files uploaded through this app, stored and served by the platform.',
    upload: 'Upload a file',
    uploading: 'Uploading…',
    limit: 'Up to 5 MB. Images show a preview.',
    uploaded: 'Uploaded',
    gallery: 'Files',
    empty: 'No files yet. Upload one above.',
    public: 'Public',
    private: 'Private',
    makePrivate: 'Make private',
    makePublic: 'Make public',
    nowPublic: 'Now public: the URL works again.',
    nowPrivate: 'Now private: the public URL stops working.',
    openUrl: 'Open',
    tooLarge: 'That file is over 5 MB.',
    loadFailed: 'Could not talk to the platform.',
    notConfigured:
      'This page reads the organization through an API token. Set BUILDBASE_API_TOKEN (console → Settings → Tokens) and restart.',
  },
  links: {
    title: 'Short links',
    description:
      'Share links the platform redirects and counts, one click at a time.',
    create: 'Create a short link',
    createHint:
      'Any URL. The platform issues a 12-character id and records every click with its country and device.',
    name: 'Name',
    url: 'Destination URL',
    createButton: 'Create',
    created: 'Link created',
    yourLinks: 'Your links',
    clicksHint:
      'Follow a link, then refresh: the count comes from the platform, not from this page.',
    refresh: 'Refresh',
    empty: 'No links yet.',
    clicks: 'clicks',
    copy: 'Copy the short URL',
    copied: 'Copied',
    follow: 'Follow',
    changeDestination: 'Change destination',
    save: 'Save',
    cancel: 'Cancel',
    updated: 'Destination changed. The short URL is the same.',
    chart: 'Clicks, last 14 days',
    chartHint: 'All links together, per day.',
    chartEmpty: 'No clicks yet.',
    loadFailed: 'Could not talk to the platform.',
    notConfigured:
      'This page reads the organization through an API token. Set BUILDBASE_API_TOKEN (console → Settings → Tokens) and restart.',
  },
  audience: {
    title: 'Audience and attributes',
    description:
      'What the platform keeps about a person beyond the account: custom attributes, a marketing contact, and a waitlist.',
    failed: 'Could not save.',
    notConfigured: 'The newsletter needs BUILDBASE_API_TOKEN on the server.',
    onboarding: {
      title: 'Onboarding checklist',
      description:
        'Tick all three and save: the SDK writes onboarded=true and your role title as user attributes, in your browser, as you.',
      items: {
        profile: 'I filled in my profile',
        workspace: 'I created a workspace',
        invite: 'I invited someone',
      },
      role: 'Your role title (optional)',
      save: 'Finish onboarding',
      saved: 'Saved. Open your record in the console to see it.',
      already: 'Already onboarded, according to your attributes.',
    },
    attributes: {
      title: 'Your attributes',
      description:
        'Keys are defined in the console (Users → Attributes); values live on your user.',
      empty: 'No attributes yet.',
    },
    locale: {
      title: 'Country, timezone, currency',
      description:
        'The lists come with the SDK (@buildbase/sdk/data), no download.',
      country: 'Country',
      timezone: 'Timezone',
      currency: 'Currency',
      save: 'Save preferences',
      saved: 'Preferences saved as attributes.',
    },
    newsletter: {
      title: 'Newsletter',
      description:
        'A marketing contact is separate from your account: it can exist without one. The server creates it with the org token and adds it to the newsletter list.',
      email: 'Email',
      subscribe: 'Subscribe',
      subscribed: 'Subscribed',
      listed: 'Added to the {list} list.',
      noList:
        'Contact created; no newsletter list exists on this organization yet.',
      waitlistHint: 'Signed-out visitors can join the beta waitlist at',
    },
  },
  waitlist: {
    title: 'Join the waitlist',
    description:
      'The platform’s beta form: leave your name and email, an admin approves you in the console.',
    success: 'You are on the list. An admin will approve you from the console.',
    note: 'The form and its copy come from the organization’s beta configuration (console → Users → Beta).',
  },
};

export default messages;
