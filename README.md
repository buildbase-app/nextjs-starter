# BuildBase Next.js starter

A Next.js 16 app wired to [BuildBase](https://buildbase.app), and a guided
tour of everything BuildBase gives it.

<!-- TODO: replace with the deployed demo URL -->

Live demo: https://demo.buildbase.app

The tour is 67 tasks in 13 groups: sign up, create a second workspace, invite
someone by email, subscribe with a test card, hit a quota, spend credits,
switch a feature flag, send yourself a notification, connect Claude over MCP,
watch a webhook land in Postgres, export your data. You can read the whole
list on the home page before you sign in. After you sign in, each task says
why it matters, what to do, and where the capability comes from: the SDK hook
or component, the console screen that configures it, and the file in this repo
that takes part. Tasks that leave a trace tick themselves off; the rest have a
"Mark done" button. Progress follows your account, not your browser.

Use it two ways: clone it as the starting point for your own app, or work
through the tour to decide whether BuildBase does what you need before you
buy. Every screen you click through is in this repo.

## Quick start

```bash
git clone https://github.com/buildbase-app/nextjs-starter
cd nextjs-starter
cp .env.example .env.local
npm install
npx prisma db push
npm run dev
```

The app runs on http://localhost:3000. Fill in `.env.local` first:

| Variable                             | Where it comes from                                                                                                                                           |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_BUILDBASE_SERVER_URL`   | `https://api.console.buildbase.app` for the hosted platform, or your self-hosted server.                                                                      |
| `NEXT_PUBLIC_BUILDBASE_ORG_ID`       | The console's organization settings. It is the id in the URL when the console is open.                                                                        |
| `NEXT_PUBLIC_BUILDBASE_CLIENT_ID`    | Console, `/dashboard/admin/auth`. Create an OAuth client and add `http://localhost:3000` (and your deployed URL) to its redirect URLs.                        |
| `BUILDBASE_CLIENT_SECRET`            | The same client's secret. Server only.                                                                                                                        |
| `NEXT_PUBLIC_BUILDBASE_REDIRECT_URL` | The URL the hosted sign-in returns to. Must be one of the client's redirect URLs.                                                                             |
| `DATABASE_URL`                       | A Postgres connection string. `docker compose up db` gives you one locally.                                                                                   |
| `SYSTEM_SECRET`                      | At least 32 characters, `openssl rand -base64 32`. Signs the workspace tokens this app mints for itself.                                                      |
| `BUILDBASE_WEBHOOK_SECRET`           | Console, `/dashboard/admin/setting/webhooks`. Create an endpoint for `<your URL>/api/webhooks/buildbase` and paste the signing secret. Optional until you do. |
| `SITE_URL`, `NEXT_PUBLIC_SITE_URL`   | Your public URL. Used for canonical links, the MCP server address and the discovery documents.                                                                |

`src/env.ts` validates these at boot and refuses to start with a missing
required one, so a typo shows up as a clear message rather than a 500 later.

## What the organization needs for the tour to complete

The app works against any BuildBase organization. The tour, though, asks you
to hit a limit, spend a credit and receive a specific event, so the demo
organization is configured like this. Each row says which console screen it
lives on.

| What                                                                                                                                                                                   | Console screen                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| A pricing group with slug `main-pricing`. The pricing page renders whatever it holds.                                                                                                  | `/dashboard/admin/subscriptions`       |
| Two plans in it, both with a `documents` quota. The smaller plan allows no overage, so "Hit the limit" is reachable; the larger one includes more.                                     | `/dashboard/admin/subscriptions`       |
| A `max-users` limit on each plan (3 and 10 on the demo), so "Hit the seat limit" is reachable.                                                                                         | `/dashboard/admin/subscriptions`       |
| An `analytics` workspace feature, off on the smaller plan and on for the larger, so "See it switched on" happens by upgrading.                                                         | `/dashboard/admin/workspaces/features` |
| A 14-day trial without a card on each plan.                                                                                                                                            | `/dashboard/admin/subscriptions`       |
| A credit package with slug `100-credits`, granted by each plan on every period. Creating a document spends one.                                                                        | `/dashboard/admin/subscriptions`       |
| A custom notification event with slug `comment-added`, user-managed, email and push on. Its email template uses the `{{title}}`, `{{message}}` and `{{url}}` merge tags the app sends. | `/dashboard/admin/notifications`       |
| A webhook endpoint at `<your URL>/api/webhooks/buildbase` subscribed to `*`. Its secret goes in `BUILDBASE_WEBHOOK_SECRET`.                                                            | `/dashboard/admin/setting/webhooks`    |
| VAPID keys, so browsers can subscribe to push.                                                                                                                                         | `/dashboard/admin/push`                |
| A verified email sender, or the email channel stays quiet and the inbox says so.                                                                                                       | `/dashboard/admin/notifications`       |
| Stripe keys in test mode. The tour uses card `4242 4242 4242 4242`.                                                                                                                    | `/dashboard/admin/payment`             |
| The OAuth client's redirect URLs include the app's URL.                                                                                                                                | `/dashboard/admin/auth`                |

The slugs (`documents`, `max-users`, `analytics`, `100-credits`,
`comment-added`, `main-pricing`) are the only coupling between the app and the
organization. Each lives in one constant: `METERING` in
`src/lib/documents/service.ts`, `DEMO_EVENT_SLUG` in
`src/components/notifications/demo-event.ts`, and the `slug` prop on
`PricingSection`.

## How it is put together

**Auth and the session.** Sign-up, sign-in, passkeys and device trust happen
on BuildBase's hosted pages. The SDK's `SaaSOSProvider` in
`src/components/saas-provider.tsx` hands the resulting session id to
`/api/auth/token`, which stores it in an httpOnly cookie named `bb-session-id`.
This app never sees a password.

**The server client.** `src/lib/buildbase.ts` builds a server-side client that
reads that cookie. `src/lib/server-auth.ts` exposes two helpers every API route
uses: `getSessionContext()` resolves who is calling from the cookie, and
`getWorkspaceContext(workspaceId)` also checks, against the platform, that they
belong to that workspace and what their role is. Identity in a request body is
a claim; these are the facts.

**Mirroring the platform into Postgres.** The SDK emits lifecycle events in the
browser (`user:created`, `workspace:changed`, `workspace:invitation-sent`,
...). `saas-provider.tsx` forwards them to `/api/events`, which upserts `User`,
`Workspace` and `UserWorkspace`. Server-side changes (a subscription, a
payment, a credit purchase) arrive at `/api/webhooks/buildbase`, which verifies
the signature and timestamp with `verifyWebhookSignature`, stores each event
once in `WebhookEvent`, and shows them on the Events page.

**Documents.** The demo's own product domain, in `src/lib/documents/service.ts`
and `/api/documents/*`. Creating one records usage against the `documents`
quota and spends one credit; a workspace at its cap with no overage gets a 402. The same service backs the MCP tools, so an agent and a person are
metered the same way.

**Agents.** `src/lib/agent/index.ts` calls `createAgentStack` from
`@buildbase/sdk/mcp`. That gives the app an MCP server at `/api/mcp`, OAuth
discovery under `/.well-known/*`, `/llms.txt`, `/auth.md`, `/openapi.json` and
`/security.txt`, all generated from `src/config/site.ts`. An MCP client signs
in with the person's BuildBase account and the app mints it a token in
`/api/auth/oauth2-token`.

**The tour.** `src/tour/catalog.ts` is the content: 13 groups and 67 tasks,
English on purpose. `src/tour/progress.ts` writes one `TourProgress` row per
person per task. A task declares how it gets ticked:

| `detect.kind` | Ticked by                                                                        |
| ------------- | -------------------------------------------------------------------------------- |
| `sdk-event`   | `/api/events`, when the named SDK lifecycle event arrives for the signed-in user |
| `webhook`     | `/api/webhooks/buildbase`, for every member of the workspace in the payload      |
| `action`      | This app's own routes: a document created, a notification sent, a tool called    |
| `manual`      | The "Mark done" button, for things nothing can observe                           |

The tour page is `src/app/[locale]/dashboard/tour`, the home-page preview is
`src/components/marketing/tour-preview.tsx`, and `/api/tour` serves progress.

## Scripts

```bash
npm run dev          # Next.js with Turbopack (contentlayer builds first)
npm run build        # contentlayer, prisma generate, next build, sitemap, pagefind
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run check        # lint + format check + typecheck
npm run test         # vitest
npm run test:e2e     # playwright (e2e/)
```

Husky runs eslint and prettier on staged files at commit time.

## Languages

The app and the SDK's own screens ship in eight languages: English, Hindi,
Spanish, French, German, Japanese, Chinese and Arabic (right to left). Messages
are typed in `src/i18n/types.ts`, so adding a key in English fails the
typecheck until every locale has it. The tour's task content is English only;
its chrome is translated.

## Make it yours

Point `.env.local` at your own organization and the app runs unchanged. To
remove the tour once you no longer want it:

1. Delete `src/tour`, `src/components/tour`,
   `src/app/[locale]/dashboard/tour` and `src/app/api/tour`.
2. Remove the `TourProgress` model from `prisma/schema.prisma` and run
   `npx prisma db push`.
3. Remove the `tour` item from `menuItems` in `src/components/app-sidebar.tsx`,
   `<TourProgressCard />` from the dashboard page and `<TourPreview />` from
   the home page.
4. Remove the `tour` namespace and `nav.tour` from `src/i18n/types.ts` and the
   eight files in `src/i18n/messages/`.
5. Delete the `detect(...)` calls in `/api/events`, `/api/webhooks/buildbase`,
   `/api/documents`, `/api/notifications/test`, `/api/auth/oauth2-token`,
   `/api/user/export` and `src/lib/agent/tools.ts`.

Documents, the inbox, team invitations and the webhook table stand on their
own and are worth keeping as examples of the SDK in use.

## Deployment

Vercel: import the repo, set the variables above, point `DATABASE_URL` at a
hosted Postgres and add the deployed URL to the OAuth client's redirect URLs.
`NEXT_PUBLIC_*` values are baked into the bundle, so changing one needs a
redeploy.

Docker: `docker compose up` builds the app and starts Postgres; the
`POSTGRES_*` variables in `.env.example` configure the container.

## License

MIT
