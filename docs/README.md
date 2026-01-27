# Base Repo Documentation

A production-ready Next.js 16 starter template with internationalization, authentication, theming, validation, and security best practices.

---

## 🚀 Tech Stack

| Category                 | Technology                           |
| ------------------------ | ------------------------------------ |
| **Framework**            | Next.js 16 (App Router)              |
| **Language**             | TypeScript (strict mode)             |
| **Styling**              | Tailwind CSS v4                      |
| **UI Components**        | shadcn/ui (Radix primitives)         |
| **Theming**              | next-themes (light/dark/system)      |
| **Internationalization** | next-intl (8 languages)              |
| **Authentication**       | BuildBase SDK (OAuth)                |
| **Database**             | PostgreSQL + Prisma ORM              |
| **Validation**           | Zod + react-hook-form                |
| **Env Validation**       | @t3-oss/env-nextjs                   |
| **Code Quality**         | ESLint, Prettier, Husky, lint-staged |
| **Icons**                | Lucide React                         |

---

## 📁 Project Structure

```
base-repo/
├── .husky/                  # Git hooks (pre-commit)
├── docs/                    # Documentation (you are here)
├── knowledge/               # Technical guides and roadmaps
├── prisma/
│   └── schema.prisma        # Database schema
├── public/                  # Static assets
├── src/
│   ├── app/
│   │   ├── [locale]/        # Localized routes
│   │   │   ├── dashboard/   # Protected pages
│   │   │   ├── layout.tsx   # Locale layout with SEO metadata
│   │   │   └── page.tsx     # Home page
│   │   ├── api/
│   │   │   ├── auth/        # Token endpoints (Zod validated)
│   │   │   ├── events/      # BuildBase event webhook
│   │   │   └── og/          # Dynamic OG image generation
│   │   ├── layout.tsx       # Root layout
│   │   ├── robots.ts        # robots.txt generation
│   │   └── sitemap.ts       # Sitemap with i18n support
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── app-sidebar.tsx  # Dashboard navigation
│   │   ├── language-switcher.tsx
│   │   ├── theme-toggle.tsx
│   │   └── ...
│   ├── hooks/
│   │   └── use-mobile.ts    # Responsive hook
│   ├── i18n/
│   │   ├── config.ts        # Locale configuration
│   │   ├── messages/        # Translations (8 languages)
│   │   ├── routing.ts       # next-intl routing
│   │   └── types.ts         # Translation types
│   ├── lib/
│   │   ├── auth.ts          # JWT token utilities
│   │   ├── db.ts            # Prisma client
│   │   ├── logger.ts        # Centralized logging utility
│   │   ├── utils.ts         # Utility functions
│   │   └── validation/      # Zod schemas & utilities
│   │       ├── index.ts     # Re-exports
│   │       ├── schemas.ts   # All validation schemas
│   │       └── api.ts       # API validation helpers
│   └── env.ts               # Environment validation
├── .env.example             # Environment template
├── .vscode/                 # Editor settings
├── components.json          # shadcn/ui config
├── next.config.ts           # Next.js configuration
├── package.json
├── prisma.config.ts         # Prisma configuration
└── tsconfig.json            # TypeScript config
```

---

## ✅ Current Features

### Internationalization (i18n)

- **8 languages**: English, Hindi, Spanish, French, German, Japanese, Chinese, Arabic
- **RTL support** for Arabic
- **URL-based locale routing** (`/en/dashboard`, `/fr/dashboard`)
- **Language switcher** component with cookie persistence
- **Type-safe translations** with TypeScript

### Authentication & Authorization

- **BuildBase SDK** integration for OAuth
- **JWT token management** (create, verify, refresh on workspace change)
- **Protected routes** with automatic redirection
- **Workspace switching** with role-based tokens

### SEO & Social Sharing

- **Dynamic sitemap** with all locales and hreflang
- **robots.txt** (disallows `/api/` and `/dashboard/`)
- **Canonical URLs** per locale
- **OpenGraph metadata** with locale support
- **Dynamic OG images** via `/api/og` endpoint
- **Twitter cards**

### Security

