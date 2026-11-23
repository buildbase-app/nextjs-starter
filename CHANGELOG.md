# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- A redesigned home page in the BuildBase brand: a hero that crosses off the
  SaaS parts every team rebuilds, an interactive SDK panel whose code lines
  come from the tour catalog, the facts as one sentence, the whole tour as a
  numbered index, and a close with the clone command. CSS-only motion, each
  effect with a reduced-motion path; no animation runtime added.
- "Your users and their agents, through the same rules": a person in the
  app and their agent over MCP (`create_document`, scope `documents:write`)
  each create a document through `src/lib/documents/service.ts`, and the
  shared counters show both spend a credit and a unit of the `documents`
  quota.
- "Watch one upgrade reach your database": a playable webhook flow on the
  home page, from the click to the row, with the handler's real names
  (`subscription.upgraded`, the HMAC-SHA256 signature, `parseWebhookEvent`,
  `WebhookEvent`). "Send it again" shows a retry landing on the same row.
- A prompt to paste into a coding agent beside the clone command
  (`agentPrompt` in `src/config/site.ts`).
- The tour as a map on the home page: one column per group, one dot per
  task; signed in, the tasks you have finished fill in, with a count.
- Share your tour progress: signed in, the map offers "Share your
  progress", a link to `/tour/progress?d=...` whose card image draws your
  map (`/api/og/tour`). The code is one bit per task (22 characters, no
  account id, nothing looked up); the page is `noindex`.
- `?step=credits` (or `signIn`, `workspace`, `plan`, `notify`) opens the
  hero's SDK panel on that step, and picking a step updates the address, so
  a moment can be shared.
- Brand tokens (paper, ink, Plug Orange, cobalt) in light and dark, applied to
  the SDK's own screens too (`.saas-os-ui`), and Instrument Serif as the
  display face, served from this site.
- Design skills for coding agents in `.claude/skills/`: `buildbase-design`
  (this repo's brief, including which libraries may be added under their
  licences) and vendored `frontend-design`, `web-interface-guidelines`,
  `emil-design-eng`, `choreograph` and `review-animations`.
- Scores: `npm run test:a11y` (axe, WCAG 2.2 AA, light and dark),
  `npm run score` / `score:desktop` (Lighthouse CI) and a `Scores` workflow on
  pull requests.
- `SiteShell`: the blog, changelog, pricing, privacy and terms pages now have
  the site header, footer and a `<main>` landmark (they had none).

### Changed

- Playwright 1.65 (from 1.58), which supports Ubuntu 26.04: the Scores
  workflow runs on `ubuntu-latest` again, and `e2e-signed-in.yml`, which
  installs Chromium the same way, can too.

### Added (earlier)

- Sentry error monitoring integration with session replay
- Global error boundary (`src/app/global-error.tsx`)
- Sentry utility functions (`src/lib/sentry.ts`)
- Deploys to Cloudflare Workers (OpenNext) as well as Vercel and Docker, with a
  GitHub Actions deploy on push to `main` once `CLOUDFLARE_API_TOKEN` is set.

### Fixed

