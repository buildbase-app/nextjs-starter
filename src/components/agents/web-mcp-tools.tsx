'use client';

import { useEffect } from 'react';
import { provideWebMcpTools } from '@buildbase/sdk';
import { usePermissions, useSaaSWorkspaces } from '@buildbase/sdk/react';
import { useRouter } from '@/i18n/routing';
import { DOCUMENT_PERMISSIONS } from '@/lib/documents/roles';

/**
 * WebMCP: the same actions an agent gets over /api/mcp, offered to an agent
 * running inside the browser (`navigator.modelContext`). They run as the
 * signed-in person, through the app's own API routes, so the server applies
 * the same permission checks. A no-op in browsers without WebMCP.
 */
export function WebMcpTools() {
  const { currentWorkspace } = useSaaSWorkspaces();
  const { can } = usePermissions();
  const router = useRouter();
  const workspaceId = currentWorkspace?._id;
  const canCreate = can(DOCUMENT_PERMISSIONS.create);

  useEffect(() => {
    if (!workspaceId) return;
    const json = async (res: Response) => {
      const body = await res.json().catch(() => null);
      if (!res.ok) throw new Error(body?.error ?? `HTTP ${res.status}`);
      return body;
    };
    provideWebMcpTools([
      {
        name: 'list_documents',
        description:
          'List documents in the current workspace, optionally filtered by a search query.',
        inputSchema: {
          type: 'object',
          properties: { query: { type: 'string' } },
        },
        execute: async ({ query }: { query?: string }) =>
          json(
            await fetch(
              `/api/documents?workspaceId=${workspaceId}${
                query ? `&q=${encodeURIComponent(query)}` : ''
              }`
            )
          ),
      },
      ...(canCreate
        ? [
            {
              name: 'create_document',
              description:
                'Create a document in the current workspace. Uses one credit and the documents quota.',
              inputSchema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  content: { type: 'string' },
                },
                required: ['title'],
              },
              execute: async (input: { title: string; content?: string }) =>
                json(
                  await fetch('/api/documents', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ workspaceId, ...input }),
                  })
                ),
            },
          ]
        : []),
      {
        name: 'open_page',
        description:
          'Open a page of this app, for example /dashboard/documents or /dashboard/usage.',
        inputSchema: {
          type: 'object',
          properties: { path: { type: 'string', pattern: '^/dashboard' } },
          required: ['path'],
        },
        execute: ({ path }: { path: string }) => {
          if (!path.startsWith('/dashboard')) throw new Error('Not allowed');
          router.push(path);
          return { opened: path };
        },
      },
    ]);
  }, [workspaceId, canCreate, router]);

  return null;
}
