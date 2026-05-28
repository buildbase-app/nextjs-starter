import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * Environment variables validation using @t3-oss/env-nextjs and Zod
 *
 * This validates environment variables at build time and provides
 * type-safe access throughout the application.
 *
 * Server-side variables are only available on the server.
 * Client-side variables (NEXT_PUBLIC_*) are available everywhere.
 */
export const env = createEnv({
  /**
   * Server-side environment variables schema
   * These are only available on the server.
   */
  server: {
    // Database
    DATABASE_URL: z
      .string()
      .url('DATABASE_URL must be a valid PostgreSQL connection URL')
      .optional(),

    // Security
    SYSTEM_SECRET: z
      .string()
      .min(32, 'SYSTEM_SECRET must be at least 32 characters for security'),

    // BuildBase (server-side)
    BUILDBASE_CLIENT_SECRET: z
      .string()
      .min(1, 'BUILDBASE_CLIENT_SECRET is required'),

    // BuildBase OAuth2 — used by /api/auth/oauth2-token and /api/auth/oauth2-profile
    // This is the clientSecret from the OAuth2 auth settings (may differ from the main client secret)
    BUILDBASE_OAUTH2_CLIENT_ID: z.string().optional(),
    BUILDBASE_OAUTH2_CLIENT_SECRET: z.string().optional(),

    // Sentry (server-side, for source map uploads)
    SENTRY_ORG: z.string().optional(),
    SENTRY_PROJECT: z.string().optional(),
    SENTRY_AUTH_TOKEN: z.string().optional(),

    // Node environment
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
  },

  /**
   * Client-side environment variables schema
   * These are exposed to the browser (prefixed with NEXT_PUBLIC_)
   */
  client: {
    // Site URL
    NEXT_PUBLIC_SITE_URL: z
      .string()
      .url('NEXT_PUBLIC_SITE_URL must be a valid URL')
      .optional()
      .default('https://example.com'),

    // BuildBase SDK
    NEXT_PUBLIC_BUILDBASE_SERVER_URL: z
      .string()
      .url('NEXT_PUBLIC_BUILDBASE_SERVER_URL must be a valid URL')
      .optional()
      .default('https://api.buildbase.app'),

    NEXT_PUBLIC_BUILDBASE_ORG_ID: z
      .string()
      .min(1, 'NEXT_PUBLIC_BUILDBASE_ORG_ID is required'),

    NEXT_PUBLIC_BUILDBASE_CLIENT_ID: z
      .string()
      .min(1, 'NEXT_PUBLIC_BUILDBASE_CLIENT_ID is required'),

    NEXT_PUBLIC_BUILDBASE_REDIRECT_URL: z
      .string()
      .url('NEXT_PUBLIC_BUILDBASE_REDIRECT_URL must be a valid URL')
      .optional()
      .default('http://localhost:3000'),

    // Sentry (client-side)
    NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  },

  /**
   * Map environment variables to the schema
   * This tells the library which env vars to validate
   */
  runtimeEnv: {
    // Server
    DATABASE_URL: process.env.DATABASE_URL,
    SYSTEM_SECRET: process.env.SYSTEM_SECRET,
    BUILDBASE_CLIENT_SECRET: process.env.BUILDBASE_CLIENT_SECRET,
    BUILDBASE_OAUTH2_CLIENT_ID: process.env.BUILDBASE_OAUTH2_CLIENT_ID,
    BUILDBASE_OAUTH2_CLIENT_SECRET: process.env.BUILDBASE_OAUTH2_CLIENT_SECRET,
    SENTRY_ORG: process.env.SENTRY_ORG,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    NODE_ENV: process.env.NODE_ENV,

    // Client
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_BUILDBASE_SERVER_URL:
      process.env.NEXT_PUBLIC_BUILDBASE_SERVER_URL,
    NEXT_PUBLIC_BUILDBASE_ORG_ID: process.env.NEXT_PUBLIC_BUILDBASE_ORG_ID,
    NEXT_PUBLIC_BUILDBASE_CLIENT_ID:
      process.env.NEXT_PUBLIC_BUILDBASE_CLIENT_ID,
    NEXT_PUBLIC_BUILDBASE_REDIRECT_URL:
      process.env.NEXT_PUBLIC_BUILDBASE_REDIRECT_URL,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },

  /**
   * Run validation on build and in Edge runtime
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Throw if accessing server-side env on client
   */
  emptyStringAsUndefined: true,
});

/**
 * Alias for SITE_URL that falls back to NEXT_PUBLIC_SITE_URL
 * Used in sitemap.ts, robots.ts, and layout.tsx
 */
export const siteUrl =
  process.env.SITE_URL || env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
