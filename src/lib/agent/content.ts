import { siteConfig } from '@/config/site';

/**
 * Agent-facing prose: llms.txt, llms-full.txt and the installable SKILL.md.
 * Generated from one feature inventory so the machine-readable tour and the
 * human dashboard never drift apart.
 */

export interface FeatureEntry {
  slug: string;
  title: string;
  path: string;
  summary: string;
  sdk: string[];
  mcpTools?: string[];
}

export const FEATURES: FeatureEntry[] = [
  {
    slug: 'auth',
    title: 'OAuth sign-in and sessions',
    path: '/dashboard',
    summary:
      'Hosted BuildBase login (email, magic link, social, passkeys). The app exchanges the code server-side, stores the platform session in an httpOnly cookie and mints its own app token.',
    sdk: [
      'SaaSOSProvider',
      'useSaaSAuth',
      'WhenAuthenticated',
      'BuildBase().auth()',
    ],
    mcpTools: ['get_user_profile'],
  },
  {
    slug: 'workspaces',
    title: 'Multi-tenant workspaces and seats',
    path: '/dashboard/team',
    summary:
      'Users belong to many workspaces with owner/admin/member/viewer roles; seat limits come from the plan.',
    sdk: [
      'useSaaSWorkspaces',
      'WorkspaceSwitcher',
      'useSeatStatus',
      'WhenWorkspaceRoles',
    ],
    mcpTools: ['list_workspaces', 'get_workspace', 'list_workspace_users'],
  },
  {
    slug: 'subscriptions',
    title: 'Plans, trials and subscriptions',
    path: '/pricing',
    summary:
      'Public pricing table from the console, 14-day trials, Stripe checkout and billing portal, plan-based gates.',
    sdk: [
      'usePublicPlans',
      'PricingPage',
      'useSubscription',
      'useTrialStatus',
      'WhenSubscriptionToPlans',
    ],
    mcpTools: ['get_public_plans', 'get_subscription', 'get_plans'],
  },
  {
    slug: 'invoices',
    title: 'Invoices',
    path: '/dashboard/invoices',
    summary:
      'Stripe invoices listed in-app with hosted and PDF links; opens the billing portal.',
    sdk: ['useInvoices', 'useBillingPortal'],
    mcpTools: ['list_invoices', 'get_invoice'],
  },
  {
    slug: 'usage',
    title: 'Usage quotas and overage',
    path: '/dashboard/usage',
    summary:
      'Plan quotas (for example `documents`) with included units, overage pricing and threshold alerts. Creating a document records usage.',
    sdk: [
      'useAllQuotaUsage',
      'useRecordUsage',
      'WhenQuotaThreshold',
      'WhenQuotaExhausted',
      'bb.usage.record()',
    ],
    mcpTools: ['get_all_quota_usage', 'get_usage_logs'],
  },
  {
    slug: 'credits',
    title: 'Prepaid credits',
    path: '/dashboard/credits',
    summary:
      'Credit packages, balances with expiring buckets, consumption and a transaction ledger. Creating a document consumes one credit.',
    sdk: [
      'CreditBalance',
      'useConsumeCredits',
      'useCreditPackages',
      'WhenCreditsLow',
      'bb.credits.consume()',
    ],
    mcpTools: [
      'get_credit_balance',
      'list_credit_transactions',
      'get_credit_packages',
    ],
  },
  {
    slug: 'feature-flags',
    title: 'Feature flags',
    path: '/dashboard/documents',
    summary:
      'Workspace-level flags (`advanced-exports`, `document-sharing`, `e-signatures`) and user-level flags gate parts of the documents UI.',
    sdk: ['WhenWorkspaceFeatureEnabled', 'useUserFeatures'],
    mcpTools: ['check_feature_flag'],
  },
  {
    slug: 'permissions',
    title: 'Roles and permissions',
    path: '/dashboard/permissions',
    summary:
      'Default role permissions plus per-workspace overrides, evaluated client- and server-side.',
    sdk: ['usePermissions', 'WhenPermission', 'bb.permissions.check()'],
    mcpTools: ['check_permission', 'resolve_permissions'],
  },
  {
    slug: 'documents',
    title: 'Documents (the demo product)',
    path: '/dashboard/documents',
    summary:
      "Markdown documents owned by a workspace, stored in the app's own Postgres. Create, search, tag, change status; sample data loads with one click. The same service backs the REST API and the MCP tools.",
    sdk: ['getWorkspaceContext()', 'bb.usage.record()', 'bb.credits.consume()'],
    mcpTools: [
      'list_documents',
      'search_documents',
      'get_document',
      'get_document_stats',
      'create_document',
      'update_document_status',
    ],
  },
  {
    slug: 'notifications',
    title: 'Push and email notifications',
    path: '/dashboard/notifications',
    summary:
      'Web-push subscription in the browser and server-side sends to one user or a whole workspace.',
    sdk: ['usePushNotifications', 'bb.notification.send()'],
    mcpTools: ['send_notification'],
  },
  {
    slug: 'events',
    title: 'Events and webhooks',
    path: '/dashboard/events',
    summary:
      'Client SDK lifecycle events persisted through /api/events, and signed server-to-server webhooks received at /api/webhooks/buildbase.',
    sdk: ['eventEmitter', 'handleEvent', 'parseWebhookEvent'],
  },
  {
    slug: 'security',
    title: 'Devices, sessions and connected agents',
    path: '/dashboard/security',
    summary:
      'See and revoke signed-in devices, sessions and the AI agents that hold a grant.',
    sdk: ['Devices', 'Sessions', 'ConnectedAgents'],
  },
  {
    slug: 'agents',
    title: 'AI agents over MCP',
    path: '/dashboard/agents',
    summary:
      'A remote MCP server at /api/mcp with OAuth 2.1 + PKCE, discovery documents under /.well-known, and a connect guide for Claude, ChatGPT, Cursor and VS Code.',
    sdk: [
      'createAgentStack',
      'defineMcpTool',
      'ConnectMcpGuide',
      'useMcpConnection',
    ],
  },
  {
    slug: 'i18n',
    title: 'Eight languages with RTL',
    path: '/ar',
    summary:
      'next-intl routing with type-safe keys; the SDK UI follows the app locale.',
    sdk: ['SaaSOSProvider locale'],
  },
];

