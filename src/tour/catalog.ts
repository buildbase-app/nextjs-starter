import type { TaskId } from './ids';
import type { TourGroupId, TourTaskDefinition } from './types';

/**
 * The tour's structure: which tasks exist, what they point at, and how each
 * one gets ticked. The words live in `./text/<locale>.ts`, one file per
 * language, all typed against the same ids, so a task cannot ship without
 * its text in every language.
 */

export const TOUR_GROUP_IDS: TourGroupId[] = [
  'start',
  'workspaces',
  'team',
  'billing',
  'usage',
  'credits',
  'features',
  'permissions',
  'notifications',
  'push',
  'agents',
  'webhooks',
  'platform',
];

const CONSOLE = 'https://console.buildbase.app';

export const TOUR_TASKS: TourTaskDefinition[] = [
  // ── Get started ──
  {
    id: 'sign-up',
    group: 'start',
    href: '/dashboard',
    source: {
      sdk: ['useSaaSAuth().signIn()', '<SaaSOSProvider auth={...}>'],
      console: {
        screen: '/dashboard/admin/auth',
        note: 'The OAuth2 client, its redirect URLs and the enabled sign-in methods.',
      },
      app: ['src/components/saas-provider.tsx', 'src/app/api/auth/*'],
    },
    detect: {
      kind: 'sdk-event',
      event: 'user:created',
    },
  },
  {
    id: 'trust-device',
    group: 'start',
    href: '/dashboard/profile',
    source: {
      sdk: ['<Devices />', '<Sessions />', 'useSessions()'],
      console: {
        screen: '/dashboard/admin/users',
        note: 'Each user’s devices and live sessions.',
      },
    },
    detect: {
      kind: 'manual',
    },
  },
  {
    id: 'add-passkey',
    group: 'start',
    href: '/dashboard/profile',
    source: {
      sdk: ['openWorkspaceSettings("security")'],
      console: {
        screen: '/dashboard/admin/auth',
        note: 'Sign-in methods: Passkey.',
      },
    },
    detect: {
      kind: 'manual',
    },
  },
  {
    id: 'see-session',
    group: 'start',
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
      body: "export const bb = BuildBase({\n  serverUrl: process.env.NEXT_PUBLIC_BUILDBASE_SERVER_URL!,\n  orgId: process.env.NEXT_PUBLIC_BUILDBASE_ORG_ID!,\n  getSessionId: async () => (await cookies()).get('bb-session-id')?.value ?? null,\n});",
    },
    detect: {
      kind: 'manual',
    },
  },
  {
    id: 'sign-out-everywhere',
    group: 'start',
    href: '/dashboard/profile',
    source: {
      sdk: ['signOut({ everywhere: true })', 'SessionsApi.revoke()'],
    },
    detect: {
      kind: 'manual',
    },
  },
  // ── Workspaces ──
  {
    id: 'first-workspace',
    group: 'workspaces',
    href: '/dashboard',
    source: {
      sdk: ['useSaaSWorkspaces()', '<WorkspaceSwitcher />'],
      console: {
        screen: '/dashboard/admin/workspaces/settings',
        note: 'Auto-create the first workspace, who may create more, and the ceilings.',
      },
    },
    detect: {
      kind: 'manual',
    },
  },
  {
    id: 'create-workspace',
    group: 'workspaces',
    href: '/dashboard',
    source: {
      sdk: ['useSaaSWorkspaces().createWorkspace()'],
      console: {
        screen: '/dashboard/admin/workspaces/settings',
        note: 'Max workspaces per user.',
      },
    },
    detect: {
      kind: 'sdk-event',
      event: 'workspace:created',
    },
    requires: ['sign-up'],
  },
  {
    id: 'switch-workspace',
    group: 'workspaces',
    href: '/dashboard',
    source: {
      sdk: [
        'useSaaSWorkspaces().switchToWorkspace()',
        'onWorkspaceChange callback',
      ],
      app: ['src/app/api/auth/workspace-token/route.ts'],
    },
    detect: {
      kind: 'sdk-event',
      event: 'workspace:changed',
    },
    requires: ['create-workspace'],
  },
  {
    id: 'rename-workspace',
    group: 'workspaces',
    href: '/dashboard/settings',
    source: {
      sdk: ['openWorkspaceSettings("general")', 'ui.settings.* switches'],
    },
    detect: {
      kind: 'sdk-event',
      event: 'workspace:updated',
    },
  },
  {
    id: 'workspace-settings-screens',
    group: 'workspaces',
    href: '/dashboard/settings',
    source: {
      sdk: ['SETTINGS_SCREENS', '<SaaSOSProvider ui={{ settings: {...} }}>'],
    },
    detect: {
      kind: 'manual',
    },
  },
  {
    id: 'delete-workspace',
    group: 'workspaces',
    href: '/dashboard/settings',
    source: {
      sdk: [
        'useSaaSWorkspaces().deleteWorkspace()',
        '<WhenPermission permission="WORKSPACE_DELETE">',
      ],
    },
    detect: {
      kind: 'sdk-event',
      event: 'workspace:deleted',
    },
    requires: ['create-workspace'],
  },
  // ── Team ──
  {
    id: 'invite-member',
    group: 'team',
    href: '/dashboard/team',
    source: {
      sdk: ['useSaaSWorkspaces().inviteMember()', 'useWorkspaceInvitations()'],
      console: {
        screen: '/dashboard/admin/workspaces',
        note: 'Each workspace’s invitations, with resend and revoke.',
      },
    },
    detect: {
      kind: 'sdk-event',
      event: 'workspace:invitation-sent',
    },
  },
  {
    id: 'pending-seat',
    group: 'team',
    href: '/dashboard/team',
    source: {
      sdk: ['useSeatStatus(workspace, { pendingInvitations })'],
    },
    detect: {
      kind: 'manual',
    },
    requires: ['invite-member'],
  },
  {
    id: 'accept-invitation',
    group: 'team',
    href: '/dashboard/team',
    source: {
      sdk: [
        'useMyInvitations()',
        '<PendingInvitations />',
        '<WhenPendingInvitations>',
      ],
    },
    detect: {
      kind: 'sdk-event',
      event: 'workspace:invitation-accepted',
    },
    requires: ['invite-member'],
  },
  {
    id: 'change-role',
    group: 'team',
    href: '/dashboard/team',
    source: {
      sdk: ['useSaaSWorkspaces().updateUser(workspaceId, userId, { role })'],
      console: {
        screen: '/dashboard/admin/workspaces/settings',
        note: 'The roles a workspace offers and the default.',
      },
    },
    detect: {
      kind: 'sdk-event',
      event: 'workspace:user-role-changed',
    },
    requires: ['accept-invitation'],
  },
  {
    id: 'viewer-limits',
    group: 'team',
    href: '/dashboard/permissions',
    source: {
      sdk: ['usePermissions()', '<WhenPermission>', '<WhenWorkspaceRoles>'],
    },
    detect: {
      kind: 'manual',
    },
    requires: ['change-role'],
  },
  {
    id: 'revoke-invitation',
    group: 'team',
    href: '/dashboard/team',
    source: {
      sdk: ['useWorkspaceInvitations().revoke()'],
    },
    detect: {
      kind: 'sdk-event',
      event: 'workspace:invitation-revoked',
    },
  },
  {
    id: 'seat-limit',
    group: 'team',
    href: '/dashboard/team',
    source: {
      sdk: ['useSeatStatus()'],
      console: {
        screen: '/dashboard/admin/subscriptions/plans',
        note: 'Plan limits: max users per workspace.',
      },
    },
    detect: {
      kind: 'manual',
    },
  },
  // ── Plans and billing ──
  {
    id: 'see-trial',
    group: 'billing',
    href: '/dashboard',
    source: {
      sdk: ['useTrialStatus()', '<WhenTrialing>', '<WhenTrialEnding>'],
      console: {
        screen: '/dashboard/admin/subscriptions/plans',
        note: 'Trial days on the plan.',
      },
    },
    detect: {
      kind: 'manual',
    },
  },
  {
    id: 'compare-plans',
    group: 'billing',
    href: '/pricing',
    source: {
      sdk: ['<PricingPage slug="main-pricing">', 'usePublicPlans()'],
      console: {
        screen: '/dashboard/admin/subscriptions/plans',
        note: 'Plan groups, plans and versions.',
      },
    },
    detect: {
      kind: 'manual',
    },
  },
  {
    id: 'subscribe',
    group: 'billing',
    href: '/pricing',
    source: {
      sdk: ['useCreateCheckoutSession()', 'createCheckoutRedirectUrls()'],
      console: {
        screen: '/dashboard/admin/payment',
        note: 'Stripe keys, in test mode here.',
      },
    },
    detect: {
      kind: 'webhook',
      event: 'subscription.created',
    },
  },
  {
    id: 'trial-banner-gone',
    group: 'billing',
    href: '/dashboard',
    source: {
      sdk: ['<WhenSubscription>', '<WhenNoSubscription>', 'useSubscription()'],
    },
    detect: {
      kind: 'manual',
    },
    requires: ['subscribe'],
  },
  {
    id: 'view-invoice',
    group: 'billing',
    href: '/dashboard/invoices',
    source: {
      sdk: ['useInvoices()', 'useInvoice()'],
    },
    detect: {
      kind: 'manual',
    },
    requires: ['subscribe'],
  },
  {
    id: 'billing-portal',
    group: 'billing',
    href: '/dashboard',
    source: {
      sdk: ['useBillingPortal()'],
    },
    detect: {
      kind: 'manual',
    },
    requires: ['subscribe'],
  },
  {
    id: 'upgrade',
    group: 'billing',
    href: '/pricing',
    source: {
      sdk: ['useUpdateSubscription()', 'invalidateSubscription()'],
    },
    detect: {
      kind: 'webhook',
      event: 'subscription.upgraded',
    },
    requires: ['subscribe'],
  },
  {
    id: 'cancel-resume',
    group: 'billing',
    href: '/dashboard',
    source: {
      sdk: ['useCancelSubscription()', 'useResumeSubscription()'],
    },
    detect: {
      kind: 'manual',
    },
    requires: ['subscribe'],
  },
  {
    id: 'seat-price',
    group: 'billing',
    href: '/dashboard/team',
    source: {
      sdk: ['getSeatPricing()', 'calculateTotalSubscriptionCents()'],
    },
    detect: {
      kind: 'manual',
    },
    requires: ['subscribe'],
  },
  // ── Usage and quotas ──
  {
    id: 'record-usage',
    group: 'usage',
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
      body: "await bb.usage.record(workspaceId, {\n  quotaSlug: 'documents',\n  quantity: 1,\n  idempotencyKey: `doc-create-${documentId}`,\n});",
    },
    detect: {
      kind: 'action',
      action: 'document:created',
    },
  },
  {
    id: 'usage-threshold',
    group: 'usage',
    href: '/dashboard/documents',
    source: {
      sdk: ['<WhenQuotaThreshold slug="documents" threshold={80}>'],
      app: ['src/components/documents/documents-workbench.tsx'],
    },
    detect: {
      kind: 'manual',
    },
    requires: ['record-usage'],
  },
  {
    id: 'usage-limit',
    group: 'usage',
    href: '/dashboard/documents',
    source: {
      sdk: ['<WhenQuotaExhausted slug="documents">', 'bb.usage.getQuota()'],
      console: {
        screen: '/dashboard/admin/subscriptions/plans',
        note: 'Quota included amount, overage price, and the "allow overage" switch per plan.',
      },
      app: ['src/lib/documents/service.ts'],
    },
    detect: {
      kind: 'action',
      action: 'document:refused-quota',
    },
    requires: ['record-usage'],
  },
  {
    id: 'usage-log',
    group: 'usage',
    href: '/dashboard/usage',
    source: {
      sdk: ['useUsageLogs()', 'useAllQuotaUsage()'],
      console: {
        screen: '/dashboard/admin/workspaces',
        note: 'Quota usage per workspace.',
      },
    },
    detect: {
      kind: 'manual',
    },
  },
  // ── Credits ──
  {
    id: 'see-balance',
    group: 'credits',
    href: '/dashboard/credits',
    source: {
      sdk: ['<CreditBalance />', 'useCreditBalance()'],
    },
    detect: {
      kind: 'manual',
    },
  },
  {
    id: 'spend-credits',
    group: 'credits',
    href: '/dashboard/documents',
    source: {
      sdk: ['bb.credits.consume()', 'useCreditBalanceContext().refetch()'],
      app: ['src/lib/documents/service.ts'],
    },
    code: {
      title: 'src/lib/documents/service.ts',
      lang: 'ts',
      body: "await bb.credits.consume(workspaceId, {\n  amount: 1,\n  description: 'Document created',\n  idempotencyKey: `doc-create-${documentId}`,\n});",
    },
    detect: {
      kind: 'action',
      action: 'credits:consumed',
    },
  },
  {
    id: 'credits-low',
    group: 'credits',
    href: '/dashboard/documents',
    source: {
      sdk: ['<WhenCreditsLow threshold={5}>', '<WhenCreditsExhausted>'],
      app: ['src/components/documents/documents-workbench.tsx'],
    },
    detect: {
      kind: 'manual',
    },
    requires: ['spend-credits'],
  },
  {
    id: 'buy-credits',
    group: 'credits',
    href: '/dashboard/credits',
    source: {
      sdk: ['<CreditStorePage />', 'usePurchaseCredits()'],
      console: {
        screen: '/dashboard/admin/subscriptions/credit-packages',
        note: 'Credit packages.',
      },
    },
    detect: {
      kind: 'webhook',
      event: 'credit.purchased',
    },
  },
  {
    id: 'credit-transactions',
    group: 'credits',
    href: '/dashboard/credits',
    source: {
      sdk: ['useCreditTransactions()', 'useExpiringCredits()'],
    },
    detect: {
      kind: 'manual',
    },
  },
  // ── Feature flags ──
  {
    id: 'feature-off',
    group: 'features',
    href: '/dashboard/documents',
    source: {
      sdk: ['<WhenWorkspaceFeatureEnabled>', '<WhenWorkspaceFeatureDisabled>'],
      console: {
        screen: '/dashboard/admin/workspaces/features',
        note: 'Workspace features, with a default and per-workspace overrides.',
      },
    },
    detect: {
      kind: 'manual',
    },
  },
  {
    id: 'feature-on',
    group: 'features',
    href: '/dashboard/documents',
    source: {
      sdk: ['useSaaSWorkspaces().currentWorkspace.features'],
      console: {
        screen: '/dashboard/admin/workspaces/features',
        note: 'Per-workspace overrides on top of what the plan grants.',
      },
    },
    detect: {
      kind: 'manual',
    },
  },
  {
    id: 'user-feature',
    group: 'features',
    href: '/dashboard/profile',
    source: {
      sdk: ['useUserFeatures()', '<WhenUserFeatureEnabled>'],
      console: {
        screen: '/dashboard/admin/users/features',
      },
    },
    detect: {
      kind: 'manual',
    },
  },
  // ── Permissions ──
  {
    id: 'permission-matrix',
    group: 'permissions',
    href: '/dashboard/permissions',
    source: {
      sdk: ['usePermissions()', 'resolvePermissions()', 'Permission enum'],
    },
    detect: {
      kind: 'manual',
    },
  },
  {
    id: 'forbidden-action',
    group: 'permissions',
    href: '/dashboard/documents',
    source: {
      sdk: ['usePermissions().role', 'bb.users.list(workspaceId)'],
      app: ['src/app/api/documents/_shared.ts', 'src/lib/server-auth.ts'],
    },
    code: {
      title: 'Terminal',
      lang: 'bash',
      body: 'curl -X DELETE \'https://<this-app>/api/documents/<id>?workspaceId=<ws>\' \\\n  -H \'Cookie: bb-session-id=<your session>\'\n# {"error":"Forbidden","role":"viewer"}',
    },
    detect: {
      kind: 'action',
      action: 'permission:refused',
    },
  },
  {
    id: 'custom-role',
    group: 'permissions',
    href: '/dashboard/permissions',
    source: {
      console: {
        screen: '/dashboard/admin/workspaces/settings',
        note: 'Roles and their permissions.',
      },
    },
    detect: {
      kind: 'manual',
    },
  },
  // ── Notifications ──
  {
    id: 'inbox-first-item',
    group: 'notifications',
    href: '/dashboard/inbox',
    source: {
      sdk: [
        '<NotificationBell />',
        '<NotificationInbox />',
        'useNotifications()',
      ],
    },
    detect: {
      kind: 'manual',
    },
  },
  {
    id: 'send-notification',
    group: 'notifications',
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
    detect: {
      kind: 'action',
      action: 'notification:sent',
    },
  },
  {
    id: 'inbox-live',
    group: 'notifications',
    href: '/dashboard/inbox',
    source: {
      sdk: ['useNotifications({ live: true })'],
    },
    detect: {
      kind: 'manual',
    },
    requires: ['send-notification'],
  },
  {
    id: 'open-from-email',
    group: 'notifications',
    href: '/dashboard/inbox',
    source: {
      console: {
        screen: '/dashboard/admin/notifications?tab=log',
        note: 'The delivery log: what each channel did, per person.',
      },
    },
    detect: {
      kind: 'manual',
    },
    requires: ['send-notification'],
  },
  {
    id: 'mark-all-read',
    group: 'notifications',
    href: '/dashboard/inbox',
    source: {
      sdk: ['useNotifications().markAllRead()', 'archive()'],
    },
    detect: {
      kind: 'manual',
    },
  },
  {
    id: 'notification-preferences',
    group: 'notifications',
    href: '/dashboard/settings',
    source: {
      sdk: [
        'openWorkspaceSettings("notifications")',
        'getMyNotificationPreferences()',
      ],
    },
    detect: {
      kind: 'manual',
    },
  },
  {
    id: 'required-event',
    group: 'notifications',
    href: '/dashboard/settings',
    source: {
      sdk: ['updateNotificationPreferences({ required: true })'],
    },
    detect: {
      kind: 'manual',
    },
  },
  {
    id: 'delivery-log',
    group: 'notifications',
    source: {
      console: {
        screen: '/dashboard/admin/notifications?tab=log',
        image: '/tour/console-delivery-log.png',
      },
    },
    detect: {
      kind: 'manual',
    },
  },
  // ── Push ──
  {
    id: 'push-subscribe',
    group: 'push',
    href: '/dashboard/notifications',
    source: {
      sdk: ['usePushNotifications().subscribe()', 'PUSH_SERVICE_WORKER_SCRIPT'],
      console: {
        screen: '/dashboard/admin/push',
        note: 'VAPID keys and campaigns.',
      },
    },
    detect: {
      kind: 'manual',
    },
  },
  {
    id: 'push-receive',
    group: 'push',
    href: '/dashboard/notifications',
    source: {
      sdk: ['bb.notification.send()'],
    },
    detect: {
      kind: 'manual',
    },
    requires: ['push-subscribe'],
  },
  {
    id: 'push-click',
    group: 'push',
    href: '/dashboard/inbox',
    source: {},
    detect: {
      kind: 'manual',
    },
    requires: ['push-receive'],
  },
  // ── Agents and MCP ──
  {
    id: 'mcp-config',
    group: 'agents',
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
      body: '{\n  "mcpServers": {\n    "buildbase-demo": { "url": "https://<this-app>/api/mcp" }\n  }\n}',
    },
    detect: {
      kind: 'manual',
    },
  },
  {
    id: 'mcp-connect',
    group: 'agents',
    href: '/dashboard/profile',
    source: {
      sdk: ['handleAppTokenRequest()', 'resolveAgentPath()'],
      app: [
        'src/app/api/auth/oauth2-token/route.ts',
        'src/app/.well-known/[...path]/route.ts',
      ],
    },
    detect: {
      kind: 'action',
      action: 'agent:connected',
    },
  },
  {
    id: 'mcp-call',
    group: 'agents',
    source: {
      sdk: ['defineMcpTool()', 'builtinTools: "readonly"'],
      app: ['src/lib/agent/tools.ts'],
    },
    detect: {
      kind: 'action',
      action: 'mcp:tool-called',
    },
    requires: ['mcp-connect'],
  },
  {
    id: 'mcp-write',
    group: 'agents',
    source: {
      sdk: ['requiredScopes: ["documents:write"]'],
      app: ['src/lib/agent/tools.ts'],
    },
    detect: {
      kind: 'action',
      action: 'mcp:document-created',
    },
    requires: ['mcp-connect'],
  },
  {
    id: 'agent-list',
    group: 'agents',
    href: '/dashboard/profile',
    source: {
      sdk: ['<ConnectedAgents />', 'useConnectedAgents()'],
      app: ['src/components/agents/connected-agents-card.tsx'],
    },
    detect: {
      kind: 'manual',
    },
    requires: ['mcp-connect'],
  },
  {
    id: 'llms-txt',
    group: 'agents',
    href: '/llms.txt',
    source: {
      sdk: ['buildLlmsTxt()', 'buildMcpServerCard()'],
      app: ['src/lib/agent/content.ts'],
    },
    detect: {
      kind: 'manual',
    },
  },
  // ── Webhooks ──
  {
    id: 'webhook-received',
    group: 'webhooks',
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
      body: "const body = await request.text();\nconst event = parseWebhookEvent({\n  body,\n  signature: request.headers.get('x-buildbase-signature'),\n  timestamp: request.headers.get('x-buildbase-timestamp'),\n  secret: process.env.BUILDBASE_WEBHOOK_SECRET!,\n});\nif (!event) return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });",
    },
    detect: {
      kind: 'webhook',
      event: '*',
    },
  },
  {
    id: 'sdk-events',
    group: 'webhooks',
    href: '/dashboard/events',
    source: {
      sdk: ['SDKEvent', 'handleEvent callback'],
      app: ['src/app/api/events/route.ts'],
    },
    detect: {
      kind: 'manual',
    },
  },
  // ── Platform ──
  {
    id: 'switch-language',
    group: 'platform',
    href: '/dashboard',
    source: {
      sdk: [
        '<SaaSOSProvider locale="hi">',
        'useTranslation()',
        'SUPPORTED_LOCALES',
      ],
    },
    detect: {
      kind: 'manual',
    },
  },
  {
    id: 'rtl',
    group: 'platform',
    href: '/dashboard/settings',
    source: {
      sdk: ['dir from useTranslation()'],
    },
    detect: {
      kind: 'manual',
    },
  },
  {
    id: 'dark-mode',
    group: 'platform',
    href: '/dashboard',
    source: {
      sdk: ['@buildbase/sdk/css', 'docs/THEMING.md'],
    },
    detect: {
      kind: 'manual',
    },
  },
  {
    id: 'export-data',
    group: 'platform',
    href: '/dashboard/profile',
    source: {
      app: ['src/app/api/user/export/route.ts'],
    },
    detect: {
      kind: 'action',
      action: 'user:exported',
    },
  },
  {
    id: 'clone-it',
    group: 'platform',
    source: {
      app: ['README.md', '.env.example'],
    },
    code: {
      title: 'Terminal',
      lang: 'bash',
      body: 'git clone https://github.com/buildbase-app/nextjs-starter\ncd nextjs-starter\ncp .env.example .env.local\nnpm install\nnpm run dev',
    },
    detect: {
      kind: 'manual',
    },
  },
  {
    id: 'delete-account',
    group: 'platform',
    href: '/dashboard/profile',
    source: {
      app: ['src/app/api/user/delete/route.ts'],
    },
    detect: {
      kind: 'manual',
    },
  },
];

const BY_ID = new Map(TOUR_TASKS.map((t) => [t.id, t]));

export function taskById(id: string): TourTaskDefinition | undefined {
  return BY_ID.get(id as TaskId);
}

export function tasksInGroup(group: TourGroupId): TourTaskDefinition[] {
  return TOUR_TASKS.filter((t) => t.group === group);
}

export const CONSOLE_URL = CONSOLE;