- **Security headers** in middleware:
  - Content Security Policy (CSP)
  - X-Frame-Options (DENY)
  - X-Content-Type-Options (nosniff)
  - Strict-Transport-Security (HSTS)
  - X-XSS-Protection
  - Permissions-Policy
- **Input validation** with Zod on all API endpoints

### Accessibility

- **Skip-to-content link** for keyboard/screen reader users
- **Localized** in all 8 languages
- **Main content landmarks** with `id="main-content"`
- **Semantic HTML** structure

### Validation (Zod)

- **Type-safe schemas** for all inputs (`src/lib/validation/`)
- **Auth schemas**: login, register, forgot/reset password
- **User schemas**: profile updates
- **Workspace schemas**: create workspace, invite user
- **API schemas**: auth code, workspace token, pagination
- **Helper utilities**: `validateBody()`, `validateParams()`, `isValidationError()`
- **react-hook-form integration** with `@hookform/resolvers`

```typescript
// Example usage in API route
import {
  authCodeSchema,
  validateBody,
  isValidationError,
} from '@/lib/validation';

export async function POST(request: NextRequest) {
  const result = await validateBody(request, authCodeSchema);
  if (isValidationError(result)) return result;

  const { code } = result; // Fully typed!
}
```

### Environment Validation

- **Build-time validation** with `@t3-oss/env-nextjs`
- **Typed env access** via `src/env.ts`
- **Server/client separation** (server vars not exposed to browser)
- **Fail-fast** on missing required variables
- **SKIP_ENV_VALIDATION** flag for CI/testing

```typescript
// Type-safe environment access
import { env } from '@/env';

// Server-only
env.SYSTEM_SECRET;
env.DATABASE_URL;
env.BUILDBASE_CLIENT_SECRET;

// Client-safe (NEXT_PUBLIC_*)
env.NEXT_PUBLIC_BUILDBASE_ORG_ID;
env.NEXT_PUBLIC_SITE_URL;
```

### Logging Utility

- **Centralized logging** via `src/lib/logger.ts`
- **Environment-aware output**:
  - **Development**: Colorized, human-readable with timestamps
  - **Production**: JSON format for log aggregation (CloudWatch, Datadog, etc.)
- **Log levels**: `debug`, `info`, `warn`, `error`
- **Configurable** via `LOG_LEVEL` environment variable
- **Child loggers** for request-scoped context

```typescript
import { logger, createRequestLogger } from '@/lib/logger';

// Basic usage
logger.info('Server started', { port: 3000 });
logger.error('Database connection failed', { error: err.message });

// With context
logger.debug('Processing request', { userId: '123', action: 'login' });

// Request-scoped logger (includes requestId in all logs)
const reqLogger = createRequestLogger('req-abc-123', 'user-456');
reqLogger.info('Handling request'); // Automatically includes requestId & userId
```

**Dev output:**

```
14:32:15 [INFO] Server started port=3000
14:32:16 [ERROR] Database connection failed error="Connection refused"
```

**Prod output (JSON):**

```json
{
  "timestamp": "2024-01-27T09:02:15.123Z",
  "level": "info",
  "message": "Server started",
  "context": { "port": 3000 }
}
```

### Health Check Endpoint

- **Basic check**: `GET /api/health` — status, timestamp, version, uptime
- **Deep check**: `GET /api/health?deep=true` — includes database connectivity
- **Status codes**: 200 (healthy), 503 (degraded/unhealthy)
- **Use cases**: Load balancers, uptime monitoring, deployment checks

```json
// GET /api/health?deep=true
{
  "status": "healthy",
  "timestamp": "2024-01-27T12:00:00.000Z",
  "version": "0.1.0",
  "uptime": 3600,
  "checks": {
    "database": { "status": "up", "latencyMs": 5 }
  }
}
```

### Code Quality & Git Hooks

- **Husky** pre-commit hooks
- **lint-staged** runs on staged files only
- **Auto-fix** ESLint errors on commit
- **Auto-format** with Prettier on commit
- **TypeScript strict mode**
- **Path aliases** (`@/*`)
- **VS Code settings** for auto-formatting

