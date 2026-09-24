import type { TourGroup, TourTask } from './types';

/**
 * The tour's content. English on purpose: this is the demo's documentation
 * of what BuildBase gives an app, task by task, and it is read before anyone
 * signs in as much as after.
 *
 * Every task names where its capability comes from: the SDK surface it uses,
 * the console screen that configures it, and this app's own code where the
 * app takes part. A person reading it decides whether this is the starter
 * they clone, or what they get when they buy.
 */

export const TOUR_GROUPS: TourGroup[] = [
  {
    id: 'start',
    title: 'Get started',
    summary: 'Sign up, sign in, and see what a session is.',
  },
  {
    id: 'workspaces',
    title: 'Workspaces',
    summary:
      'Every customer of your app gets a workspace. Create, switch, rename, delete.',
  },
  {
    id: 'team',
    title: 'Team',
    summary: 'Invite by email, roles, seats, and what each role may do.',
  },
  {
    id: 'billing',
    title: 'Plans and billing',
    summary:
      'Trials, plans, checkout, invoices and the billing portal, all from the console.',
  },
  {
    id: 'usage',
    title: 'Usage and quotas',
    summary: 'Meter what your app does and let the plan set the limit.',
  },
  {
    id: 'credits',
    title: 'Credits',
    summary: 'A prepaid balance your app spends, and packages people buy.',
  },
  {
    id: 'features',
    title: 'Feature flags',
    summary: 'Switch a feature on for a workspace or a user without a deploy.',
  },
  {
    id: 'permissions',
    title: 'Permissions',
    summary: 'Roles per workspace, checked by the SDK and by the server.',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    summary: 'Email, push and an inbox every user can come back to.',
  },
  {
    id: 'push',
    title: 'Push',
    summary: 'Browser push, subscribed and delivered from the platform.',
  },
  {
    id: 'agents',
    title: 'Agents and MCP',
    summary: 'Connect Claude or any MCP client to this app as yourself.',
  },
  {
    id: 'webhooks',
    title: 'Webhooks',
    summary: 'Platform events mirrored into this app’s own database.',
  },
  {
    id: 'platform',
    title: 'Platform',
    summary: 'Languages, themes, your data, and taking this repo home.',
  },
];

const CONSOLE = 'https://console.buildbase.app';

