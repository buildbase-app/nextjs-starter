import { siteUrl } from '@/env';

/**
 * Demo identity — the one place that says what this app is.
 * Everything agent-facing (llms.txt, agent cards, OpenAPI, AGENTS.md links)
 * and the "How it works" explainers read from here.
 */
export const siteConfig = {
  name: 'BuildBase Demo',
  shortName: 'Demo',
  description:
    'A working SaaS app built on the BuildBase SDK: OAuth sign-in, multi-tenant workspaces, subscriptions, credits, usage quotas, feature flags, push notifications, webhooks, an MCP server for AI agents, and 8 languages.',
  url: siteUrl,
  /** Where the code lives — every "View source" link points here. */
  repo: 'https://github.com/buildbase-app/nextjs-starter',
  repoBranch: 'main',
  /** The platform behind the demo. */
  buildbase: {
    url: 'https://buildbase.app',
    docs: 'https://buildbase.app/docs',
    sdkDocs: 'https://www.npmjs.com/package/@buildbase/sdk',
    agentGuide:
      'https://github.com/buildbase-app/sdk/blob/main/docs/MCP-AND-AGENT-READINESS.md',
    console: 'https://console.buildbase.app',
  },
  contact: {
    support: 'support@buildbase.app',
    security: 'security@buildbase.app',
  },
} as const;

/** The command a visitor runs to take the app home. */
export const cloneCommand = `git clone ${siteConfig.repo}.git`;

/**
 * Absolute GitHub URL for a path in this repo. A folder, or a glob like
 * `src/app/api/auth/*`, opens the folder view; a file opens the file.
 */
export function sourceUrl(path: string): string {
  const clean = path.replace(/^\/+/, '').replace(/\/\*$/, '');
  const isFile = /\.[a-z0-9]+$/i.test(clean.split('/').pop() ?? '');
  return `${siteConfig.repo}/${isFile ? 'blob' : 'tree'}/${siteConfig.repoBranch}/${clean}`;
}
