import 'server-only';
import { z } from 'zod';
import {
  defineMcpTool,
  defineMcpResource,
  defineMcpResourceTemplate,
  defineMcpPrompt,
  mcpText,
  type McpToolContext,
} from '@buildbase/sdk/mcp';
import {
  listDocuments,
  getDocument,
  createDocument,
  updateDocument,
  getWorkspaceStats,
  DOCUMENT_STATUSES,
} from '@/lib/documents';
import { resolveWorkspaceRole, canWrite } from '@/lib/server-auth';
import { buildLlmsFullTxt } from './content';
import { detect } from '@/tour/progress';

/**
 * The demo's own MCP tools — what an AI agent can do with *this app's* data
 * once it has completed the OAuth flow.
 *
 * Every tool runs under the agent's user session (`ctx.bb`), and workspace
 * membership is re-checked against BuildBase on each call, so an agent can
 * never see or touch a workspace its user does not belong to. Write tools
 * additionally require the `documents:write` scope, which the user grants on
 * the consent screen — reads only need a valid session.
 *
 * Built-in BuildBase tools (workspaces, subscription, usage, credits, …) are
 * added automatically by `createAgentStack` in read-only mode.
 */

export const SCOPES = [
  {
    name: 'documents:read',
    description: 'Read and search documents in workspaces you belong to',
  },
  {
    name: 'documents:write',
    description: 'Create documents and change their status on your behalf',
  },
] as const;

class ToolError extends Error {}

/**
 * Pick the workspace a tool should act on: explicit argument, then the
 * workspace pinned in the token, then — if the user has exactly one — that.
 * Always confirms membership with the platform and returns the role.
 */
async function resolveWorkspace(
  ctx: McpToolContext,
  workspaceId?: string
): Promise<{ workspaceId: string; role: string }> {
  const userId = ctx.auth.userId;
  if (!userId) throw new ToolError('Token has no user — re-authenticate.');
  await tick(ctx, 'mcp:tool-called');

  let id = workspaceId ?? ctx.workspaceId;
  if (!id) {
    const all = await ctx.bb.workspace.list();
    if (all.length === 1) id = all[0]._id;
    else
      throw new ToolError(
        `workspaceId is required. Your workspaces: ${
          all.map((w) => `${w.name} (${w._id})`).join(', ') || 'none'
        }`
      );
  }

  const role = await resolveWorkspaceRole(ctx.bb, id, userId);
  if (!role) throw new ToolError(`You are not a member of workspace ${id}.`);
  return { workspaceId: id, role };
}

/** The tour: tick a task from inside a tool, as the person the token is for. */
async function tick(ctx: McpToolContext, action: string) {
  if (ctx.auth.userId) {
    await detect(ctx.auth.userId, { kind: 'action', action });
  }
}

function actor(ctx: McpToolContext) {
  const claims = ctx.auth.claims ?? {};
  return {
    userId: ctx.auth.userId ?? 'agent',
    name: typeof claims.name === 'string' ? claims.name : null,
  };
}

const workspaceArg = z
  .string()
  .optional()
  .describe(
    'BuildBase workspace id. Optional when the token is pinned to a workspace or the user has only one.'
  );

