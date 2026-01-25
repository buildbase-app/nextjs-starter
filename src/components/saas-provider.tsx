'use client';

import {
  SaaSOSProvider,
  ApiVersion,
  type EventType,
  type EventData,
} from '@buildbase/sdk';
import React from 'react';

const config = {
  serverUrl:
    process.env.NEXT_PUBLIC_BUILDBASE_SERVER_URL || 'https://api.buildbase.app',
  orgId: process.env.NEXT_PUBLIC_BUILDBASE_ORG_ID || '',
  clientId: process.env.NEXT_PUBLIC_BUILDBASE_CLIENT_ID || '',
  redirectUrl:
    process.env.NEXT_PUBLIC_BUILDBASE_REDIRECT_URL || 'http://localhost:3000',
};

function storeAuthToken(token: string) {
  console.log('Storing auth token:', token.substring(0, 20) + '...');
  document.cookie = `auth_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
  console.log('Cookie after set:', document.cookie);
}

function clearAuthToken() {
  document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

async function updateAuthToken(
  userId: string,
  workspaceId: string,
  userRole: string
) {
  console.log('updateAuthToken called:', { userId, workspaceId, userRole });
  try {
    const response = await fetch('/api/auth/workspace-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, workspaceId, userRole }),
    });
    const data = await response.json();
    console.log('workspace-token API response:', data);
    if (data.success && data.token) {
      storeAuthToken(data.token);
      return data.token;
    } else {
      console.error('API did not return success or token:', data);
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
                console.log('workspace:changed event received:', data);
                const eventData = data as unknown as {
                  workspace: { _id: string };
                  user: { _id: string; id?: string };
                  userRole?: string;
                };
                if (eventData.workspace && eventData.user) {
                  const userId = eventData.user.id || eventData.user._id;
                  console.log('Calling updateAuthToken with:', { userId, workspaceId: eventData.workspace._id, userRole: eventData.userRole });
                  await updateAuthToken(
                    userId,
                    eventData.workspace._id,
                    eventData.userRole || 'member'
                  );
                } else {
                  console.error('Missing workspace or user in event data:', eventData);
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
