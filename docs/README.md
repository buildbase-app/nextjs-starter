# Base Repo Documentation

A production-ready Next.js 16 starter template with internationalization, authentication, theming, and security best practices.

---

## 🚀 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript (strict mode) |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | shadcn/ui (Radix primitives) |
| **Theming** | next-themes (light/dark/system) |
| **Internationalization** | next-intl (8 languages) |
| **Authentication** | BuildBase SDK (OAuth) |
| **Database** | PostgreSQL + Prisma ORM |
| **Icons** | Lucide React |

---

## 📁 Project Structure

```
base-repo/
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
│   │   │   ├── auth/        # Token endpoints
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
│   └── lib/
│       ├── auth.ts          # JWT token utilities
│       ├── db.ts            # Prisma client
│       └── utils.ts         # Utility functions
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
- **Input validation** on auth endpoints

### UI/UX
- **Theme support** (light/dark/system)
- **Sidebar navigation** with collapsible menu
- **Responsive design** with mobile detection hook
- **Loading states** and skeleton components

### Code Quality
- **TypeScript strict mode**
- **ESLint + Prettier** configuration
- **Path aliases** (`@/*`)
- **VS Code settings** for auto-formatting

---

## 🔲 Suggested Additions

Based on the existing codebase and roadmap, here are recommended improvements:

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

#### 2. Form Validation with Zod
**Why:** Type-safe validation for forms and API inputs.

```bash
npm install zod react-hook-form @hookform/resolvers
```

Create `src/lib/validation/schemas.ts`:
```typescript
import { z } from 'zod';

export const emailSchema = z.string().email();
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(8),
});
```

---

#### 3. Pre-commit Hooks
**Why:** Enforce code quality before commits.

```bash
npm install --save-dev husky lint-staged
npx husky init
```

---

#### 4. Environment Validation
**Why:** Catch missing env vars at build time.

```bash
npm install @t3-oss/env-nextjs zod
```

Create `src/env.ts` to validate all environment variables.

---

#### 5. JSON-LD Structured Data
**Why:** Enables rich snippets in search results.

Schemas to implement:
- `Organization`
- `WebSite`
- `BreadcrumbList`
- `WebPage`

---

#### 6. Skip-to-Content Link
**Why:** Accessibility requirement for keyboard users.

```typescript
// src/components/skip-link.tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2"
    >
      Skip to content
    </a>
  );
}
```

---

### Medium Priority

#### 7. Utility Functions Library
Centralized formatting utilities:

```
src/lib/format/
├── date.ts      # formatDate, formatRelativeTime
├── number.ts    # formatCurrency, formatCompact
└── string.ts    # slugify, truncate, capitalize
```

---

#### 8. API Service Layer
Type-safe HTTP client for data fetching:

```
src/services/
├── api.ts           # HTTP client
└── endpoints/
    ├── auth.ts
    └── workspace.ts
```

---

#### 9. Health Check Endpoint
For deployment monitoring:

```typescript
// src/app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
}
```

---

#### 10. Error Boundaries
Global error handling:
- `src/app/[locale]/error.tsx` - Page-level
- `src/app/[locale]/not-found.tsx` - Localized 404

---

#### 11. Logging Utility
Structured logging for dev/prod:

```typescript
// src/lib/logger.ts
export const logger = {
  debug: (msg, data?) => log('debug', msg, data),
  info: (msg, data?) => log('info', msg, data),
  warn: (msg, data?) => log('warn', msg, data),
  error: (msg, data?) => log('error', msg, data),
};
```

---

#### 12. Bundle Analyzer
Analyze and optimize bundle size:

```bash
npm install --save-dev @next/bundle-analyzer
```

---

### Low Priority

#### 13. RSS Feeds
For blog/news content: `src/app/[locale]/feed.xml/route.ts`

#### 14. ARIA Landmarks
Complete semantic HTML structure with proper roles.

#### 15. Focus Indicators
Enhanced visible focus states for keyboard navigation.

#### 16. Reduced Motion Support
Respect `prefers-reduced-motion` media query.

#### 17. High Contrast Mode
Support `prefers-contrast: high` media query.

---

## 🔧 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting |
| `npm run check` | Run lint + format check |

---

## 🌐 Environment Variables

```env
# BuildBase SDK
NEXT_PUBLIC_BUILDBASE_SERVER_URL=https://api.buildbase.app
NEXT_PUBLIC_BUILDBASE_ORG_ID=your-org-id
NEXT_PUBLIC_BUILDBASE_CLIENT_ID=your-client-id
NEXT_PUBLIC_BUILDBASE_REDIRECT_URL=http://localhost:3000

# Security
SYSTEM_SECRET=your-32-char-jwt-secret

# Database
DATABASE_URL=postgresql://user:pass@host:5432/db

# Site
SITE_URL=https://yourdomain.com
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
