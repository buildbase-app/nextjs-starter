# Contributing Guide

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Internationalization](#internationalization)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. Please:

- Be respectful and constructive in discussions
- Welcome newcomers and help them get started
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 20+ (check `.nvmrc` for exact version)
- npm 10+
- PostgreSQL database
- Git

### Setup

1. **Fork the repository** on GitHub

2. **Clone your fork:**

   ```bash
   git clone https://github.com/YOUR_USERNAME/REPO_NAME.git
   cd REPO_NAME
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up environment:**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

5. **Set up database:**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. **Start development server:**
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming

Use descriptive branch names:

- `feature/add-user-profile` - New features
- `fix/login-redirect-loop` - Bug fixes
- `docs/update-readme` - Documentation changes
- `refactor/auth-module` - Code refactoring
- `chore/update-deps` - Maintenance tasks

### Creating a Branch

```bash
# Sync with main
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name
```

### Running Checks

Before committing, ensure all checks pass:

```bash
# Run all checks
npm run check

# Or run individually
npm run lint        # ESLint
npm run format:check # Prettier
npm run typecheck   # TypeScript
```

### Pre-commit Hooks

Husky runs automatically on commit:

- ESLint with auto-fix
- Prettier formatting
- TypeScript type checking

## Pull Request Process

### Before Submitting

1. **Update your branch:**

   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Run all checks:**

   ```bash
   npm run check
   ```

3. **Test your changes** in both light and dark themes

4. **Test i18n** if you added user-facing text

### Submitting a PR

1. Push your branch to your fork
2. Open a Pull Request against `main`
3. Fill out the PR template completely
4. Link any related issues

### PR Title Format

Use conventional commit format:

```
feat: add user profile page
fix: resolve login redirect loop
docs: update API documentation
refactor: simplify auth flow
chore: update dependencies
```

### Review Process

- PRs require at least one approval
- CI checks must pass
- Address all review comments
- Keep PRs focused and small when possible

## Coding Standards

### TypeScript

- Use strict TypeScript (no `any` types)
- Define proper interfaces/types
- Use path aliases (`@/components`, `@/lib`)

```typescript
// ✅ Good
interface User {
  id: string;
  email: string;
  name?: string;
}

// ❌ Bad
const user: any = { ... };
```

### React Components

- Use functional components with hooks
- Keep components focused and small
- Extract reusable logic into hooks

```typescript
// ✅ Good
export function UserCard({ user }: { user: User }) {
  return (
    <div className="...">
      <p>{user.name}</p>
    </div>
  );
}

// ❌ Bad - component doing too much
export function UserPage() {
  // 500 lines of code...
}
```

### Styling

- Use Tailwind CSS classes
- Follow the existing design system
- Use CSS variables for theming

```tsx
// ✅ Good
<div className="rounded-lg bg-background text-foreground p-4">

// ❌ Bad - inline styles
<div style={{ backgroundColor: 'white', padding: '16px' }}>
```

### File Organization

```
src/
├── app/              # Next.js app router pages
├── components/
│   ├── ui/           # shadcn/ui components
│   └── [feature]/    # Feature-specific components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
│   ├── format/       # Formatting utilities
│   └── validation/   # Zod schemas
└── i18n/             # Internationalization
    └── messages/     # Translation files
```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type       | Description                         |
| ---------- | ----------------------------------- |
| `feat`     | New feature                         |
| `fix`      | Bug fix                             |
| `docs`     | Documentation changes               |
| `style`    | Code style (formatting, semicolons) |
| `refactor` | Code refactoring                    |
| `test`     | Adding or updating tests            |
| `chore`    | Maintenance tasks                   |
| `perf`     | Performance improvements            |
| `ci`       | CI/CD changes                       |

### Examples

```bash
feat(auth): add password reset flow
fix(i18n): correct Arabic RTL alignment
docs(readme): add deployment instructions
refactor(api): simplify error handling
```

## Internationalization

### Adding Translations

When adding user-facing text:

1. Add the key to all language files in `src/i18n/messages/`
2. Use the translation in your component:

```typescript
import { useTranslations } from 'next-intl';

function MyComponent() {
  const t = useTranslations('namespace');
  return <p>{t('key')}</p>;
}
```

### Translation Files

```
src/i18n/messages/
├── en.ts    # English (default)
├── hi.ts    # Hindi
├── es.ts    # Spanish
├── fr.ts    # French
├── de.ts    # German
├── ja.ts    # Japanese
├── zh.ts    # Chinese
└── ar.ts    # Arabic (RTL)
```

### Guidelines

- Keep translations consistent in tone
- Consider text length (some languages are longer)
- Test RTL languages (Arabic)

## Testing

### Running Tests

```bash
# Run all tests (when implemented)
npm test

# Run in watch mode
npm run test:watch
```

### Writing Tests

- Test component behavior, not implementation
- Use meaningful test descriptions
- Mock external dependencies

## Documentation

### Updating Docs

- Update `README.md` for major changes
- Add/update `knowledge/*.md` for new features
- Include JSDoc comments for utilities

### Knowledge Base

Add documentation for new features in `knowledge/`:

````markdown
# Feature Name

Brief description.

## Key Files

| File      | Purpose     |
| --------- | ----------- |
| `src/...` | Description |

## Usage

```typescript
// Code examples
```
````

## Configuration

Explain any configuration options.

```

## Questions?

If you have questions:

1. Check existing documentation in `knowledge/`
2. Search existing issues
3. Open a new issue for discussion

Thank you for contributing! 🎉
```
