import 'server-only';
import { createAgentStack } from '@buildbase/sdk/mcp';
import { env, siteUrl } from '@/env';
import { siteConfig } from '@/config/site';
import { logger } from '@/lib/logger';
import {
  SCOPES,
  documentTools,
  documentResources,
  documentResourceTemplates,
  documentPrompts,
} from './tools';
import { buildLlmsTxt, buildLlmsFullTxt, buildSkillMarkdown } from './content';
import { buildOpenApiSpec } from './openapi';

/**
 * The agent stack: MCP server + every discovery document, from one config.
 *
 *   /api/mcp                         ← agent.routes
 *   /.well-known/*  /llms.txt  /auth.md  /security.txt  /openapi.json
 *                                    ← agent.serveAgentPath
 *
 * `secret` wires `buildbaseAuth`: every MCP request must carry a token this
 * app minted in /api/auth/oauth2-token, with `aud` bound to <site>/mcp, and
 * the encrypted `sid` claim is turned back into the user's BuildBase session
 * so tools run with the user's real permissions.
 */
export const agent = createAgentStack({
  serverUrl: env.NEXT_PUBLIC_BUILDBASE_SERVER_URL,
  orgId: env.NEXT_PUBLIC_BUILDBASE_ORG_ID,
  siteUrl,
  site: {
    name: siteConfig.name,
    description: siteConfig.description,
    documentationUrl: `${siteUrl}/llms-full.txt`,
    contactEmail: siteConfig.contact.support,
    provider: { name: 'BuildBase', url: siteConfig.buildbase.url },
  },
  secret: env.SYSTEM_SECRET,
  scopes: [...SCOPES],
  mcp: {
    serverInfo: { name: 'buildbase-demo', version: '0.3.0' },
    builtinTools: 'readonly',
    tools: documentTools,
    handler: {
      instructions:
        "This is the BuildBase Demo. Built-in tools read the user's BuildBase account (workspaces, subscription, usage, credits). The document tools read and write the demo's own data. Ask for a workspaceId when the user has several workspaces.",
      builtinResources: true,
      resources: documentResources,
      resourceTemplates: documentResourceTemplates,
      prompts: documentPrompts,
      onError: (error, ctx) => {
        logger.error('MCP error', {
          error: error instanceof Error ? error.message : String(error),
          ...(ctx as Record<string, unknown>),
        });
      },
      formatToolError: (error) =>
        error instanceof Error ? error.message : 'Tool failed',
    },
  },
  discovery: {
    llmsTxt: buildLlmsTxt(),
    llmsFullTxt: buildLlmsFullTxt(),
    skills: [
      {
        name: 'buildbase-demo',
        description:
          'Operate the BuildBase Demo as a signed-in user: account, billing, usage, credits and documents over MCP.',
        content: buildSkillMarkdown(),
      },
    ],
    security: {
      contact: `mailto:${siteConfig.contact.security}`,
      expires: '2027-09-01T00:00:00.000Z',
      policy: `${siteConfig.repo}/blob/main/SECURITY.md`,
    },
    apiCatalog: [
      {
        anchor: `${siteUrl}/api`,
        title: `${siteConfig.name} API`,
        serviceDesc: `${siteUrl}/openapi.json`,
        serviceDoc: `${siteUrl}/llms-full.txt`,
        status: `${siteUrl}/api/health`,
      },
    ],
    extraPaths: {
      '/openapi.json': {
        body: JSON.stringify(buildOpenApiSpec(), null, 2),
        contentType: 'application/json; charset=utf-8',
        cacheControl: 'public, max-age=300',
      },
    },
  },
});