```json
// lint-staged config (in package.json)
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

### UI/UX

- **Theme support** (light/dark/system)
- **Sidebar navigation** with collapsible menu
- **Responsive design** with mobile detection hook
- **Loading states** and skeleton components

---

## 🔲 Suggested Additions

Based on the roadmap, here are recommended next steps:

### High Priority

#### 1. Testing Framework

**Why:** No tests exist. Critical for maintainability.

```bash
npm install --save-dev vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom
```

Files to create:

- `vitest.config.ts`
- `src/test/setup.ts`
- `src/**/*.test.ts`

---

#### 2. JSON-LD Structured Data

**Why:** Enables rich snippets in search results.

Schemas to implement:

- `Organization`
- `WebSite`
- `BreadcrumbList`
- `WebPage`

---

### Medium Priority

#### 3. Utility Functions Library

Centralized formatting utilities:

```
src/lib/format/
├── date.ts      # formatDate, formatRelativeTime
├── number.ts    # formatCurrency, formatCompact
└── string.ts    # slugify, truncate, capitalize
```

---

#### 4. API Service Layer

Type-safe HTTP client for data fetching:

```
src/services/
├── api.ts           # HTTP client
└── endpoints/
    ├── auth.ts
    └── workspace.ts
```

---

#### 5. Error Boundaries

Global error handling:

- `src/app/[locale]/error.tsx` - Page-level
- `src/app/[locale]/not-found.tsx` - Localized 404

---

#### 6. Bundle Analyzer

Analyze and optimize bundle size:

```bash
npm install --save-dev @next/bundle-analyzer
```

---

### Low Priority

- **RSS Feeds** - For blog/news content
- **ARIA Landmarks** - Complete semantic HTML structure
- **Focus Indicators** - Enhanced keyboard navigation
- **Reduced Motion Support** - Respect user preferences
- **High Contrast Mode** - Accessibility enhancement

---

## 🔧 Scripts

| Script                 | Description                          |
| ---------------------- | ------------------------------------ |
| `npm run dev`          | Start development server             |
| `npm run build`        | Build for production (validates env) |
| `npm run start`        | Start production server              |
| `npm run lint`         | Run ESLint                           |
| `npm run lint:fix`     | Fix ESLint errors                    |
| `npm run format`       | Format with Prettier                 |
| `npm run format:check` | Check formatting                     |
| `npm run check`        | Run lint + format check              |

---

## 🌐 Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```env
# Site Configuration
SITE_URL=https://example.com
NEXT_PUBLIC_SITE_URL=https://example.com

# Database (PostgreSQL)
DATABASE_URL=postgresql://user:password@localhost:5432/database

# Security (min 32 characters)
SYSTEM_SECRET=your-super-secret-key-at-least-32-chars

# BuildBase SDK
NEXT_PUBLIC_BUILDBASE_SERVER_URL=https://api.buildbase.app
NEXT_PUBLIC_BUILDBASE_ORG_ID=your-org-id
NEXT_PUBLIC_BUILDBASE_CLIENT_ID=your-client-id
NEXT_PUBLIC_BUILDBASE_REDIRECT_URL=http://localhost:3000
BUILDBASE_CLIENT_SECRET=your-client-secret

# Optional: Skip validation during CI
# SKIP_ENV_VALIDATION=true
```

---

## 📚 Additional Documentation

See the `knowledge/` folder for detailed guides:

- `authentication.md` - Auth flow and BuildBase SDK
- `multi-language-support.md` - i18n setup
- `theme-management.md` - Theming guide
- `ui-components.md` - shadcn/ui usage
- `security.md` - Security best practices
- `next-seo.md` - SEO implementation
- `seo-i18n-a11y-roadmap.md` - Full roadmap with implementation details

---

## 🚀 Getting Started

1. **Clone and install:**

   ```bash
   git clone <repo-url>
   cd base-repo
   npm install
   ```

2. **Set up environment:**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

3. **Set up database:**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run development server:**

   ```bash
   npm run dev
   ```

5. **Open browser:**
   Visit `http://localhost:3000`

---

## 📝 License

MIT
