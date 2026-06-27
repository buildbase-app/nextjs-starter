# BuildBase Next.js Starter

![Node.js](https://img.shields.io/badge/node-20+-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![License](https://img.shields.io/badge/license-MIT-green)

A production-ready Next.js 16 SaaS starter powered by [BuildBase](https://buildbase.app). Includes authentication, multi-tenancy, subscriptions, credits, i18n (8 languages + RTL), SEO, security headers, audit logging, GDPR compliance, and Docker deployment — all pre-wired and ready to ship.

> **Important:** This starter requires a [BuildBase](https://buildbase.app) account. Without it, authentication, workspaces, subscriptions, billing, feature flags, and notifications will not work. The dashboard will be non-functional.

---

## Why use this?

- Skip weeks of boilerplate — auth, i18n, theming, SEO, billing, and security are all pre-configured
- Multi-tenant out of the box — workspaces, roles (admin/member/viewer), seat limits, and workspace switching
- Internationalisation-first — 8 languages including RTL (Arabic) with type-safe translation keys
- Production-hardened — audit logs, GDPR endpoints, CSP/HSTS headers, Sentry error tracking
- Fully typed — TypeScript strict mode end to end, including env vars via `@t3-oss/env-nextjs`

---

## ✨ Features

- **Framework**: Next.js 16.1.4 with App Router + Turbopack
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **Auth**: OAuth via BuildBase SDK (multi-tenant, role-based, session-persistent)
- **Multi-tenancy**: Workspaces, seat limits, role-based access control
- **Billing**: Subscription plans, credit system, invoices, usage tracking
- **i18n**: 8 languages with RTL support (next-intl)
- **Database**: PostgreSQL with Prisma ORM + connection pooling + audit logging middleware
- **Content**: MDX blog, changelog, and marketing pages via contentlayer2
- **Theming**: Light/Dark/System modes (next-themes)
- **SEO**: Multi-language sitemap, RSS feeds, OG images, JSON-LD structured data
- **Security**: CSP, HSTS, X-Frame-Options, Permissions-Policy, request IDs
- **GDPR**: Data export (Article 15) and erasure (Article 17) API endpoints
- **Error tracking**: Optional Sentry integration (zero-config if DSN not set)
- **Testing**: Vitest (unit) + Playwright (E2E, 3 browsers)
- **Deployment**: Docker multi-stage build + docker-compose with PostgreSQL
- **DX**: ESLint, Prettier, Husky pre-commit hooks, bundle analyzer

---

## 🌍 Supported Languages

| Code | Language | Direction |
| ---- | -------- | --------- |
| en   | English  | LTR       |
| hi   | Hindi    | LTR       |
| es   | Spanish  | LTR       |
| fr   | French   | LTR       |
| de   | German   | LTR       |
| ja   | Japanese | LTR       |
| zh   | Chinese  | LTR       |
| ar   | Arabic   | RTL       |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── sitemap.ts                  # Multi-language sitemap
│   ├── robots.ts                   # robots.txt config
│   ├── api/
│   │   ├── auth/
│   │   │   ├── token/              # OAuth token exchange (BuildBase → local JWT)
│   │   │   ├── oauth2-token/       # OAuth2 application token endpoint
│   │   │   ├── oauth2-profile/     # OAuth2 profile endpoint
│   │   │   ├── workspace-token/    # Workspace-scoped JWT generation
│   │   │   ├── session/            # Session check (reads httpOnly cookie)
│   │   │   └── signout/            # Clear session cookie
│   │   ├── events/                 # BuildBase webhook receiver (syncs users/workspaces)
│   │   ├── user/
│   │   │   ├── export/             # GDPR data export (Article 15)
│   │   │   └── delete/             # GDPR data erasure (Article 17)
│   │   ├── content/[...path]/      # Markdown API for AI agents
│   │   ├── og/                     # Dynamic OG image generation (Edge)
│   │   ├── health/                 # Health check + optional DB ping
│   │   └── notifications/test/     # Send test push notification
│   └── [locale]/                   # All pages are locale-prefixed
│       ├── layout.tsx              # Root layout with metadata
│       ├── page.tsx                # Home / marketing page
│       ├── about/                  # About page (MDX)
│       ├── pricing/                # Pricing plans page
│       ├── privacy/                # Privacy policy (MDX, GDPR)
│       ├── terms/                  # Terms of service (MDX)
│       ├── error/                  # Error boundary page
│       ├── not-found/              # 404 page
│       ├── blog/
│       │   ├── page.tsx            # Blog index with pagination
│       │   ├── [slug]/             # Individual blog post
│       │   ├── authors/[slug]/     # Author archive
│       │   ├── category/[category]/# Category filtered posts
│       │   ├── tag/[tag]/          # Tag filtered posts
│       │   └── feed.xml/           # RSS feed (auto-generated)
│       ├── changelog/
│       │   ├── page.tsx            # Changelog index
│       │   ├── [slug]/             # Individual changelog entry
│       │   └── feed.xml/           # Changelog RSS feed
│       └── dashboard/              # Protected routes (requires BuildBase auth)
│           ├── page.tsx            # Dashboard home (subscription + trial status)
│           ├── analytics/          # Analytics
│           ├── documents/          # Document management
│           ├── credits/            # Credit balance and purchase
│           ├── invoices/           # Billing invoices
│           ├── usage/              # API usage tracking
│           ├── team/               # Team members and workspace users
│           ├── notifications/      # Push notifications list
│           ├── settings/           # Theme, language, preferences
│           ├── profile/            # Name, email, avatar, timezone, locale
│           ├── permissions/        # Role-based access control settings
│           └── events/             # Activity and audit event log
├── components/
│   ├── ui/                         # shadcn/ui primitives (button, card, dialog, etc.)
│   ├── marketing/
│   │   └── mdx/                    # MDX renderer, code blocks, callouts, TOC, image zoom
│   ├── saas-provider.tsx           # BuildBase SDK wrapper (auth + workspace callbacks)
│   ├── query-provider.tsx          # TanStack React Query setup
│   ├── theme-provider.tsx          # next-themes setup
│   ├── theme-toggle.tsx            # Theme switcher
│   ├── language-switcher.tsx       # Locale dropdown
│   ├── home-header.tsx             # Nav header with auth state
│   ├── site-footer.tsx             # Footer with sections and social links
│   ├── app-sidebar.tsx             # Dashboard sidebar with workspace switcher
│   ├── dashboard-layout-client.tsx # Auth guard wrapper for dashboard
│   ├── hero-section.tsx            # Marketing hero banner
│   ├── features-section.tsx        # Features grid
│   ├── stats-section.tsx           # Stats display
│   ├── pricing-section.tsx         # Pricing plans
│   ├── credit-store.tsx            # Credit purchase UI
│   ├── cta-banner.tsx              # Call-to-action banner
│   ├── blog-search.tsx             # Blog search/filter
│   ├── related-posts.tsx           # Related posts
│   ├── share-buttons.tsx           # Social sharing
│   ├── rss-button.tsx              # RSS subscribe button
│   ├── cookie-consent.tsx          # GDPR cookie consent banner
│   └── skip-link.tsx               # Accessibility skip link
├── hooks/
│   └── use-mobile.ts               # Media query hook (< 768px)
├── lib/
│   ├── auth.ts                     # JWT create/verify, getCurrentUser, getAuthTokenFromHeader
│   ├── buildbase.ts                # BuildBase SDK init and module exports
│   ├── db.ts                       # Prisma singleton + audit log middleware
│   ├── logger.ts                   # Dual-mode logger (dev: colored, prod: JSON)
│   ├── sentry.ts                   # Optional Sentry helpers (no-op if DSN not set)
│   ├── utils.ts                    # cn() Tailwind class merging helper
│   ├── i18n-url.ts                 # URL builder with locale prefix
│   ├── format/
│   │   ├── date.ts                 # formatDate, formatDateTime, formatRelativeTime
│   │   ├── number.ts               # formatCurrency, formatCompact, formatBytes, formatOrdinal
│   │   └── string.ts               # slugify, truncate, titleCase, mask, pluralize, initials
│   ├── seo/
│   │   └── marketing-metadata.ts   # Build localized metadata for marketing pages
│   └── validation/
│       ├── schemas.ts              # Zod schemas (auth, profile, workspace, pagination)
│       └── api.ts                  # validateBody(), validateParams(), isValidationError()
├── i18n/
│   ├── config.ts                   # Supported locales + default locale
│   ├── routing.ts                  # next-intl routing setup
│   ├── request.ts                  # Server-side locale resolver
│   └── messages/                   # Translation files (en, hi, es, fr, de, ja, zh, ar)
├── middleware.ts                    # i18n routing, security headers, canonical redirect,
│                                   # markdown content negotiation, request ID propagation
└── __tests__/
    └── utils.test.ts               # Vitest unit tests

content/                            # MDX source files
├── blog/{locale}/{slug}.mdx        # Blog posts (multi-locale)
├── authors/{slug}.mdx              # Author profiles
├── changelog/{slug}.mdx            # Changelog entries
└── pages/
    ├── about/{locale}.mdx          # About page content
    ├── privacy/{locale}.mdx        # Privacy policy content
    └── terms/{locale}.mdx          # Terms of service content

e2e/                                # Playwright E2E tests
prisma/
└── schema.prisma                   # Database schema (User, Workspace, UserWorkspace, AuditLog)
knowledge/                          # Extended documentation (see below)
```

---

## 🔌 BuildBase SDK — What It Powers

The BuildBase SDK (`@buildbase/sdk`) is the core dependency. The following will **not work** without a connected BuildBase account:

| Feature                   | Without BuildBase            |
| ------------------------- | ---------------------------- |
| Sign in / Sign out        | Broken — no OAuth flow       |
| Session persistence       | Broken — no session handling |
| Workspaces                | Not available                |
| Role-based permissions    | Not enforced                 |
| Subscription plans        | Not available                |
| Credit balance & purchase | Not available                |
| Feature flags             | Not available                |
| Push notifications        | Not available                |
| Trial status              | Not shown                    |

The SDK is initialised in `src/lib/buildbase.ts` and exports these modules:

```ts
(auth,
  workspace,
  subscription,
  users,
  plans,
  usage,
  invoices,
  features,
  settings,
  notification,
  credits,
  withSession,
  client);
```

---

## 🗄️ Database Schema

**User**

```
id, email (unique), name, image, role, emailVerified,
timezone, language, country, currency, createdAt, updatedAt
```

**Workspace**

```
id, name, createdAt, updatedAt
```

**UserWorkspace** (join table)

```
userId + workspaceId (composite PK), userRole (admin | member | viewer),
createdAt, updatedAt
Indexes: workspaceId
```

**AuditLog**

```
id, action (create | update | delete | upsert | gdpr_delete),
model (User | Workspace | UserWorkspace), recordId,
userId, workspaceId, ipAddress, userAgent,
source (api | event | system | oauth2-token),
before (Json), after (Json), metadata (Json), createdAt
Indexes: model+recordId, userId, workspaceId, action, createdAt
```

Audit logging is automatic via Prisma middleware — every create/update/delete/upsert on User, Workspace, and UserWorkspace is recorded with before/after state.

---

## 🌐 API Routes

| Method | Route                       | Description                                                    |
| ------ | --------------------------- | -------------------------------------------------------------- |
| POST   | `/api/auth/token`           | Exchange BuildBase auth code for local JWT + session cookie    |
| POST   | `/api/auth/oauth2-token`    | OAuth2 token endpoint (called by BuildBase server)             |
| POST   | `/api/auth/oauth2-profile`  | OAuth2 profile endpoint (called during OAuth flow)             |
| POST   | `/api/auth/workspace-token` | Generate workspace-scoped JWT                                  |
| GET    | `/api/auth/session`         | Read session from httpOnly cookie                              |
| POST   | `/api/auth/signout`         | Clear session cookie                                           |
| POST   | `/api/events`               | BuildBase webhook (syncs users/workspaces, records audit logs) |
| GET    | `/api/user/export`          | GDPR Article 15 — export all user data as JSON                 |
| DELETE | `/api/user/delete`          | GDPR Article 17 — delete user, anonymise audit logs            |
| GET    | `/api/content/[...path]`    | Serve raw markdown for AI agents (`Accept: text/markdown`)     |
| GET    | `/api/og`                   | Generate dynamic OG images (Edge runtime, locale-aware)        |
| GET    | `/api/health`               | Health check; `?deep=true` includes DB connectivity + latency  |
| POST   | `/api/notifications/test`   | Send test push notification via BuildBase SDK                  |

---

## 📝 Content System (MDX)

Content is managed via **contentlayer2** with the following types:

**Blog Posts** — `content/blog/{locale}/{slug}.mdx`

- Fields: `title`, `description`, `date`, `updated?`, `draft?`, `author` (slug), `category`, `tags[]`, `image?`
- Computed: `slug`, `locale`, `readingTime`
- Features: draft filtering in production, multi-locale with fallback, related posts by tags/category, RSS feed, markdown API for AI agents

**Authors** — `content/authors/{slug}.mdx`

- Fields: `name`, `role?`, `avatar?`, `bio`, `website?`, `twitter?`, `github?`, `linkedin?`

**Changelog** — `content/changelog/{slug}.mdx`

- Fields: `date`, `title`, `description`, `draft?`, `highlights[]` (kind, title, body), `tag?`, `version?`
- Computed: `slug`, `readingTime`

**Marketing Pages** — `content/pages/{type}/{locale}.mdx`

- About, Privacy, Terms — fully translatable with SEO metadata per locale

MDX pipeline: `remarkGfm` → `rehypeSlug` → `rehypeAutolinkHeadings` → `rehypePrettyCode` (github-dark-default theme)

---

## 🌍 i18n Message Namespaces

All translations live in `src/i18n/messages/` and are TypeScript files for full type safety. Missing keys cause TypeScript errors.

| Namespace              | Contents                                    |
| ---------------------- | ------------------------------------------- |
| `common.nav`           | Navigation labels                           |
| `common.buttons`       | Button labels (signIn, save, delete, etc.)  |
| `common.auth`          | Auth messages                               |
| `common.footer`        | Footer content and links                    |
| `common.language`      | Language names                              |
| `common.accessibility` | Skip links, ARIA labels                     |
| `common.theme`         | Theme option labels                         |
| `home.*`               | Home / marketing page                       |
| `dashboard.*`          | Dashboard, trial status, subscription cards |
| `analytics.*`          | Analytics page                              |
| `team.*`               | Team management                             |
| `settings.*`           | Settings page                               |
| `documents.*`          | Documents page                              |
| `events.*`             | Activity / audit log                        |
| `invoices.*`           | Billing invoices                            |
| `notifications.*`      | Notifications                               |
| `permissions.*`        | RBAC settings                               |
| `profile.*`            | Profile settings                            |
| `usage.*`              | API usage tracking                          |
| `credits.*`            | Credits page                                |
| `creditStore.*`        | Credit purchase UI                          |
| `pricing.*`            | Pricing page                                |
| `blog.*`               | Blog index and post pages                   |
| `changelog.*`          | Changelog pages                             |
| `cookieConsent.*`      | Cookie consent banner                       |
| `errors.*`             | Error messages                              |

---

## 🔒 Middleware

`src/middleware.ts` handles all requests and applies:

- **i18n routing** — locale prefix via next-intl (`as-needed` strategy)
- **Canonical redirect** — `www.domain.com` → apex domain (301)
- **Security headers** — CSP, HSTS, X-Frame-Options: DENY, X-Content-Type-Options, Referrer-Policy, X-XSS-Protection, Permissions-Policy
- **Request ID** — generates UUID per request, propagates via headers for observability
- **Markdown negotiation** — rewrites `Accept: text/markdown` requests to `/api/content/`
- **Link headers** — appends `Link` headers for AI agent discovery (llms.txt, sitemap, RSS)
- **Robots** — sets `X-Robots-Tag: noindex, nofollow` on all `/api/` routes

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (see `.nvmrc`)
- PostgreSQL database
- [BuildBase](https://buildbase.app) account (org ID, client ID, client secret)

### Installation

```bash
# Clone the repository
git clone https://github.com/buildbase-app/nextjs-starter.git
cd nextjs-starter

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Set up database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## ✅ Customisation Checklist

After cloning, update these files before shipping to production:

| File                                | What to change                                                       |
| ----------------------------------- | -------------------------------------------------------------------- |
| `.env.local`                        | Fill in all required values (copy from `.env.example`)               |
| `src/config/seo.ts`                 | Replace `My App`, `My App Team`, and social handles with your brand  |
| `public/llms.txt`                   | Replace `My App` and `https://example.com` with your product details |
| `public/llms-full.txt`              | Same as above — full AI agent discovery document                     |
| `public/.well-known/agent.json`     | Replace `My App`, `https://example.com`, and org details             |
| `public/.well-known/ai-plugin.json` | Replace name, description, logo URL, and contact email               |
| `public/openapi.json`               | Replace title and server URL                                         |
| `public/logo.png`                   | Add your logo (referenced by JSON-LD structured data)                |
| `public/authors/`                   | Replace the `john-doe.mdx` author and avatar with real authors       |
| `src/content/blog/en/`              | Replace example blog posts with your own content                     |
| `src/content/changelog/`            | Replace example changelog entries                                    |
| `src/content/pages/`                | Update About, Privacy, and Terms content for all locales             |
| `src/content/authors/john-doe.mdx`  | Replace with your real author(s)                                     |

> **Tip:** Search the repo for `example.com` and `My App` to find all placeholder values.

---

## ⚙️ Environment Variables

| Variable                             | Required | Description                                              |
| ------------------------------------ | -------- | -------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`               | Yes      | Site base URL (e.g. `https://yourdomain.com`)            |
| `DATABASE_URL`                       | Yes      | PostgreSQL connection string                             |
| `SYSTEM_SECRET`                      | Yes      | JWT signing key — min 32 characters                      |
| `NEXT_PUBLIC_BUILDBASE_SERVER_URL`   | Yes      | BuildBase API URL (default: `https://api.buildbase.app`) |
| `NEXT_PUBLIC_BUILDBASE_ORG_ID`       | Yes      | Your BuildBase organisation ID                           |
| `NEXT_PUBLIC_BUILDBASE_CLIENT_ID`    | Yes      | BuildBase OAuth client ID                                |
| `NEXT_PUBLIC_BUILDBASE_REDIRECT_URL` | Yes      | OAuth redirect URL (e.g. `http://localhost:3000`)        |
| `BUILDBASE_CLIENT_SECRET`            | Yes      | BuildBase OAuth client secret (server-side only)         |
| `BUILDBASE_OAUTH2_CLIENT_ID`         | No       | OAuth2-specific client ID (if different)                 |
| `BUILDBASE_OAUTH2_CLIENT_SECRET`     | No       | OAuth2-specific secret (if different)                    |
| `NEXT_PUBLIC_SENTRY_DSN`             | No       | Sentry client key (error tracking, optional)             |
| `SENTRY_ORG`                         | No       | Sentry organisation slug                                 |
| `SENTRY_PROJECT`                     | No       | Sentry project slug                                      |
| `SENTRY_AUTH_TOKEN`                  | No       | Sentry auth token (for source maps upload)               |
| `SKIP_ENV_VALIDATION`                | No       | Set `1` to skip Zod env validation (CI/CD)               |
| `LOG_LEVEL`                          | No       | Logger level: `debug` / `info` / `warn` / `error`        |
| `LOG_IN_TESTS`                       | No       | Set `true` to enable logs during tests                   |
| `POSTGRES_USER`                      | Docker   | PostgreSQL container user                                |
| `POSTGRES_PASSWORD`                  | Docker   | PostgreSQL container password                            |
| `POSTGRES_DB`                        | Docker   | PostgreSQL database name (default: `buildbase`)          |

See [environment-config.md](knowledge/environment-config.md) for type-safe validation setup using `@t3-oss/env-nextjs`.

---

## 📜 Available Scripts

| Script                  | Description                                                                   |
| ----------------------- | ----------------------------------------------------------------------------- |
| `npm run dev`           | Start development server (Turbopack, auto-runs contentlayer2)                 |
| `npm run build`         | Full build: contentlayer2 + prisma generate + next build + sitemap + pagefind |
| `npm start`             | Start production server                                                       |
| `npm run lint`          | Run ESLint                                                                    |
| `npm run lint:fix`      | Fix ESLint errors                                                             |
| `npm run format`        | Format with Prettier                                                          |
| `npm run format:check`  | Check formatting without writing                                              |
| `npm run typecheck`     | TypeScript type checking                                                      |
| `npm run check`         | Run all checks (lint + format + typecheck)                                    |
| `npm run build:analyze` | Build with bundle analyzer                                                    |
| `npm test`              | Run unit/component tests (Vitest)                                             |
| `npm run test:watch`    | Run Vitest in watch mode                                                      |
| `npm run test:e2e`      | Run Playwright E2E tests (Chrome, Firefox, Safari)                            |
| `npm run test:e2e:ui`   | Run Playwright with visual debug UI                                           |
| `npm run content:build` | Rebuild contentlayer2 MDX content                                             |
| `npm run content:watch` | Watch and rebuild MDX content                                                 |

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Configure all environment variables
4. Deploy

### Docker

```bash
# Build and start with docker-compose (includes PostgreSQL)
docker-compose up -d

# Or build manually
docker build -t nextjs-starter .
docker run -p 3000:3000 --env-file .env nextjs-starter
```

The Dockerfile uses a 3-stage build:

1. **deps** — installs dependencies + runs `prisma generate`
2. **builder** — builds the Next.js app (standalone output)
3. **runner** — production image, non-root user (`nextjs:1001`), read-only filesystem

`docker-compose.yml` includes:

- PostgreSQL 17 Alpine with health check and 512MB memory limit
- Next.js app with 1GB memory limit, read-only filesystem, tmpfs `/tmp`

---

## 🎨 Adding UI Components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

---

## 🌐 Adding Translations

1. Add keys to `src/i18n/messages/en.ts` (source of truth)
2. Add matching keys to all other locale files (`hi.ts`, `es.ts`, `fr.ts`, etc.)
3. TypeScript enforces the `Messages` type — missing keys are compile errors
4. Use in components:

```tsx
// Client component
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('common');
  return <button>{t('buttons.submit')}</button>;
}

// Server component
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('dashboard');
  return <h1>{t('title')}</h1>;
}
```

---

## 📚 Documentation

| Document                                                            | Description                                                  |
| ------------------------------------------------------------------- | ------------------------------------------------------------ |
| [Authentication](knowledge/authentication.md)                       | OAuth setup with BuildBase SDK, token flow, session handling |
| [Environment Config](knowledge/environment-config.md)               | Type-safe env vars with `@t3-oss/env-nextjs` + Zod           |
| [Multi-language Support](knowledge/multi-language-support.md)       | i18n configuration, routing, and usage patterns              |
| [Theme Management](knowledge/theme-management.md)                   | Light/dark/system mode implementation                        |
| [SEO Configuration](knowledge/next-seo.md)                          | Metadata API, sitemap, structured data, OG images            |
| [Security](knowledge/security.md)                                   | Security headers, CSP configuration, best practices          |
| [UI Components](knowledge/ui-components.md)                         | shadcn/ui component library and customisation                |
| [Error Handling](knowledge/error-handling.md)                       | Error boundaries, API error patterns                         |
| [Logging](knowledge/logging.md)                                     | Structured logging, log levels, child loggers                |
| [Sentry](knowledge/sentry.md)                                       | Optional error monitoring and session replay setup           |
| [Validation](knowledge/validation.md)                               | Zod schemas for API and form validation                      |
| [Format Utilities](knowledge/format-utilities.md)                   | Date, number, currency, and string formatters                |
| [Enterprise Features Audit](knowledge/enterprise-features-audit.md) | Feature checklist and implementation status                  |

---

## 🤝 Contributing

1. Follow existing code patterns
2. Ensure all checks pass: `npm run check`
3. Add i18n keys for any user-facing text (all 8 locales)
4. Test in both light and dark themes
5. Add Vitest tests for utilities, Playwright tests for new pages
6. Update `knowledge/` docs if you change behaviour

---

## 📄 License

MIT
