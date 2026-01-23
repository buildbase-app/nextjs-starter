"use client";

import { SaaSOSProvider, ApiVersion } from "@buildbase/sdk";
import React from "react";

const config = {
  serverUrl: process.env.NEXT_PUBLIC_BUILDBASE_SERVER_URL || "https://api.buildbase.app",
  orgId: process.env.NEXT_PUBLIC_BUILDBASE_ORG_ID || "",
  clientId: process.env.NEXT_PUBLIC_BUILDBASE_CLIENT_ID || "",
  redirectUrl: process.env.NEXT_PUBLIC_BUILDBASE_REDIRECT_URL || "http://localhost:3000",
};

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
            const response = await fetch("/api/auth/token", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ code }),
            });
            const data = await response.json();
            return { sessionId: data.sessionId };
          },
          onSignOut: async () => {
            localStorage.removeItem("session_token");
          },
          handleEvent: async (eventType, data) => {
            console.log("BuildBase Event:", eventType, data);
          },
        },
      }}
    >
      {children}
    </SaaSOSProvider>
  );
}