export const documentTools = [
  defineMcpTool({
    name: 'list_documents',
    description:
      'List documents in a workspace, newest first. Filter by status or tag; use search_documents for full-text search.',
    inputSchema: z.object({
      workspaceId: workspaceArg,
      status: z.enum(DOCUMENT_STATUSES).optional(),
      tag: z.string().optional(),
      limit: z.number().int().min(1).max(100).optional(),
      cursor: z.string().optional().describe('nextCursor from a previous call'),
    }),
    annotations: { readOnlyHint: true },
    execute: async (input, ctx) => {
      const { workspaceId } = await resolveWorkspace(ctx, input.workspaceId);
      return listDocuments(workspaceId, input);
    },
  }),

  defineMcpTool({
    name: 'search_documents',
    description:
      'Full-text search across document titles and bodies in a workspace.',
    inputSchema: z.object({
      workspaceId: workspaceArg,
      query: z.string().min(1),
      limit: z.number().int().min(1).max(50).optional(),
    }),
    annotations: { readOnlyHint: true },
    execute: async (input, ctx) => {
      const { workspaceId } = await resolveWorkspace(ctx, input.workspaceId);
      return listDocuments(workspaceId, { q: input.query, limit: input.limit });
    },
  }),

  defineMcpTool({
    name: 'get_document',
    description: 'Read one document in full (markdown body included).',
    inputSchema: z.object({
      workspaceId: workspaceArg,
      documentId: z.string().min(1),
    }),
    annotations: { readOnlyHint: true },
    execute: async (input, ctx) => {
      const { workspaceId } = await resolveWorkspace(ctx, input.workspaceId);
      const doc = await getDocument(workspaceId, input.documentId);
      if (!doc) throw new ToolError(`Document ${input.documentId} not found.`);
      return doc;
    },
  }),

  defineMcpTool({
    name: 'get_document_stats',
    description:
      'Counts of documents by status and the most used tags in a workspace.',
    inputSchema: z.object({ workspaceId: workspaceArg }),
    annotations: { readOnlyHint: true },
    execute: async (input, ctx) => {
      const { workspaceId } = await resolveWorkspace(ctx, input.workspaceId);
      return getWorkspaceStats(workspaceId);
    },
  }),

  defineMcpTool({
    name: 'create_document',
    description:
      'Create a markdown document. Records one unit against the `documents` quota and consumes one credit — the response says whether each succeeded.',
    inputSchema: z.object({
      workspaceId: workspaceArg,
      title: z.string().min(1).max(200),
      content: z.string().min(1).max(50_000).describe('Markdown body'),
      status: z.enum(DOCUMENT_STATUSES).optional(),
      tags: z.array(z.string()).max(10).optional(),
    }),
    requiredScopes: ['documents:write'],
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
    },
    execute: async (input, ctx) => {
      const { workspaceId, role } = await resolveWorkspace(
        ctx,
        input.workspaceId
      );
      if (!canWrite(role))
        throw new ToolError(`Role "${role}" cannot create documents.`);
      const { document, metering } = await createDocument(
        ctx.bb,
        workspaceId,
        actor(ctx),
        input,
        { source: 'mcp' }
      );
      await tick(ctx, 'mcp:document-created');
      return { document, metering };
    },
  }),

  defineMcpTool({
    name: 'update_document_status',
    description:
      'Move a document between draft, in_review, published and archived.',
    inputSchema: z.object({
      workspaceId: workspaceArg,
      documentId: z.string().min(1),
      status: z.enum(DOCUMENT_STATUSES),
    }),
    requiredScopes: ['documents:write'],
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
    },
    execute: async (input, ctx) => {
      const { workspaceId, role } = await resolveWorkspace(
        ctx,
        input.workspaceId
      );
      if (!canWrite(role))
        throw new ToolError(`Role "${role}" cannot update documents.`);
      const doc = await updateDocument(
        workspaceId,
        input.documentId,
        actor(ctx),
        { status: input.status },
        'mcp'
      );
      if (!doc) throw new ToolError(`Document ${input.documentId} not found.`);
      return doc;
    },
  }),
];

export const documentResources = [
  defineMcpResource({
    uri: 'demo://guide',
    name: 'demo-guide',
    title: 'BuildBase Demo — what this app is and how to use it',
    description:
      'The same content served at /llms-full.txt: every feature, route and tool in this demo.',
    mimeType: 'text/markdown',
    read: () => buildLlmsFullTxt(),
  }),
];

export const documentResourceTemplates = [
  defineMcpResourceTemplate({
    uriTemplate: 'demo://workspace/{workspaceId}/documents/{documentId}',
    name: 'document',
    title: 'A document in a workspace',
    mimeType: 'text/markdown',
    read: async (params, _uri, ctx) => {
      const { workspaceId } = await resolveWorkspace(ctx, params.workspaceId);
      const doc = await getDocument(workspaceId, params.documentId);
      if (!doc) throw new ToolError('Document not found.');
      return { text: `# ${doc.title}\n\n${doc.content}` };
    },
  }),
];

export const documentPrompts = [
  defineMcpPrompt({
    name: 'summarize_workspace',
    title: 'Summarise a workspace',
    description:
      'Pulls plan, seats, quota usage, credit balance and recent documents, then asks for a one-page status summary.',
    arguments: [{ name: 'workspaceId', required: false }],
    get: async (args, ctx) => {
      const { workspaceId } = await resolveWorkspace(ctx, args.workspaceId);
      const [workspace, subscription, quotas, credits, docs] =
        await Promise.all([
          ctx.bb.workspace.get(workspaceId),
          ctx.bb.subscription.get(workspaceId).catch(() => null),
          ctx.bb.usage.getAll(workspaceId).catch(() => null),
          ctx.bb.credits.getBalance(workspaceId).catch(() => null),
          listDocuments(workspaceId, { limit: 10 }),
        ]);
      const facts = {
        workspace: {
          id: workspace._id,
          name: workspace.name,
          members: workspace.users?.length ?? 0,
        },
        subscription,
        quotas,
        credits,
        recentDocuments: docs.items,
      };
      return [
        {
          role: 'user',
          content: mcpText(
            `Write a one-page status summary for this workspace for its owner. Cover plan and trial state, seats, quota headroom, credit balance, and what the team has been documenting. Flag anything that needs action.\n\n\`\`\`json\n${JSON.stringify(facts, null, 2)}\n\`\`\``
          ),
        },
      ];
    },
  }),
];