- Share images in Hindi, Japanese, Chinese and Arabic: the cards now draw
  with self-hosted subsets in `public/og-fonts` (Noto Sans, Noto Sans
  Devanagari, Noto Sans JP, Noto Sans SC, Cairo; OFL, licence files beside
  them), made by `npm run og:fonts`. Before, next/og fetched fonts from
  Google at render time for those scripts, and the Arabic card failed
  outright (Noto Sans Arabic's tables are beyond the renderer, hence Cairo).
  A font the renderer rejects now falls back to the default font instead of
  failing the response; tests render every locale's subsets and fail when a
  message gains a character the subset lacks.
- The proxy matched `/pagefind/*`, so the blog search index 404'd in
  production and the search found nothing; it and `/og-fonts/*` (and font
  files) are now served as static assets.

- The home page's title and description were "My App" and "My Next.js
  application with shadcn/ui and theme support" in all eight languages; the
  share image said "My App" too.
- Stripe.js loaded on every page (and set a third-party cookie) because the
  main `@stripe/stripe-js` entry injects it on import; the pure entry loads it
  when a checkout needs it.
- Sentry's SDK (~270 KB compressed) shipped to every visitor even with Sentry
  off: the error boundaries' helper used a static `require`.
- `upgrade-insecure-requests` and HSTS were sent whenever `NODE_ENV` was
  production, so `next start` on http://localhost never hydrated; they now
  follow the request's protocol.
- Every blog visit from a Mac failed hydration (React #418): the search
  button read `navigator` during render.
- Pricing rendered skeletons and then shifted (CLS 0.16); the server's plans
  are now in the HTML.
- Accessibility: unlabelled currency selects, skipped heading levels (pricing
  cards, footer columns), a header that overflowed a 360px phone while the
  session loaded, and a missing author avatar (404).

### Changed

- `@buildbase/sdk` 1.8.0 (from 0.0.78). The deprecated hook keys
  (`isLoading`, `refreshAttributes`, `refreshFeatures`) and the profile's `_id`
  are replaced by `loading`, `refetch` and `id`.
- The cookie banner is the SDK's `CookieBanner`; the answer lives in the
  `bb_consent` cookie, so visitors who answered the old banner are asked once
  more. `openCookieBanner()` reopens it from the Tracking page.
- The server content client names the template (`source: 'nextjs-starter'`) in
  the SDK's `X-BuildBase-Client` header.
- Brand icons (GitHub, X, LinkedIn, Facebook) are inline Simple Icons marks
  (`src/components/icons/brand.tsx`), since lucide-react deprecated its own.
- Zod 4 forms replace deprecated ones (`z.url()`, `z.email()`, `z.uuid()`,
  `.loose()`, `z.ZodType`), and React's `SubmitEvent` replaces `FormEvent`.

## [0.2.0] - 2026-09-24

### Added

- The tour: 67 tasks in 13 groups, listed on the home page before sign-in and
  worked through after. Each task says why it matters, what to do and where the
  capability comes from (SDK surface, console screen, this app's code).
  Progress is one `TourProgress` row per person per task, ticked by SDK
  lifecycle events, webhooks, the app's own actions, or "Mark done".
- Documents, the demo's own product: REST routes under `/api/documents`, a
  workbench with filters, inline status changes, sample data and a metering
  line. Creating one records usage against the `documents` quota and spends a
  credit; a workspace at its cap with no overage gets a 402. The MCP tools go
  through the same service.
- Notification bell in the dashboard header and an inbox page (live, all or
  unread, mark all read, archive). The Notifications page sends the
  `comment-added` event to yourself.
- Team: invite by email with a role, pending list with resend and revoke, the
  seat a pending invitation holds, inline role changes, and the platform's
  pending-invitation banner on every dashboard page.
- `/api/webhooks/buildbase`: verifies signature and timestamp, stores each
  delivery once, credits the tour to the workspace's members. The Events page
  lists what arrived with the payload.
- Connected agents on the profile page, with an MCP set-up guide for Claude,
  Cursor, ChatGPT and VS Code. Token minting and tool calls tick their tasks.

### Changed

- `@buildbase/sdk` 0.0.70.
- Content-Security-Policy `connect-src` is derived from
  `NEXT_PUBLIC_BUILDBASE_SERVER_URL` (HTTP and WebSocket), and
  `upgrade-insecure-requests` applies only in production, so a local server
  over plain HTTP works.

### Fixed

- Account export and deletion answered 401 to a real session: the session
  helper read `profile._id` while the profile carries `id`.
- The notifications page copy contained `{{name}}` unescaped, which ICU
  rejected as a malformed argument.

## [0.1.0] - 2026-01-27

### Added

#### Core Framework

- Next.js 16.1.4 with App Router
- TypeScript 5 with strict mode
- Tailwind CSS 4 for styling
- shadcn/ui component library (Radix UI primitives)

#### Internationalization (i18n)

- 8 language support: English, Hindi, Spanish, French, German, Japanese, Chinese, Arabic
- RTL support for Arabic
- next-intl integration for translations
- Language switcher component with cookie persistence
- URL-based locale routing

#### Authentication

- BuildBase SDK integration for OAuth
- JWT token management
- Protected route handling
- Workspace switching support

#### SEO

- Multi-language sitemap with hreflang
- robots.txt configuration
- JSON-LD structured data (Organization, WebSite, WebPage, Breadcrumb, FAQ, Article)
- Dynamic OG image generation
- Canonical URLs and alternate language links
- OpenGraph and Twitter card metadata

#### Security

- Security headers middleware (CSP, HSTS, X-Frame-Options, etc.)
- Zod validation schemas for all inputs
- Environment variable validation with @t3-oss/env-nextjs
- JWT signing with secure secrets

#### Developer Experience

- ESLint + Prettier configuration
- Husky pre-commit hooks with lint-staged
- GitHub Actions CI/CD pipeline
- Bundle analyzer integration
- VS Code settings for auto-formatting
- EditorConfig for cross-editor consistency

#### Utilities

- Centralized logging utility (dev/prod aware)
- Format utilities (date, number, string)
- Health check endpoint (`/api/health`)
- Skip-to-content accessibility link

#### Database

- Prisma ORM setup
- PostgreSQL adapter
- User, Workspace, and UserWorkspace models

#### Theming

- next-themes integration
- Light/Dark/System mode support
- Theme toggle component

#### Error Handling

- Localized error boundaries
- Localized 404 page
- Error logging integration

#### Documentation

- Comprehensive README
- Knowledge base with detailed guides
- Development roadmap

### Infrastructure

- `.nvmrc` for Node.js version management
- `.editorconfig` for consistent formatting
- `.prettierrc` configuration
- `components.json` for shadcn/ui

---

## Version History

- **0.2.0** - The tour, documents, inbox, invitations, webhooks, agents
- **0.1.0** - Initial release with full feature set

[Unreleased]: https://github.com/buildbase-app/nextjs-starter/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/buildbase-app/nextjs-starter/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/buildbase-app/nextjs-starter/releases/tag/v0.1.0
