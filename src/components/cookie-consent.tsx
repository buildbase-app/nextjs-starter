'use client';

import { useEffect, useRef } from 'react';
import { CookieBanner, openCookieBanner } from '@buildbase/sdk/react';
import { useTracking } from '@buildbase/sdk/tracking';

/**
 * One consent system for the whole app: the SDK's own `CookieBanner`.
 *
 * It asks once (Accept all, Reject all, or Choose between analytics and
 * marketing), in the visitor's locale, and keeps the answer in the
 * `bb_consent` cookie. `BuildBaseTracking` (mounted by `SaaSOSProvider`'s
 * `tracking` option) restores it on later pages and decides from it which
 * analytics and ad tags load, so nothing here stores consent itself.
 * `useTracking().consent` reads the same answer anywhere in the app.
 */

/** Reopen the banner on the visitor's current answer, e.g. from a settings page. */
export const openCookieChoices = openCookieBanner;

export function CookieConsent({
  privacyPolicyUrl = '/privacy',
}: {
  /** Path to the privacy policy page. Defaults to "/privacy". */
  privacyPolicyUrl?: string;
}) {
  const { consent } = useTracking();
  const granted = Boolean(consent.state?.analytics || consent.state?.marketing);

  // Tick the tour's consent task when the visitor grants something in the
  // banner (not when a stored answer is restored on load). A 401 for a
  // signed-out visitor is expected and ignored.
  const answered = useRef(false);
  useEffect(() => {
    if (!answered.current || !granted) return;
    answered.current = false;
    void fetch('/api/tracking/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ consent: true }),
    }).catch(() => {});
  }, [granted]);

  return (
    <div
      className="contents"
      onClickCapture={(e) => {
        if ((e.target as HTMLElement).closest('button')) {
          answered.current = true;
        }
      }}
    >
      <CookieBanner privacyHref={privacyPolicyUrl} />
    </div>
  );
}
