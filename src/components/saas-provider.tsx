'use client';

import { ApiVersion, type EventType, type EventData } from '@buildbase/sdk';
import React from 'react';
import { env } from '@/env';
import { SaaSOSProvider } from '@buildbase/sdk/react';
import { useLocale } from 'next-intl';
import { Locale } from '@/i18n/config';

const config = {
  serverUrl: env.NEXT_PUBLIC_BUILDBASE_SERVER_URL,
  orgId: env.NEXT_PUBLIC_BUILDBASE_ORG_ID,
  clientId: env.NEXT_PUBLIC_BUILDBASE_CLIENT_ID,
  redirectUrl: env.NEXT_PUBLIC_BUILDBASE_REDIRECT_URL,
};

function storeAuthToken(token: string) {
  localStorage.setItem('auth_token', token);
}

function clearAuthToken() {
  localStorage.removeItem('auth_token');
}

/**
 * Only the workspace is sent. The server derives the user from the session
 * cookie and the role from UserWorkspace — a client cannot assert either, and
 * should not be asked to.
 */
async function updateAuthToken(workspaceId: string) {
  try {
    const response = await fetch('/api/auth/workspace-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workspaceId }),
    });
    const data = await response.json();
    if (data.success && data.token) {
      storeAuthToken(data.token);
      return data.token;
    }
  } catch (error) {
    console.error('Failed to update auth token:', error);
  }
  return null;
}

export function SaaSProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale() as Locale;
  return (
    <SaaSOSProvider
      serverUrl={config.serverUrl}
      version={ApiVersion.V1}
      orgId={config.orgId}
      locale={locale}
      defaultPermissions={{
        admin: ['create', 'share', 'delete'],
        editor: ['create', 'share'],
        viewer: ['share'],
      }}
      auth={{
        clientId: config.clientId,
        redirectUrl: config.redirectUrl,
        callbacks: {
          // Called on page refresh to restore session from httpOnly cookie
          getSession: async () => {
            const res = await fetch('/api/auth/session');
            const data = await res.json();
            return data.sessionId ?? null;
          },
          handleAuthentication: async (code: string) => {
            const response = await fetch('/api/auth/token', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ code }),
            });
            const data = await response.json();
            if (data.success && data.token) {
              storeAuthToken(data.token);
            }
            return { sessionId: data.sessionId };
          },
          onSignOut: async () => {
            clearAuthToken();
            await fetch('/api/auth/signout', { method: 'POST' });
          },
          handleEvent: async (eventType: EventType, data: EventData) => {
            try {
              // Sync event to database
              await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventType, data }),
              });

              // Generate new workspace token on workspace change
              if (eventType === 'workspace:changed') {
                const eventData = data as unknown as {
                  workspace: { _id: string };
                  user: { _id: string; id?: string };
                  userRole?: string;
                };
                if (eventData.workspace) {
                  await updateAuthToken(eventData.workspace._id);
                }
              }

              // Generate token when user is added to workspace
              if (eventType === 'workspace:user-added') {
                const eventData = data as unknown as {
                  userId: string;
                  workspace: { _id: string };
                  role: string;
                };
                await updateAuthToken(eventData.workspace._id);
              }
            } catch (error) {
              console.error('Failed to handle event:', error);
            }
          },
          onWorkspaceChange: async (params) => {
            const { workspace } = params;
            if (!workspace?._id) return;
            await updateAuthToken(workspace._id);
          },
        },
      }}
    >
      {children}
    </SaaSOSProvider>
  );
}
