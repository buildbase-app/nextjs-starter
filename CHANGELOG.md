# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Sentry error monitoring integration with session replay
- Global error boundary (`src/app/global-error.tsx`)
- Sentry utility functions (`src/lib/sentry.ts`)

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

- **0.1.0** - Initial release with full feature set

[Unreleased]: https://github.com/user/repo/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/user/repo/releases/tag/v0.1.0
