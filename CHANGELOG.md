# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Sentry error monitoring integration with session replay
- Global error boundary (`src/app/global-error.tsx`)
- Sentry utility functions (`src/lib/sentry.ts`)

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