const base = () => siteConfig.url.replace(/\/$/, '');

export function buildLlmsTxt(): string {
  const b = base();
  return `# ${siteConfig.name}

> ${siteConfig.description}

This is a public demo of the BuildBase SDK (${siteConfig.buildbase.url}). Source: ${siteConfig.repo}. Everything below is live; sign in to try it as a human, or connect over MCP to try it as an agent.

## For agents

- [MCP server](${b}/api/mcp): Streamable HTTP, OAuth 2.1 + PKCE. Start with the 401 challenge or the server card.
- [MCP server card](${b}/.well-known/mcp/server-card.json): endpoint, transport, capabilities.
- [Protected resource metadata](${b}/.well-known/oauth-protected-resource/mcp): authorization server and scopes.
- [Auth instructions](${b}/auth.md): how to register a client and get a token.
- [Agent skill](${b}/.well-known/agent-skills/index.json): installable SKILL.md for using this demo.
- [OpenAPI](${b}/openapi.json): the REST routes this app exposes.
- [Public plans](${b}/api/plans): machine-readable pricing.
- [Full guide](${b}/llms-full.txt): every feature, route and tool.

## Features

${FEATURES.map((f) => `- [${f.title}](${b}${f.path}): ${f.summary}`).join('\n')}

## Content

- [Blog](${b}/blog): implementation guides. Add \`Accept: text/markdown\` or use /api/content/blog/{slug}.
- [Changelog](${b}/changelog): release notes.
- [Pricing](${b}/pricing): plans rendered from the BuildBase console.

## Optional

- [Privacy](${b}/privacy)
- [Terms](${b}/terms)
- [Security contact](${b}/security.txt)
`;
}

