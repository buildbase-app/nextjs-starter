# Next.js Enterprise Starter

A production-ready Next.js 16 starter with internationalization, authentication, theming, and enterprise-grade tooling.

## ✨ Features

- **Framework**: Next.js 16.1.4 with App Router
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **i18n**: 8 languages with RTL support (next-intl)
- **Auth**: OAuth via BuildBase SDK
- **Database**: PostgreSQL with Prisma ORM
- **Theming**: Light/Dark/System modes (next-themes)
- **SEO**: Multi-language sitemap, metadata API, structured data ready
- **Security**: CSP, HSTS, and comprehensive security headers
- **DX**: ESLint, Prettier, Husky pre-commit hooks, bundle analyzer

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

## 📁 Project Structure

```
src/
├── app/
│   ├── sitemap.ts          # Multi-language sitemap
│   ├── robots.ts           # Robots.txt config
│   ├── [locale]/           # Localized pages
│   │   ├── layout.tsx      # Root layout with metadata
│   │   ├── page.tsx        # Home page (server-rendered)
│   │   └── dashboard/      # Protected routes (client)
│   └── api/                # API routes
│       └── auth/token/     # OAuth token exchange
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── theme-provider.tsx  # Theme context
│   ├── theme-toggle.tsx    # Theme switcher
│   ├── language-switcher.tsx
│   └── saas-provider.tsx   # BuildBase auth provider
├── i18n/
│   ├── config.ts           # Locale configuration
│   ├── routing.ts          # i18n routing setup
│   ├── request.ts          # Server locale handling
│   └── messages/           # Translation files (*.ts)
├── hooks/                  # Custom React hooks
└── lib/
    └── utils.ts            # Utility functions (cn helper)

knowledge/                  # Documentation
prisma/                     # Database schema
public/                     # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (see `.nvmrc`)
- PostgreSQL database
- BuildBase account (for auth)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd base-repo

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

### Environment Variables

| Variable                  | Description                       |
| ------------------------- | --------------------------------- |
| `SITE_URL`                | Production URL for sitemap/SEO    |
| `DATABASE_URL`            | PostgreSQL connection string      |
| `SYSTEM_SECRET`           | JWT signing secret (min 32 chars) |
| `NEXT_PUBLIC_BUILDBASE_*` | BuildBase SDK configuration       |
| `BUILDBASE_CLIENT_SECRET` | OAuth client secret (server-side) |

## 📜 Available Scripts

| Script                  | Description                                |
| ----------------------- | ------------------------------------------ |
| `npm run dev`           | Start development server                   |
| `npm run build`         | Build for production                       |
| `npm start`             | Start production server                    |
| `npm run lint`          | Run ESLint                                 |
| `npm run lint:fix`      | Fix ESLint errors                          |
| `npm run format`        | Format with Prettier                       |
| `npm run typecheck`     | TypeScript type checking                   |
| `npm run check`         | Run all checks (lint + format + typecheck) |
| `npm run build:analyze` | Build with bundle analyzer                 |

## 📚 Documentation

Detailed documentation is available in the `knowledge/` folder:

| Document                                                      | Description                             |
| ------------------------------------------------------------- | --------------------------------------- |
| [Authentication](knowledge/authentication.md)                 | OAuth setup with BuildBase SDK          |
| [Multi-language Support](knowledge/multi-language-support.md) | i18n configuration and usage            |
| [Theme Management](knowledge/theme-management.md)             | Light/dark mode implementation          |
| [SEO Configuration](knowledge/next-seo.md)                    | Metadata, sitemap, and structured data  |
| [Security](knowledge/security.md)                             | Security headers and best practices     |
| [UI Components](knowledge/ui-components.md)                   | shadcn/ui component library             |
| [Development Roadmap](knowledge/seo-i18n-a11y-roadmap.md)     | Implementation status and pending items |

## 🎨 Adding UI Components

Use the shadcn/ui CLI to add components:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

## 🌐 Adding Translations

1. Create or update translation files in `src/i18n/messages/`
2. Follow the `Messages` type structure for type safety
3. Use `useTranslations` hook in client components
4. Use `getTranslations` in server components

```tsx
// Client component
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('common');
  return <button>{t('buttons.submit')}</button>;
}
```

## 🔒 Security

All responses include security headers configured in middleware:

- Content-Security-Policy (CSP)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Strict-Transport-Security (HSTS)
- Referrer-Policy
- Permissions-Policy

See [security.md](knowledge/security.md) for details.

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Follow existing code patterns
2. Ensure all checks pass: `npm run check`
3. Add i18n support for user-facing text
4. Test in both light and dark themes
5. Update documentation in `knowledge/` if needed

## 📄 License

MIT
