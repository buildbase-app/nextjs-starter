import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { expect, test as setup } from '@playwright/test';
import { SIGNED_IN_STATE } from './state';

/**
 * Signs the test user in without a browser sign-in: the org API token is
 * exchanged for a session (`POST /api/v1/public/token/exchange`, the token in
 * the body), and the session goes in the same httpOnly cookie the app's own
 * sign-in sets. The app's `getSession` callback reads it back through
 * `/api/auth/session`, exactly as after a real sign-in.
 *
 * BUILDBASE_E2E_API_TOKEN is the org API token. BUILDBASE_E2E_USER_ID names
 * the test user; only an owner or admin token may name one, and without it
 * the session is the token's own user.
 */
setup('exchange the API token for a session', async ({ request, baseURL }) => {
  const token = process.env.BUILDBASE_E2E_API_TOKEN;
  if (!token) throw new Error('BUILDBASE_E2E_API_TOKEN is not set');
  if (!baseURL) throw new Error('baseURL is not set');

  const server =
    process.env.NEXT_PUBLIC_BUILDBASE_SERVER_URL ??
    'https://api.console.buildbase.app';
  const expiresIn = 60 * 60;

  const res = await request.post(`${server}/api/v1/public/token/exchange`, {
    data: {
      token,
      ...(process.env.BUILDBASE_E2E_USER_ID
        ? { userId: process.env.BUILDBASE_E2E_USER_ID }
        : {}),
      expiresIn,
      reason: 'CI end-to-end tests',
    },
  });
  // The refusal body names the problem and carries no session.
  expect(res.ok(), `token exchange: ${res.status()} ${await res.text()}`).toBe(
    true
  );
  const { sessionId } = (await res.json()) as { sessionId?: string };
  expect(sessionId, 'token exchange answered no sessionId').toBeTruthy();

  const url = new URL(baseURL);
  mkdirSync(dirname(SIGNED_IN_STATE), { recursive: true });
  writeFileSync(
    SIGNED_IN_STATE,
    JSON.stringify({
      cookies: [
        {
          name: 'bb-session-id',
          value: sessionId,
          domain: url.hostname,
          path: '/',
          expires: Math.floor(Date.now() / 1000) + expiresIn,
          httpOnly: true,
          secure: url.protocol === 'https:',
          sameSite: 'Lax',
        },
      ],
      origins: [],
    })
  );
});