export function buildLlmsFullTxt(): string {
  const b = base();
  const features = FEATURES.map(
    (f) => `### ${f.title}

Path: ${b}${f.path}

${f.summary}

SDK surface: ${f.sdk.map((s) => `\`${s}\``).join(', ')}${
      f.mcpTools?.length
        ? `\nMCP tools: ${f.mcpTools.map((t) => `\`${t}\``).join(', ')}`
        : ''
    }`
  ).join('\n\n');

  return `# ${siteConfig.name} — full guide

> ${siteConfig.description}

Source code: ${siteConfig.repo}
Platform: ${siteConfig.buildbase.url}
SDK: ${siteConfig.buildbase.sdkDocs} (\`@buildbase/sdk\`)
Agent guide: ${siteConfig.buildbase.agentGuide}

## What this app is

A Next.js 16 application that a SaaS team could ship as-is. BuildBase supplies identity, tenancy, billing, quotas, credits, flags, notifications and the OAuth authorization server. The app owns its product data (documents), its API routes, its access tokens and its MCP server.

## How an agent connects

1. POST ${b}/api/mcp with no token → 401 with \`WWW-Authenticate: Bearer resource_metadata="${b}/.well-known/oauth-protected-resource/mcp"\`.
2. GET that metadata → \`authorization_servers\` and \`scopes_supported\`.
3. GET the authorization server's \`/.well-known/oauth-authorization-server\` (also mirrored at ${b}/.well-known/oauth-authorization-server).
4. Register a public client (RFC 7591, \`token_endpoint_auth_method: none\`) or use one issued in the BuildBase console.
5. Authorize with PKCE; the user signs in and consents to scopes.
6. Exchange the code. The platform calls this app's \`/api/auth/oauth2-token\`, which mints a token signed with the app's own secret.
7. Call ${b}/api/mcp with \`Authorization: Bearer <token>\`.

Scopes: \`documents:read\` (default for reads), \`documents:write\` (required for create_document and update_document_status). Built-in BuildBase tools are read-only.

## MCP surface

Tools (built-in, read-only): list_workspaces, get_workspace, get_user_profile, list_workspace_users, get_subscription, get_plans, get_public_plans, list_invoices, get_invoice, get_quota_usage, get_all_quota_usage, get_usage_logs, get_credit_balance, list_credit_transactions, get_credit_packages, get_expiring_credits, check_feature_flag, check_permission, resolve_permissions, get_settings.

Tools (this app): list_documents, search_documents, get_document, get_document_stats, create_document, update_document_status.

Resources: \`buildbase://profile\`, \`buildbase://workspaces\`, \`buildbase://workspace/{workspaceId}\`, \`demo://guide\`, \`demo://workspace/{workspaceId}/documents/{documentId}\`.

Prompts: \`summarize_workspace\`.

## REST API

See ${b}/openapi.json. Highlights:

- GET /api/health — liveness (add ?deep=true for a database ping)
- GET /api/plans — public pricing as JSON
- GET|POST /api/documents?workspaceId= — list or create documents (session cookie or bearer token)
- GET|PATCH|DELETE /api/documents/{id}?workspaceId=
- POST|DELETE /api/documents/seed?workspaceId= — load or remove sample data
- GET /api/events?workspaceId= — persisted SDK events and webhooks
- GET /api/content/blog/{slug} — blog post as markdown
- GET /api/user/export, DELETE /api/user/delete — GDPR

## Features

${features}

## Discovery documents

${[
  '/llms.txt',
  '/llms-full.txt',
  '/auth.md',
  '/security.txt',
  '/openapi.json',
  '/.well-known/agent.json',
  '/.well-known/agent-card.json',
  '/.well-known/mcp/server-card.json',
  '/.well-known/mcp.json',
  '/.well-known/oauth-protected-resource',
  '/.well-known/oauth-protected-resource/mcp',
  '/.well-known/oauth-authorization-server',
  '/.well-known/openid-configuration',
  '/.well-known/agent-skills/index.json',
  '/.well-known/api-catalog',
]
  .map((p) => `- ${b}${p}`)
  .join('\n')}

## Contact

Support: ${siteConfig.contact.support}
Security: ${siteConfig.contact.security}
`;
}

export function buildSkillMarkdown(): string {
  const b = base();
  return `---
name: buildbase-demo
description: Use the BuildBase Demo app as a signed-in user over MCP — read workspaces, billing, usage and credits, and manage documents.
---

# BuildBase Demo skill

## When to use
The user asks about their BuildBase Demo workspace: plan, trial, seats, quota headroom, credits, invoices, or the documents their team keeps.

## Connect
1. Add the MCP server \`${b}/api/mcp\` to your client (Streamable HTTP).
2. Complete the OAuth flow when prompted; request \`documents:write\` only if you need to create or change documents.

## Recommended flow
1. \`list_workspaces\` → pick the workspace (or pass none if the user has one).
2. \`get_subscription\`, \`get_all_quota_usage\`, \`get_credit_balance\` for the account picture.
3. \`list_documents\` / \`search_documents\` / \`get_document\` for content.
4. Use the \`summarize_workspace\` prompt for a one-page status.

## Guardrails
- Built-in BuildBase tools are read-only here; billing changes go through the app's UI.
- \`create_document\` records usage and consumes a credit — tell the user before creating many.
- Never paste tokens into documents.

## References
- Full guide: ${b}/llms-full.txt
- OpenAPI: ${b}/openapi.json
- SDK agent guide: ${siteConfig.buildbase.agentGuide}
`;
}
