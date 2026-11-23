'use client';

import { ApiVersion, type EventType, type EventData } from '@buildbase/sdk';
import React, { useEffect } from 'react';
import { env } from '@/env';
import { SaaSOSProvider, type SaaSOSProviderProps } from '@buildbase/sdk/react';
// The pure entry: the main one injects Stripe.js on import, on every page,
// which sets Stripe's third-party cookie before anyone opens a checkout.
import { loadStripe } from '@stripe/stripe-js/pure';
import { loadConnectAndInitialize } from '@stripe/connect-js/pure';
import { captureReferral } from '@buildbase/sdk/tracking';
import { useLocale } from 'next-intl';
import { Locale } from '@/i18n/config';
import { pushTrackingEvent } from '@/lib/tracking-bus';
import { DEFAULT_DOCUMENT_PERMISSIONS } from '@/lib/documents/roles';

type LoadStripeForSdk = NonNullable<SaaSOSProviderProps['loadStripe']>;

/**
 * Stripe.js for the SDK. Its own type spells `locale` as Stripe's union of
 * locale codes where the SDK's is a plain string; the SDK only ever passes
 * one of its eight locales, all of which Stripe accepts.
 */
const loadStripeForSdk: LoadStripeForSdk = (publishableKey) =>
  loadStripe(publishableKey) as unknown as ReturnType<LoadStripeForSdk>;

/**
 * Stripe Connect.js for the SDK's seller and affiliate-payout screens, which
 * mount Stripe's own onboarding inside the app. Same structural-type gap as
 * Stripe.js above.
 */
const loadConnectForSdk = loadConnectAndInitialize as unknown as NonNullable<
  SaaSOSProviderProps['loadConnectAndInitialize']
>;

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
 * Ask the server for a workspace-scoped app token. Only the workspace id is
 * sent — the server identifies the user from the httpOnly session cookie and
 * asks BuildBase for their real role (see src/lib/server-auth.ts).
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

// Plans, add-ons and credit packs open Stripe Checkout in a dialog on this
// page (the SDK's EmbeddedCheckoutDialog) instead of leaving for Stripe's.
// A module constant, so the provider's value stays the same across renders.
const UI: SaaSOSProviderProps['ui'] = {
  behavior: { checkoutMode: 'embedded' },
};

export function SaaSProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale() as Locale;
  // An affiliate's link (?ref=CODE): the SDK keeps a signed referral token
  // for this browser, and its checkouts send it so the sale is credited.
  // Nothing is kept once marketing consent is refused.
  useEffect(() => {
    void captureReferral({
      serverUrl: config.serverUrl,
      orgId: config.orgId,
    });
  }, []);
  return (
    <SaaSOSProvider
      serverUrl={config.serverUrl}
      version={ApiVersion.V1}
      orgId={config.orgId}
      locale={locale}
      // Stripe.js, which the SDK never imports itself: it lets the card
      // dialog (useInAppPayment), 3-D Secure on a held plan change and
      // embedded Checkout run inside the app.
      loadStripe={loadStripeForSdk}
      loadConnectAndInitialize={loadConnectForSdk}
      ui={UI}
      // Analytics and ad tags come from the console (Settings → Tracking)
      // and load only after consent. Every event the SDK fires goes through
      // `onEvent` into a small in-memory log the Tracking page renders.
      tracking={{
        enabled: true,
        consent: 'auto',
        autoPageview: true,
        events: { mode: 'auto' },
        debug: process.env.NODE_ENV !== 'production',
        onEvent: (event) => {
          pushTrackingEvent(event);
        },
      }}
      // Used only for keys the organization has not defined in the console;
      // once it has, its grants (custom roles included) decide.
      defaultPermissions={DEFAULT_DOCUMENT_PERMISSIONS}
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
                if (eventData.workspace?._id) {
                  await updateAuthToken(eventData.workspace._id);
                }
              }

              // Generate token when user is added to workspace
              if (eventType === 'workspace:user-added') {
                const eventData = data as unknown as {
                  workspace: { _id: string };
                };
                if (eventData.workspace?._id) {
                  await updateAuthToken(eventData.workspace._id);
                }
              }
            } catch (error) {
              console.error('Failed to handle event:', error);
            }
          },
          onWorkspaceChange: async ({ workspace }) => {
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