export const TOUR_TASKS: TourTask[] = [
  // ── Get started ────────────────────────────────────────────────────────
  {
    id: 'sign-up',
    group: 'start',
    title: 'Create your account',
    why: 'Sign-up, email verification and the session are the platform’s, hosted on its pages. This app ships no auth code.',
    steps: [
      'Click Sign in on the home page.',
      'Register with your email and the code you receive.',
      'You land back here, signed in.',
    ],
    href: '/dashboard',
    source: {
      sdk: ['useSaaSAuth().signIn()', '<SaaSOSProvider auth={...}>'],
      console: {
        screen: '/dashboard/admin/auth',
        note: 'The OAuth2 client, its redirect URLs and the enabled sign-in methods.',
      },
      app: ['src/components/saas-provider.tsx', 'src/app/api/auth/*'],
    },
    detect: { kind: 'sdk-event', event: 'user:created' },
  },
  {
    id: 'trust-device',
    group: 'start',
    title: 'Trust this device',
    why: 'A trusted device stays signed in for 90 days and skips extra checks. Every device and session is listed, and can be signed out.',
    steps: [
      'During sign-in, choose Trust this device.',
      'Open Profile → Devices and sessions to see it listed.',
    ],
    href: '/dashboard/profile',
    source: {
      sdk: ['<Devices />', '<Sessions />', 'useSessions()'],
      console: {
        screen: '/dashboard/admin/users',
        note: 'Each user’s devices and live sessions.',
      },
    },
    detect: { kind: 'manual' },
  },
  {
    id: 'add-passkey',
    group: 'start',
    title: 'Add a passkey',
    why: 'Passwordless sign-in with a fingerprint, face or device PIN. Enabled per organization in the console; nothing to build.',
    steps: [
      'Open Profile → Security.',
      'Add a passkey and follow your browser’s prompt.',
      'Sign out and sign in with it.',
    ],
    href: '/dashboard/profile',
    source: {
      sdk: ['openWorkspaceSettings("security")'],
      console: {
        screen: '/dashboard/admin/auth',
        note: 'Sign-in methods: Passkey.',
      },
    },
    detect: { kind: 'manual' },
  },
  {
    id: 'see-session',
    group: 'start',
    title: 'See how the session reaches your server',
    why: 'The SDK holds a session id; this app keeps it in an httpOnly cookie and its API routes call BuildBase with it. Your server never handles a password.',
    steps: [
      'Open Profile.',
      'Read the “How this works” panel: the cookie, the server client, and which call made the profile.',
    ],
    href: '/dashboard/profile',
    source: {
      sdk: ['BuildBase({ getSessionId })', 'bb.users.getProfile()'],
      app: [
        'src/lib/buildbase.ts',
        'src/lib/server-auth.ts',
        'src/app/api/auth/session/route.ts',
      ],
    },
    code: {
      title: 'src/lib/buildbase.ts',
      lang: 'ts',
      body: `export const bb = BuildBase({\n  serverUrl: process.env.NEXT_PUBLIC_BUILDBASE_SERVER_URL!,\n  orgId: process.env.NEXT_PUBLIC_BUILDBASE_ORG_ID!,\n  getSessionId: async () => (await cookies()).get('bb-session-id')?.value ?? null,\n});`,
    },
    detect: { kind: 'manual' },
  },
  {
    id: 'sign-out-everywhere',
    group: 'start',
    title: 'Sign out everywhere',
    why: 'Ends every session on every device on the platform, not just the browser you are in.',
    steps: [
      'Open Profile → Devices and sessions.',
      'Sign out another session, or use Sign out everywhere.',
    ],
    href: '/dashboard/profile',
    source: { sdk: ['signOut({ everywhere: true })', 'SessionsApi.revoke()'] },
    detect: { kind: 'manual' },
  },

  // ── Workspaces ─────────────────────────────────────────────────────────
  {
    id: 'first-workspace',
    group: 'workspaces',
    title: 'Notice your first workspace',
    why: 'A workspace is the tenant: every plan, quota, credit balance and member belongs to one. The platform created your first one on sign-up.',
    steps: [
      'Look at the workspace name in the sidebar.',
      'Open the switcher to see it listed.',
    ],
    href: '/dashboard',
    source: {
      sdk: ['useSaaSWorkspaces()', '<WorkspaceSwitcher />'],
      console: {
        screen: '/dashboard/admin/workspaces/settings',
        note: 'Auto-create the first workspace, who may create more, and the ceilings.',
      },
    },
    detect: { kind: 'manual' },
  },
  {
    id: 'create-workspace',
    group: 'workspaces',
    title: 'Create a second workspace',
    why: 'One person can belong to several tenants. Each has its own billing.',
    steps: [
      'Open the workspace switcher.',
      'Choose Create workspace and name it.',
    ],
    href: '/dashboard',
    source: {
      sdk: ['useSaaSWorkspaces().createWorkspace()'],
      console: {
        screen: '/dashboard/admin/workspaces/settings',
        note: 'Max workspaces per user.',
      },
    },
    detect: { kind: 'sdk-event', event: 'workspace:created' },
    requires: ['sign-up'],
  },
  {
    id: 'switch-workspace',
    group: 'workspaces',
    title: 'Switch between them',
    why: 'Switching swaps every context at once: subscription, usage, credits, members, features.',
    steps: [
      'Open the switcher and pick the other workspace.',
      'Watch the dashboard cards change.',
    ],
    href: '/dashboard',
    source: {
      sdk: [
        'useSaaSWorkspaces().switchToWorkspace()',
        'onWorkspaceChange callback',
      ],
      app: ['src/app/api/auth/workspace-token/route.ts'],
    },
    detect: { kind: 'sdk-event', event: 'workspace:changed' },
    requires: ['create-workspace'],
  },
  {
    id: 'rename-workspace',
    group: 'workspaces',
    title: 'Rename a workspace',
    why: 'The built-in settings screen handles the general settings; you decide which sections show.',
    steps: ['Open Settings → General.', 'Change the name and save.'],
    href: '/dashboard/settings',
    source: {
      sdk: ['openWorkspaceSettings("general")', 'ui.settings.* switches'],
    },
    detect: { kind: 'sdk-event', event: 'workspace:updated' },
  },
  {
    id: 'workspace-settings-screens',
    group: 'workspaces',
    title: 'Open every built-in settings screen',
    why: 'Account, Security, Devices, Connected agents, General, Members, Plan and billing, Usage, Credits, Features, Notifications, Danger zone: all provided, all switchable off.',
    steps: ['Open Settings.', 'Click through the sidebar sections.'],
    href: '/dashboard/settings',
    source: {
      sdk: ['SETTINGS_SCREENS', '<SaaSOSProvider ui={{ settings: {...} }}>'],
    },
    detect: { kind: 'manual' },
  },
  {
    id: 'delete-workspace',
    group: 'workspaces',
    title: 'Delete the second workspace',
    why: 'The danger zone is offered only when the settings allow a person to own more than one.',
    steps: [
      'Switch to the second workspace.',
      'Settings → Danger zone → Delete.',
    ],
    href: '/dashboard/settings',
    source: {
      sdk: [
        'useSaaSWorkspaces().deleteWorkspace()',
        '<WhenPermission permission="WORKSPACE_DELETE">',
      ],
    },
    detect: { kind: 'sdk-event', event: 'workspace:deleted' },
    requires: ['create-workspace'],
  },

  // ── Team ───────────────────────────────────────────────────────────────
  {
    id: 'invite-member',
    group: 'team',
    title: 'Invite someone by email',
    why: 'The address needs no account. They get an email, follow the link, sign up or in, and accept. A pending invitation holds a seat.',
    steps: [
      'Open Team.',
      'Enter an email address you can read and a role, and send.',
    ],
    href: '/dashboard/team',
    source: {
      sdk: ['useSaaSWorkspaces().inviteMember()', 'useWorkspaceInvitations()'],
      console: {
        screen: '/dashboard/admin/workspaces',
        note: 'Each workspace’s invitations, with resend and revoke.',
      },
    },
    detect: { kind: 'sdk-event', event: 'workspace:invitation-sent' },
  },
  {
    id: 'pending-seat',
    group: 'team',
    title: 'See the pending invitation hold a seat',
    why: 'Seats are billed while an invitation is pending, so the seat count on Team and the plan agree.',
    steps: [
      'On Team, read the seat cards and the note under the invite form: the pending row is counted.',
    ],
    href: '/dashboard/team',
    source: { sdk: ['useSeatStatus(workspace, { pendingInvitations })'] },
    detect: { kind: 'manual' },
    requires: ['invite-member'],
  },
  {
    id: 'accept-invitation',
    group: 'team',
    title: 'Accept an invitation',
    why: 'From the email link, or from the pending list inside the app. Arriving by the link proves the address, so no separate verification.',
    steps: [
      'Open the invitation email in the other mailbox and follow its link.',
      'Sign up or in. The invitation banner at the top of every dashboard page has Accept.',
    ],
    href: '/dashboard/team',
    source: {
      sdk: [
        'useMyInvitations()',
        '<PendingInvitations />',
        '<WhenPendingInvitations>',
      ],
    },
    detect: { kind: 'sdk-event', event: 'workspace:invitation-accepted' },
    requires: ['invite-member'],
  },
  {
    id: 'change-role',
    group: 'team',
    title: 'Change a member’s role',
    why: 'Roles are per workspace and defined in the console. The member is told by email and in their inbox.',
    steps: [
      'On Team, pick another role next to a member who is not the owner.',
    ],
    href: '/dashboard/team',
    source: {
      sdk: ['useSaaSWorkspaces().updateUser(workspaceId, userId, { role })'],
      console: {
        screen: '/dashboard/admin/workspaces/settings',
        note: 'The roles a workspace offers and the default.',
      },
    },
    detect: { kind: 'sdk-event', event: 'workspace:user-role-changed' },
    requires: ['accept-invitation'],
  },
  {
    id: 'viewer-limits',
    group: 'team',
    title: 'See what a viewer cannot do',
    why: 'The SDK hides what a role may not do, and the server refuses it anyway.',
    steps: [
      'Sign in as the viewer.',
      'Open Permissions and Documents: the actions a viewer lacks are missing or disabled.',
    ],
    href: '/dashboard/permissions',
    source: {
      sdk: ['usePermissions()', '<WhenPermission>', '<WhenWorkspaceRoles>'],
    },
    detect: { kind: 'manual' },
    requires: ['change-role'],
  },
  {
    id: 'revoke-invitation',
    group: 'team',
    title: 'Revoke a pending invitation',
    why: 'The link stops working and the seat is released.',
    steps: ['Invite another address and revoke it from the pending list.'],
    href: '/dashboard/team',
    source: { sdk: ['useWorkspaceInvitations().revoke()'] },
    detect: { kind: 'sdk-event', event: 'workspace:invitation-revoked' },
  },
  {
    id: 'seat-limit',
    group: 'team',
    title: 'Hit the seat limit',
    why: 'The plan sets the seats. At the limit the invite form gives way to the limit message, and the server answers 402.',
    steps: ['Invite until the form says the limit is reached.'],
    href: '/dashboard/team',
    source: {
      sdk: ['useSeatStatus()'],
      console: {
        screen: '/dashboard/admin/subscriptions/plans',
        note: 'Plan limits: max users per workspace.',
      },
    },
    detect: { kind: 'manual' },
  },

  // ── Plans and billing ─────────────────────────────────────────────────
  {
    id: 'see-trial',
    group: 'billing',
    title: 'See your trial',
    why: 'A new workspace starts on a trial the plan defines. The dashboard says how long is left.',
    steps: ['Open the dashboard and read the trial card.'],
    href: '/dashboard',
    source: {
      sdk: ['useTrialStatus()', '<WhenTrialing>', '<WhenTrialEnding>'],
      console: {
        screen: '/dashboard/admin/subscriptions/plans',
        note: 'Trial days on the plan.',
      },
    },
    detect: { kind: 'manual' },
  },
  {
    id: 'compare-plans',
    group: 'billing',
    title: 'Compare the plans',
    why: 'The pricing page is generated from the plans in the console: names, prices per interval, quotas, limits and features. Change a price there and it changes here.',
    steps: ['Open Pricing.', 'Switch the billing interval and currency.'],
    href: '/pricing',
    source: {
      sdk: ['<PricingPage slug="main-pricing">', 'usePublicPlans()'],
      console: {
        screen: '/dashboard/admin/subscriptions/plans',
        note: 'Plan groups, plans and versions.',
      },
    },
    detect: { kind: 'manual' },
  },
  {
    id: 'subscribe',
    group: 'billing',
    title: 'Subscribe with a test card',
    why: 'Checkout is Stripe’s, created by the platform for your workspace. Use card 4242 4242 4242 4242.',
    steps: [
      'On Pricing, choose a plan.',
      'Pay with the test card.',
      'You return to the dashboard on the plan.',
    ],
    href: '/pricing',
    source: {
      sdk: ['useCreateCheckoutSession()', 'createCheckoutRedirectUrls()'],
      console: {
        screen: '/dashboard/admin/payment',
        note: 'Stripe keys, in test mode here.',
      },
    },
    detect: { kind: 'webhook', event: 'subscription.created' },
  },
  {
    id: 'trial-banner-gone',
    group: 'billing',
    title: 'Watch the trial banner disappear',
    why: 'Gates re-render from the subscription context the moment it changes.',
    steps: [
      'Back on the dashboard, the trial card is gone and the plan card shows the plan.',
    ],
    href: '/dashboard',
    source: {
      sdk: ['<WhenSubscription>', '<WhenNoSubscription>', 'useSubscription()'],
    },
    detect: { kind: 'manual' },
    requires: ['subscribe'],
  },
  {
    id: 'view-invoice',
    group: 'billing',
    title: 'View an invoice',
    why: 'Invoices come from Stripe through the platform, with a hosted PDF.',
    steps: ['Open Invoices and open the latest one.'],
    href: '/dashboard/invoices',
    source: { sdk: ['useInvoices()', 'useInvoice()'] },
    detect: { kind: 'manual' },
    requires: ['subscribe'],
  },
  {
    id: 'billing-portal',
    group: 'billing',
    title: 'Open the billing portal',
    why: 'Card changes, receipts and cancellation on Stripe’s portal, opened for the workspace.',
    steps: ['On the dashboard’s plan card, choose Manage billing.'],
    href: '/dashboard',
    source: { sdk: ['useBillingPortal()'] },
    detect: { kind: 'manual' },
    requires: ['subscribe'],
  },
  {
    id: 'upgrade',
    group: 'billing',
    title: 'Upgrade to the next plan',
    why: 'Prorated by Stripe; the quotas and features change with the plan.',
    steps: ['On Pricing, choose the higher plan.'],
    href: '/pricing',
    source: { sdk: ['useUpdateSubscription()', 'invalidateSubscription()'] },
    detect: { kind: 'webhook', event: 'subscription.upgraded' },
    requires: ['subscribe'],
  },
  {
    id: 'cancel-resume',
    group: 'billing',
    title: 'Cancel, then resume',
    why: 'Cancellation runs to the period end and can be undone until then.',
    steps: ['Cancel from the plan card.', 'Resume from the same place.'],
    href: '/dashboard',
    source: { sdk: ['useCancelSubscription()', 'useResumeSubscription()'] },
    detect: { kind: 'manual' },
    requires: ['subscribe'],
  },
  {
    id: 'seat-price',
    group: 'billing',
    title: 'See seat pricing change when a member joins',
    why: 'Per-seat plans bill members and pending invitations. The SDK computes the same number the platform bills.',
    steps: ['On Team, invite someone; read the seat line and the plan card.'],
    href: '/dashboard/team',
    source: { sdk: ['getSeatPricing()', 'calculateTotalSubscriptionCents()'] },
    detect: { kind: 'manual' },
    requires: ['subscribe'],
  },

  // ── Usage and quotas ─────────────────────────────────────────────────
  {
    id: 'record-usage',
    group: 'usage',
    title: 'Record usage',
    why: 'Your app meters what it does (a document created, a video processed); the plan says how much is included.',
    steps: [
      'Open Documents and create one.',
      'Read the "What the platform recorded" line under the form.',
      'Open Usage: the documents quota moved.',
    ],
    href: '/dashboard/documents',
    source: {
      sdk: ['bb.usage.record()', 'useQuotaUsageContext().refetch()'],
      console: {
        screen: '/dashboard/admin/subscriptions/plans',
        note: 'The documents quota on each plan: included amount and whether overage is allowed.',
      },
      app: ['src/lib/documents/service.ts', 'src/app/api/documents/route.ts'],
    },
    code: {
      title: 'src/lib/documents/service.ts',
      lang: 'ts',
      body: `await bb.usage.record(workspaceId, {\n  quotaSlug: 'documents',\n  quantity: 1,\n  idempotencyKey: \`doc-create-\${documentId}\`,\n});`,
    },
    detect: { kind: 'action', action: 'document:created' },
  },
  {
    id: 'usage-threshold',
    group: 'usage',
    title: 'Cross the warning threshold',
    why: 'A gate renders at 80% so you can nudge before the limit.',
    steps: ['Create documents until the notice appears above the list.'],
    href: '/dashboard/documents',
    source: {
      sdk: ['<WhenQuotaThreshold slug="documents" threshold={80}>'],
      app: ['src/components/documents/documents-workbench.tsx'],
    },
    detect: { kind: 'manual' },
    requires: ['record-usage'],
  },
  {
    id: 'usage-limit',
    group: 'usage',
    title: 'Hit the limit',
    why: 'At the included amount the server answers 402 and the create button locks, unless the plan allows overage. The UI and the server read the same quota.',
    steps: ['Keep creating until the button locks and a create is refused.'],
    href: '/dashboard/documents',
    source: {
      sdk: ['<WhenQuotaExhausted slug="documents">', 'bb.usage.getQuota()'],
      console: {
        screen: '/dashboard/admin/subscriptions/plans',
        note: 'Quota included amount, overage price, and the "allow overage" switch per plan.',
      },
      app: ['src/lib/documents/service.ts'],
    },
    detect: { kind: 'action', action: 'document:refused-quota' },
    requires: ['record-usage'],
  },
  {
    id: 'usage-log',
    group: 'usage',
    title: 'Read the usage log',
    why: 'Every recorded unit is a row, per workspace and per quota.',
    steps: ['On Usage, open the log.'],
    href: '/dashboard/usage',
    source: {
      sdk: ['useUsageLogs()', 'useAllQuotaUsage()'],
      console: {
        screen: '/dashboard/admin/workspaces',
        note: 'Quota usage per workspace.',
      },
    },
    detect: { kind: 'manual' },
  },

  // ── Credits ──────────────────────────────────────────────────────────
  {
    id: 'see-balance',
    group: 'credits',
    title: 'See your credit balance',
    why: 'A prepaid balance per workspace, granted by the plan or bought in packages.',
    steps: ['Open Credits.'],
    href: '/dashboard/credits',
    source: { sdk: ['<CreditBalance />', 'useCreditBalance()'] },
    detect: { kind: 'manual' },
  },
  {
    id: 'spend-credits',
    group: 'credits',
    title: 'Spend credits on an action',
    why: 'Your server consumes; the balance updates in every open tab.',
    steps: [
      'On Documents, create one: it spends a credit.',
      'Watch the sidebar balance and the metering line change.',
    ],
    href: '/dashboard/documents',
    source: {
      sdk: ['bb.credits.consume()', 'useCreditBalanceContext().refetch()'],
      app: ['src/lib/documents/service.ts'],
    },
    code: {
      title: 'src/lib/documents/service.ts',
      lang: 'ts',
      body: `await bb.credits.consume(workspaceId, {\n  amount: 1,\n  description: 'Document created',\n  idempotencyKey: \`doc-create-\${documentId}\`,\n});`,
    },
    detect: { kind: 'action', action: 'credits:consumed' },
  },
  {
    id: 'credits-low',
    group: 'credits',
    title: 'Run low',
    why: 'A gate at a threshold, so you can offer a top-up before it runs out.',
    steps: [
      'Keep creating documents until the low-balance notice shows above the list.',
    ],
    href: '/dashboard/documents',
    source: {
      sdk: ['<WhenCreditsLow threshold={5}>', '<WhenCreditsExhausted>'],
      app: ['src/components/documents/documents-workbench.tsx'],
    },
    detect: { kind: 'manual' },
    requires: ['spend-credits'],
  },
  {
    id: 'buy-credits',
    group: 'credits',
    title: 'Buy a package',
    why: 'Packages are defined in the console; checkout is Stripe’s.',
    steps: ['On Credits, buy the 100-credit package with the test card.'],
    href: '/dashboard/credits',
    source: {
      sdk: ['<CreditStorePage />', 'usePurchaseCredits()'],
      console: {
        screen: '/dashboard/admin/subscriptions/credit-packages',
        note: 'Credit packages.',
      },
    },
    detect: { kind: 'webhook', event: 'credit.purchased' },
  },
  {
    id: 'credit-transactions',
    group: 'credits',
    title: 'Read the transactions',
    why: 'Every grant, purchase and spend is a row, with the bucket it came from.',
    steps: ['On Credits, scroll to Transactions.'],
    href: '/dashboard/credits',
    source: { sdk: ['useCreditTransactions()', 'useExpiringCredits()'] },
    detect: { kind: 'manual' },
  },

  // ── Feature flags ─────────────────────────────────────────────────────
  {
    id: 'feature-off',
    group: 'features',
    title: 'See a feature that is off',
    why: 'Documents has three sections behind workspace flags: exports, sharing, e-signatures. Off shows a locked state, not a broken button.',
    steps: [
      'Open Documents and scroll to Feature gates.',
      'Find a section marked Disabled.',
    ],
    href: '/dashboard/documents',
    source: {
      sdk: ['<WhenWorkspaceFeatureEnabled>', '<WhenWorkspaceFeatureDisabled>'],
      console: {
        screen: '/dashboard/admin/workspaces/features',
        note: 'Workspace features, with a default and per-workspace overrides.',
      },
    },
    detect: { kind: 'manual' },
  },
  {
    id: 'feature-on',
    group: 'features',
    title: 'See it switched on',
    why: 'Flags change from the console with no deploy. A plan can grant them, and a workspace can be overridden by hand.',
    steps: [
      'Upgrade to a plan that includes a feature, or ask us to switch one on for your workspace.',
      'Reload Documents: the section unlocks.',
    ],
    href: '/dashboard/documents',
    source: {
      sdk: ['useSaaSWorkspaces().currentWorkspace.features'],
      console: {
        screen: '/dashboard/admin/workspaces/features',
        note: 'Per-workspace overrides on top of what the plan grants.',
      },
    },
    detect: { kind: 'manual' },
  },
  {
    id: 'user-feature',
    group: 'features',
    title: 'A flag on a person, not a workspace',
    why: 'User features follow the person across workspaces; workspace features follow the tenant.',
    steps: [
      'Open Profile: the features listed there are yours, not the workspace’s.',
    ],
    href: '/dashboard/profile',
    source: {
      sdk: ['useUserFeatures()', '<WhenUserFeatureEnabled>'],
      console: { screen: '/dashboard/admin/users/features' },
    },
    detect: { kind: 'manual' },
  },

  // ── Permissions ──────────────────────────────────────────────────────
  {
    id: 'permission-matrix',
    group: 'permissions',
    title: 'Read your permission matrix',
    why: 'What your role in this workspace allows, resolved by the platform.',
    steps: ['Open Permissions.'],
    href: '/dashboard/permissions',
    source: {
      sdk: ['usePermissions()', 'resolvePermissions()', 'Permission enum'],
    },
    detect: { kind: 'manual' },
  },
  {
    id: 'forbidden-action',
    group: 'permissions',
    title: 'Try a forbidden action',
    why: 'The buttons are disabled for a viewer; if you call the API anyway the server answers 403. Both read the role the platform holds for you in this workspace.',
    steps: [
      'As a viewer, open Documents: create and delete are disabled.',
      'Send the request anyway, from a terminal or the MCP tools: 403.',
    ],
    href: '/dashboard/documents',
    source: {
      sdk: ['usePermissions().role', 'bb.users.list(workspaceId)'],
      app: ['src/app/api/documents/_shared.ts', 'src/lib/server-auth.ts'],
    },
    code: {
      title: 'Terminal',
      lang: 'bash',
      body: `curl -X DELETE 'https://<this-app>/api/documents/<id>?workspaceId=<ws>' \\\n  -H 'Cookie: bb-session-id=<your session>'\n# {"error":"Forbidden","role":"viewer"}`,
    },
    detect: { kind: 'action', action: 'permission:refused' },
  },
  {
    id: 'custom-role',
    group: 'permissions',
    title: 'See a custom role',
    why: 'Roles and their permissions are defined per organization in the console.',
    steps: [
      'Read the roles on Permissions: this demo defines admin, editor and viewer.',
    ],
    href: '/dashboard/permissions',
    source: {
      console: {
        screen: '/dashboard/admin/workspaces/settings',
        note: 'Roles and their permissions.',
      },
    },
    detect: { kind: 'manual' },
  },

  // ── Notifications ───────────────────────────────────────────────────
  {
    id: 'inbox-first-item',
    group: 'notifications',
    title: 'Find your first notification',
    why: 'Everything the app sends you lands in an inbox you can come back to: one item per notification, however it was delivered.',
    steps: [
      'Click the bell in the header, or open Inbox in the sidebar.',
      'Everything the app has sent you is there; opening the panel marks it seen, not read.',
    ],
    href: '/dashboard/inbox',
    source: {
      sdk: [
        '<NotificationBell />',
        '<NotificationInbox />',
        'useNotifications()',
      ],
    },
    detect: { kind: 'manual' },
  },
  {
    id: 'send-notification',
    group: 'notifications',
    title: 'Send a notification from the app',
    why: 'One call sends by email and push; the platform’s gate decides which channels fire.',
    steps: [
      'Open Notifications. The form is filled in with the "Comment added" event.',
      'Send it to yourself, then look at the bell.',
    ],
    href: '/dashboard/notifications',
    source: {
      sdk: ['bb.notification.send(workspaceId, event, userId, data)'],
      console: {
        screen: '/dashboard/admin/notifications',
        note: 'Custom events, their email template and channels. This demo sends "comment-added".',
      },
      app: [
        'src/app/api/notifications/test/route.ts',
        'src/components/notifications/demo-event.ts',
      ],
    },
    detect: { kind: 'action', action: 'notification:sent' },
  },
  {
    id: 'inbox-live',
    group: 'notifications',
    title: 'Watch it arrive live',
    why: 'Open inboxes are told over a socket and refetch; no reload.',
    steps: ['Keep the inbox open in one tab and send from another.'],
    href: '/dashboard/inbox',
    source: { sdk: ['useNotifications({ live: true })'] },
    detect: { kind: 'manual' },
    requires: ['send-notification'],
  },
  {
    id: 'open-from-email',
    group: 'notifications',
    title: 'Open it from the email',
    why: 'Clicking the email link marks the inbox item read; merely opening the email does not.',
    steps: [
      'Open the email you received and follow its link.',
      'The inbox item is read, "by email click".',
    ],
    href: '/dashboard/inbox',
    source: {
      console: {
        screen: '/dashboard/admin/notifications?tab=log',
        note: 'The delivery log: what each channel did, per person.',
      },
    },
    detect: { kind: 'manual' },
    requires: ['send-notification'],
  },
  {
    id: 'mark-all-read',
    group: 'notifications',
    title: 'Mark all as read, archive one',
    why: 'Read, seen and archived are separate states, kept per person.',
    steps: ['In the inbox, archive one item and mark the rest read.'],
    href: '/dashboard/inbox',
    source: { sdk: ['useNotifications().markAllRead()', 'archive()'] },
    detect: { kind: 'manual' },
  },
  {
    id: 'notification-preferences',
    group: 'notifications',
    title: 'Turn a channel off for yourself',
    why: 'Each member chooses how they are interrupted; the workspace admin sets the defaults and can mark an event required.',
    steps: [
      'Settings → Notifications.',
      'Turn email off for "Comment added"; send again and see it arrive in the inbox only.',
    ],
    href: '/dashboard/settings',
    source: {
      sdk: [
        'openWorkspaceSettings("notifications")',
        'getMyNotificationPreferences()',
      ],
    },
    detect: { kind: 'manual' },
  },
  {
    id: 'required-event',
    group: 'notifications',
    title: 'See a required event',
    why: 'An admin can make an event required; members cannot switch it off.',
    steps: ['Settings → Notifications: "Weekly report" is locked.'],
    href: '/dashboard/settings',
    source: { sdk: ['updateNotificationPreferences({ required: true })'] },
    detect: { kind: 'manual' },
  },
  {
    id: 'delivery-log',
    group: 'notifications',
    title: 'See the console’s delivery log',
    why: 'Every notification every user was sent, with what email and push did, and whether it was read.',
    steps: [
      'Read the screenshot on this task; the log is in the console, not the app.',
    ],
    source: {
      console: {
        screen: '/dashboard/admin/notifications?tab=log',
        image: '/tour/console-delivery-log.png',
      },
    },
    detect: { kind: 'manual' },
  },

  // ── Push ────────────────────────────────────────────────────────────
  {
    id: 'push-subscribe',
    group: 'push',
    title: 'Subscribe this browser to push',
    why: 'Web push with the platform’s VAPID keys and a service worker the SDK ships.',
    steps: ['Open Notifications and enable push.', 'Allow the browser prompt.'],
    href: '/dashboard/notifications',
    source: {
      sdk: ['usePushNotifications().subscribe()', 'PUSH_SERVICE_WORKER_SCRIPT'],
      console: {
        screen: '/dashboard/admin/push',
        note: 'VAPID keys and campaigns.',
      },
    },
    detect: { kind: 'manual' },
  },
  {
    id: 'push-receive',
    group: 'push',
    title: 'Receive a push',
    why: 'Sent per device, delivered by the browser even when the tab is closed.',
    steps: ['Send the "Comment added" event to yourself with push on.'],
    href: '/dashboard/notifications',
    source: { sdk: ['bb.notification.send()'] },
    detect: { kind: 'manual' },
    requires: ['push-subscribe'],
  },
  {
    id: 'push-click',
    group: 'push',
    title: 'Click it',
    why: 'The click goes through the platform’s link check and marks the inbox item read.',
    steps: ['Click the push notification.'],
    href: '/dashboard/inbox',
    detect: { kind: 'manual' },
    source: {},
    requires: ['push-receive'],
  },

  // ── Agents and MCP ───────────────────────────────────────────────────
  {
    id: 'mcp-config',
    group: 'agents',
    title: 'Set up your MCP client',
    why: 'This app is an MCP server. Any MCP client signs in with your BuildBase account and acts as you.',
    steps: [
      'Open Profile → Connected agents.',
      'Pick your client in the guide and follow its steps: the server address is this app’s /api/mcp.',
    ],
    href: '/dashboard/profile',
    source: {
      sdk: ['<ConnectMcpGuide />', 'createAgentStack()', 'buildbaseAuth()'],
      app: [
        'src/lib/agent/index.ts',
        'src/app/api/mcp/route.ts',
        'src/components/agents/connected-agents-card.tsx',
      ],
    },
    code: {
      title: 'claude_desktop_config.json',
      lang: 'json',
      body: `{\n  "mcpServers": {\n    "buildbase-demo": { "url": "https://<this-app>/api/mcp" }\n  }\n}`,
    },
    detect: { kind: 'manual' },
  },
  {
    id: 'mcp-connect',
    group: 'agents',
    title: 'Connect an agent',
    why: 'The client discovers the OAuth server from /.well-known, signs you in on the hosted pages, and receives a token this app minted with its own secret.',
    steps: ['Restart the client and approve the connection.'],
    href: '/dashboard/profile',
    source: {
      sdk: ['handleAppTokenRequest()', 'resolveAgentPath()'],
      app: [
        'src/app/api/auth/oauth2-token/route.ts',
        'src/app/.well-known/[...path]/route.ts',
      ],
    },
    detect: { kind: 'action', action: 'agent:connected' },
  },
  {
    id: 'mcp-call',
    group: 'agents',
    title: 'Ask it to list your documents',
    why: 'Built-in tools read your account; the app’s own tools read and write its data, under your permissions.',
    steps: [
      'Ask: "List my documents in BuildBase Demo".',
      'The agent calls list_documents; the tour ticks the moment a tool runs as you.',
    ],
    source: {
      sdk: ['defineMcpTool()', 'builtinTools: "readonly"'],
      app: ['src/lib/agent/tools.ts'],
    },
    detect: { kind: 'action', action: 'mcp:tool-called' },
    requires: ['mcp-connect'],
  },
  {
    id: 'mcp-write',
    group: 'agents',
    title: 'Ask it to create one',
    why: 'A write through an agent is metered and permission-checked exactly like a click.',
    steps: [
      'Ask: "Create a document called Agent test".',
      'That needs the documents:write scope you granted on the consent screen.',
    ],
    source: {
      sdk: ['requiredScopes: ["documents:write"]'],
      app: ['src/lib/agent/tools.ts'],
    },
    detect: { kind: 'action', action: 'mcp:document-created' },
    requires: ['mcp-connect'],
  },
  {
    id: 'agent-list',
    group: 'agents',
    title: 'See the connected agent, and disconnect it',
    why: 'Every agent grant is listed with its scopes, and can be revoked.',
    steps: ['Profile → Connected agents → Disconnect.'],
    href: '/dashboard/profile',
    source: {
      sdk: ['<ConnectedAgents />', 'useConnectedAgents()'],
      app: ['src/components/agents/connected-agents-card.tsx'],
    },
    detect: { kind: 'manual' },
    requires: ['mcp-connect'],
  },
  {
    id: 'llms-txt',
    group: 'agents',
    title: 'Read what agents read',
    why: 'llms.txt, the API catalog and the .well-known documents are generated from one config.',
    steps: [
      'Open /llms.txt, then /.well-known/mcp/server-card.json and /openapi.json.',
    ],
    href: '/llms.txt',
    source: {
      sdk: ['buildLlmsTxt()', 'buildMcpServerCard()'],
      app: ['src/lib/agent/content.ts'],
    },
    detect: { kind: 'manual' },
  },

  // ── Webhooks ──────────────────────────────────────────────────────────
  {
    id: 'webhook-received',
    group: 'webhooks',
    title: 'See a platform event land in this app’s database',
    why: 'Subscriptions, workspaces and members change on the platform; webhooks tell your server, signed.',
    steps: [
      'Do anything the platform notices: invite someone, subscribe, buy credits.',
      'Open Events: the webhooks table lists what arrived, each one signature-checked before it was stored.',
    ],
    href: '/dashboard/events',
    source: {
      sdk: ['verifyWebhookSignature()', 'parseWebhookEvent()'],
      console: {
        screen: '/dashboard/admin/setting/webhooks',
        note: 'Webhook endpoints, the events each one gets, and its signing secret.',
      },
      app: ['src/app/api/webhooks/buildbase/route.ts'],
    },
    code: {
      title: 'src/app/api/webhooks/buildbase/route.ts',
      lang: 'ts',
      body: `const body = await request.text();\nconst event = parseWebhookEvent({\n  body,\n  signature: request.headers.get('x-buildbase-signature'),\n  timestamp: request.headers.get('x-buildbase-timestamp'),\n  secret: process.env.BUILDBASE_WEBHOOK_SECRET!,\n});\nif (!event) return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });`,
    },
    detect: { kind: 'webhook', event: '*' },
  },
  {
    id: 'sdk-events',
    group: 'webhooks',
    title: 'See the browser events too',
    why: 'The SDK emits lifecycle events in the browser; this app forwards them to keep its own tables in step.',
    steps: ['On Events, read the app-event table.'],
    href: '/dashboard/events',
    source: {
      sdk: ['SDKEvent', 'handleEvent callback'],
      app: ['src/app/api/events/route.ts'],
    },
    detect: { kind: 'manual' },
  },

  // ── Platform ─────────────────────────────────────────────────────────
  {
    id: 'switch-language',
    group: 'platform',
    title: 'Switch language',
    why: 'Eight languages in the SDK’s own screens and in this app, with ICU plurals and native numerals.',
    steps: ['Use the language switcher in the header.'],
    href: '/dashboard',
    source: {
      sdk: [
        '<SaaSOSProvider locale="hi">',
        'useTranslation()',
        'SUPPORTED_LOCALES',
      ],
    },
    detect: { kind: 'manual' },
  },
  {
    id: 'rtl',
    group: 'platform',
    title: 'Try Arabic',
    why: 'Right-to-left layout in the SDK screens, not just translated strings.',
    steps: ['Switch to العربية and open Settings.'],
    href: '/dashboard/settings',
    source: { sdk: ['dir from useTranslation()'] },
    detect: { kind: 'manual' },
  },
  {
    id: 'dark-mode',
    group: 'platform',
    title: 'Toggle dark mode',
    why: 'The SDK’s screens follow your app’s .dark class and CSS variables.',
    steps: ['Use the theme toggle.'],
    href: '/dashboard',
    source: { sdk: ['@buildbase/sdk/css', 'docs/THEMING.md'] },
    detect: { kind: 'manual' },
  },
  {
    id: 'export-data',
    group: 'platform',
    title: 'Export your data',
    why: 'GDPR Article 15: this app’s own data plus your profile from the platform, in one file.',
    steps: ['Profile → Export my data.'],
    href: '/dashboard/profile',
    source: { app: ['src/app/api/user/export/route.ts'] },
    detect: { kind: 'action', action: 'user:exported' },
  },
  {
    id: 'clone-it',
    group: 'platform',
    title: 'Take it home',
    why: 'Everything you just did is in this repository. Clone it, point it at your organization, and start from here.',
    steps: [
      'git clone https://github.com/buildbase-app/nextjs-starter',
      'Copy .env.example to .env.local and fill in your org and client.',
      'npm install && npm run dev',
    ],
    source: { app: ['README.md', '.env.example'] },
    code: {
      title: 'Terminal',
      lang: 'bash',
      body: `git clone https://github.com/buildbase-app/nextjs-starter\ncd nextjs-starter\ncp .env.example .env.local\nnpm install\nnpm run dev`,
    },
    detect: { kind: 'manual' },
  },
  {
    id: 'delete-account',
    group: 'platform',
    title: 'Delete your account',
    why: 'GDPR Article 17: erased here and on the platform.',
    steps: ['Profile → Delete my account. This ends the tour.'],
    href: '/dashboard/profile',
    source: { app: ['src/app/api/user/delete/route.ts'] },
    detect: { kind: 'manual' },
  },
];

const BY_ID = new Map(TOUR_TASKS.map((t) => [t.id, t]));

export function taskById(id: string): TourTask | undefined {
  return BY_ID.get(id);
}

export function tasksInGroup(group: TourGroup['id']): TourTask[] {
  return TOUR_TASKS.filter((t) => t.group === group);
}

export const CONSOLE_URL = CONSOLE;
