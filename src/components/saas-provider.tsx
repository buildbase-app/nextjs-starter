'use client';

import {
  SaaSOSProvider,
  ApiVersion,
  type EventType,
  type EventData,
} from '@buildbase/sdk';
import React from 'react';
import { env } from '@/env';

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

async function updateAuthToken(
  userId: string,
  workspaceId: string,
  userRole: string
) {
  try {
    const response = await fetch('/api/auth/workspace-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, workspaceId, userRole }),
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
  return (
    <SaaSOSProvider
      serverUrl={config.serverUrl}
      version={ApiVersion.V1}
      orgId={config.orgId}
      auth={{
        clientId: config.clientId,
        redirectUrl: config.redirectUrl,
        callbacks: {
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
                if (eventData.workspace && eventData.user) {
                  const userId = eventData.user.id || eventData.user._id;
                  await updateAuthToken(
                    userId,
                    eventData.workspace._id,
                    eventData.userRole || 'member'
                  );
                }
              }

              // Generate token when user is added to workspace
              if (eventType === 'workspace:user-added') {
                const eventData = data as unknown as {
                  userId: string;
                  workspace: { _id: string };
                  role: string;
                };
                await updateAuthToken(
                  eventData.userId,
                  eventData.workspace._id,
                  eventData.role
                );
              }
            } catch (error) {
              console.error('Failed to handle event:', error);
            }
          },
        },
      }}
    >
      {children}
    </SaaSOSProvider>
  );
}
