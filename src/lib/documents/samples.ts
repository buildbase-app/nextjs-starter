/**
 * Realistic sample documents loaded by the "Load sample data" action.
 * They are deliberately shaped like what a small product team keeps in a
 * shared workspace so every screen (list, search, filters, feature gates,
 * MCP tools) has believable content to work with.
 */
export interface SampleDocument {
  title: string;
  status: 'draft' | 'in_review' | 'published' | 'archived';
  tags: string[];
  content: string;
}

export const SAMPLE_DOCUMENTS: SampleDocument[] = [
  {
    title: 'Q3 Product Roadmap',
    status: 'published',
    tags: ['roadmap', 'planning'],
    content: `# Q3 Product Roadmap

## Themes
1. **Self-serve onboarding** — cut time-to-first-value from 2 days to 20 minutes.
2. **Usage-based billing** — meter API calls and documents per workspace.
3. **Agent access** — expose the product over MCP so customers' AI assistants can act on their behalf.

## Milestones
| Week | Deliverable | Owner |
| --- | --- | --- |
| 27 | Trial flow with 14-day countdown | Growth |
| 30 | Quota dashboard + overage alerts | Billing |
| 33 | Remote MCP server with OAuth | Platform |
| 36 | Launch on Product Hunt | Marketing |

## Risks
- Stripe migration for seat-based pricing overlaps with the billing milestone.
- Agent consent screen copy needs legal review.`,
  },
  {
    title: 'Engineering Weekly — Sync Notes',
    status: 'published',
    tags: ['meeting', 'engineering'],
    content: `# Engineering Weekly

**Attendees:** Priya, Marcus, Elena, Tomasz

## Decisions
- Adopt the SDK's \`createAgentStack\` instead of hand-rolling the MCP transport.
- Feature flag \`advanced-exports\` stays off for the free plan.

## Action items
- [ ] Marcus: rotate the webhook secret and document the runbook.
- [ ] Elena: add a \`documents\` quota to the Pro plan (500 included, $0.02 overage).
- [ ] Priya: write the security.txt and get a contact alias.

## Metrics
- p95 API latency: 210 ms (target 250 ms)
- Error budget remaining: 71 %`,
  },
  {
    title: 'Customer Interview — Northwind Logistics',
    status: 'in_review',
    tags: ['research', 'customer'],
    content: `# Customer interview: Northwind Logistics

**Role:** Head of Operations · **Plan:** Growth · **Seats:** 14

## What they love
- Workspace switching between regional teams.
- Invoices show up in-app without emailing finance.

## Pain points
- Wants the AI assistant they already use (Claude) to pull last month's usage without logging in.
- Seat limit reached message is unclear about who can add seats.

## Quotes
> "If your MCP server works with our assistant, that alone justifies the upgrade."

## Follow-ups
- Share the Connect-an-agent guide.
- Clarify the seat-limit banner copy (owner vs admin).`,
  },
  {
    title: 'Security Policy — Access Control',
    status: 'published',
    tags: ['policy', 'security'],
    content: `# Access control policy

## Roles
- **Owner** — billing, danger zone, role changes.
- **Admin** — invite and remove members, toggle workspace features.
- **Member** — create and edit documents.
- **Viewer** — read only.

## Rules
1. Every request is authenticated with an httpOnly session cookie or a bearer token minted by this app.
2. Role is never taken from a request body — the platform is asked on every privileged call.
3. Agent tokens carry \`aud\` bound to the MCP resource and an encrypted session reference.
4. Sessions and devices are reviewed monthly on the Security page.`,
  },
  {
    title: 'Pricing Experiment — Seat vs Usage',
    status: 'draft',
    tags: ['pricing', 'experiment'],
    content: `# Pricing experiment: seats vs usage

## Hypothesis
Teams under 5 seats prefer a flat plan with a documents quota; teams above 10 prefer per-seat pricing with unlimited documents.

## Variants
- **A** — Pro at $29/mo, 5 seats, 500 documents, $0.02 overage.
- **B** — Pro at $9/seat/mo, unlimited documents.

## Success metric
Trial-to-paid conversion after 14 days, split by workspace size.

## Notes
Credits remain the currency for AI features in both variants.`,
  },
  {
    title: 'Incident Report — 2026-08-14 Push Delivery Delay',
    status: 'published',
    tags: ['incident', 'notifications'],
    content: `# Incident: push notification delay

**Duration:** 41 minutes · **Severity:** SEV-3 · **Customer impact:** delayed alerts, no data loss

## Timeline (UTC)
- 09:12 — Alert: push queue depth > 5,000.
- 09:20 — Worker pool scaled from 2 to 6.
- 09:53 — Queue drained, delivery back to < 2 s.

## Root cause
A campaign to all workspaces was scheduled at the same minute as the daily digest.

## Remediation
- Stagger scheduled campaigns by workspace hash.
- Add the \`push.campaign_sent\` webhook to the on-call dashboard.`,
  },
  {
    title: 'Onboarding Checklist for New Workspaces',
    status: 'published',
    tags: ['onboarding', 'playbook'],
    content: `# New workspace onboarding

1. Create the workspace and invite at least one admin.
2. Pick a plan or start the 14-day trial.
3. Load sample documents so the team sees real screens on day one.
4. Turn on the feature flags the plan includes.
5. Connect an AI agent from the Agents page and ask it to summarise the workspace.
6. Subscribe to push notifications for billing alerts.`,
  },
  {
    title: 'Agent Integration Guide (internal)',
    status: 'in_review',
    tags: ['agents', 'mcp', 'engineering'],
    content: `# Connecting an agent to the demo

## Discovery
The agent starts from \`/.well-known/mcp/server-card.json\` or the 401 challenge on \`/api/mcp\`, follows \`oauth-protected-resource\`, then the platform's RFC 8414 metadata.

## Auth
Public client + PKCE. The platform calls our \`/api/auth/oauth2-token\` to mint a token signed with \`SYSTEM_SECRET\`.

## Tools
Built-in read-only BuildBase tools plus \`list_documents\`, \`search_documents\`, \`get_document\`, \`create_document\`, \`update_document_status\`.

## Scopes
\`documents:read\` and \`documents:write\` are declared locally and shown on the consent screen.`,
  },
  {
    title: 'Brand Voice Guidelines',
    status: 'published',
    tags: ['marketing', 'brand'],
    content: `# Brand voice

- **Plain.** Say what the feature does, not what it "empowers".
- **Concrete.** Numbers, names, screenshots.
- **Respectful of time.** One idea per sentence.

## Examples
- ✅ "Invoices appear here as soon as Stripe issues them."
- ❌ "Experience seamless, next-generation billing transparency."`,
  },
  {
    title: 'Data Retention & GDPR Runbook',
    status: 'published',
    tags: ['policy', 'gdpr'],
    content: `# Data retention and GDPR

## Export (Article 15)
\`GET /api/user/export\` returns the user profile, workspace memberships and audit log as JSON.

## Erasure (Article 17)
\`DELETE /api/user/delete\` anonymises the local mirror; the platform record is deleted through the console.

## Retention
- Audit logs: 24 months
- Webhook events: 90 days
- SDK client events: 30 days`,
  },
  {
    title: 'Release Notes — v0.3.0 (draft)',
    status: 'draft',
    tags: ['release', 'changelog'],
    content: `# v0.3.0

## Added
- Remote MCP server with OAuth 2.1 and built-in tools.
- Documents with quota metering and credit consumption.
- Security page: devices, sessions, connected agents.
- "How it works" explainers on every dashboard page.

## Changed
- Workspace token route now derives role from the platform.
- OAuth2 bridge routes use the SDK helpers.`,
  },
  {
    title: 'Archived — Legacy API Migration Plan',
    status: 'archived',
    tags: ['engineering', 'legacy'],
    content: `# Legacy API migration (completed)

This plan covered moving from the v0 REST endpoints to the SDK. It is kept for reference; every step below has shipped.

- Replace hand-written token verification with \`verifyClientJwt\`.
- Move webhook handling to \`parseWebhookEvent\`.
- Retire the in-memory event log in favour of persisted events.`,
  },
];
