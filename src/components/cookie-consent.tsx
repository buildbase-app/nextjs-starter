'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ---------------------------------------------------------------------------
// Types & constants
// ---------------------------------------------------------------------------

/**
 * Cookie consent categories. Each can be individually toggled.
 * "necessary" is always on and cannot be disabled.
 */
export interface CookiePreferences {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

interface StoredConsent {
  preferences: CookiePreferences;
  /** ISO timestamp when consent was given. */
  consentedAt: string;
  /** ISO timestamp when consent expires and banner should re-appear. */
  expiresAt: string;
}

const COOKIE_CONSENT_KEY = 'cookie-consent';
/** GDPR recommends re-asking every 6-12 months. We use 6 months. */
const CONSENT_EXPIRY_DAYS = 180;

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

// ---------------------------------------------------------------------------
// Storage helpers
// ---------------------------------------------------------------------------

function getStoredConsent(): StoredConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored) as StoredConsent;

    // Check expiry
    if (parsed.expiresAt && new Date(parsed.expiresAt) < new Date()) {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function storeConsent(prefs: CookiePreferences) {
  const now = new Date();
  const expiry = new Date(now);
  expiry.setDate(expiry.getDate() + CONSENT_EXPIRY_DAYS);

  const record: StoredConsent = {
    preferences: prefs,
    consentedAt: now.toISOString(),
    expiresAt: expiry.toISOString(),
  };

  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(record));

  // Dispatch event so scripts can react immediately
  window.dispatchEvent(
    new CustomEvent('cookie-consent-update', { detail: prefs })
  );
}

// ---------------------------------------------------------------------------
// Public API — use these anywhere in client code
// ---------------------------------------------------------------------------

/**
 * Read current cookie consent preferences.
 * Returns null if user hasn't consented or consent has expired.
 * Safe to call on server (returns null).
 */
export function getCookieConsent(): CookiePreferences | null {
  const stored = getStoredConsent();
  return stored?.preferences ?? null;
}

/**
 * Check if a specific consent category is granted.
 * Returns false if no consent stored, expired, or category is denied.
 * "necessary" always returns true.
 */
export function hasConsent(category: keyof CookiePreferences): boolean {
  if (category === 'necessary') return true;
  const consent = getCookieConsent();
  if (!consent) return false;
  return consent[category];
}

// ---------------------------------------------------------------------------
// React hook — reactive, re-renders on consent changes
// ---------------------------------------------------------------------------

/**
 * React hook that returns current cookie consent preferences.
 * Re-renders the component whenever the user updates their consent.
 *
 * @example
 * function AnalyticsWrapper() {
 *   const consent = useCookieConsent();
 *
 *   if (!consent?.analytics) return null;
 *   return <MyAnalyticsComponent />;
 * }
 *
 * @example
 * function SomeFeature() {
 *   const consent = useCookieConsent();
 *   const canTrack = consent?.analytics ?? false;
 *
 *   const handleClick = () => {
 *     if (canTrack) trackEvent('button_click');
 *   };
 *   return <button onClick={handleClick}>Click me</button>;
 * }
 */
export function useCookieConsent(): CookiePreferences | null {
  return useSyncExternalStore(
    // subscribe — listen for consent changes
    (callback) => {
      window.addEventListener('cookie-consent-update', callback);
      return () => {
        window.removeEventListener('cookie-consent-update', callback);
      };
    },
    // getSnapshot — read current value
    getCookieConsent,
    // getServerSnapshot — SSR always returns null
    () => null
  );
}

/**
 * Programmatically update consent (e.g., from a settings page).
 * Stores preferences, updates expiry, and dispatches update event.
 */
export function updateCookieConsent(prefs: CookiePreferences) {
  storeConsent(prefs);
}

/**
 * Reset consent — removes stored preferences so the banner re-appears.
 */
export function resetCookieConsent() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(COOKIE_CONSENT_KEY);
  window.dispatchEvent(
    new CustomEvent('cookie-consent-update', { detail: DEFAULT_PREFERENCES })
  );
}

// ---------------------------------------------------------------------------
// Consent-aware script loader
// ---------------------------------------------------------------------------

interface ConsentScriptProps {
  /** Consent category required to load this script. */
  category: 'analytics' | 'marketing';
  /** Script src URL. */
  src: string;
  /** Optional: load async (default true). */
  async?: boolean;
  /** Optional: additional attributes. */
  attrs?: Record<string, string>;
}

/**
 * Loads a `<script>` tag ONLY if the user has consented to the given category.
 * Listens for consent changes and loads/removes scripts dynamically.
 *
 * @example
 * // Google Analytics — only loads if analytics consent is granted
 * <ConsentScript
 *   category="analytics"
 *   src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
 * />
 *
 * // Facebook Pixel — only loads if marketing consent is granted
 * <ConsentScript
 *   category="marketing"
 *   src="https://connect.facebook.net/en_US/fbevents.js"
 * />
 */
export function ConsentScript({
  category,
  src,
  async: isAsync = true,
  attrs,
}: ConsentScriptProps) {
  useEffect(() => {
    const scriptId = `consent-script-${category}-${btoa(src).slice(0, 16)}`;

    function loadScript() {
      if (document.getElementById(scriptId)) return;
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = src;
      if (isAsync) script.async = true;
      if (attrs) {
        for (const [key, value] of Object.entries(attrs)) {
          script.setAttribute(key, value);
        }
      }
      document.head.appendChild(script);
    }

    function removeScript() {
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    }

    // Check initial consent
    if (hasConsent(category)) {
      loadScript();
    }

    // Listen for consent changes
    function handleConsentUpdate(e: Event) {
      const prefs = (e as CustomEvent<CookiePreferences>).detail;
      if (prefs[category]) {
        loadScript();
      } else {
        removeScript();
      }
    }

    window.addEventListener('cookie-consent-update', handleConsentUpdate);
    return () => {
      window.removeEventListener('cookie-consent-update', handleConsentUpdate);
    };
  }, [category, src, isAsync, attrs]);

  return null;
}

// ---------------------------------------------------------------------------
// Inline consent-aware script (for init snippets like gtag config)
// ---------------------------------------------------------------------------

interface ConsentInlineScriptProps {
  /** Consent category required. */
  category: 'analytics' | 'marketing';
  /** Inline JavaScript to execute. */
  code: string;
}

/**
 * Executes inline JavaScript ONLY if the user has consented.
 *
 * @example
 * <ConsentInlineScript
 *   category="analytics"
 *   code={`
 *     window.dataLayer = window.dataLayer || [];
 *     function gtag(){dataLayer.push(arguments);}
 *     gtag('js', new Date());
 *     gtag('config', 'G-XXXXXXX');
 *   `}
 * />
 */
export function ConsentInlineScript({
  category,
  code,
}: ConsentInlineScriptProps) {
  useEffect(() => {
    let executed = false;

    function execute() {
      if (executed) return;
      executed = true;
      try {
        new Function(code)();
      } catch (err) {
        console.error(
          `[cookie-consent] Failed to execute ${category} script:`,
          err
        );
      }
    }

    if (hasConsent(category)) {
      execute();
    }

    function handleConsentUpdate(e: Event) {
      const prefs = (e as CustomEvent<CookiePreferences>).detail;
      if (prefs[category]) execute();
    }

    window.addEventListener('cookie-consent-update', handleConsentUpdate);
    return () => {
      window.removeEventListener('cookie-consent-update', handleConsentUpdate);
    };
  }, [category, code]);

  return null;
}

// ---------------------------------------------------------------------------
// Banner component
// ---------------------------------------------------------------------------

interface CookieConsentProps {
  /** Path to privacy policy page. Defaults to "/privacy". */
  privacyPolicyUrl?: string;
  /** Path to cookie policy page. Overrides privacyPolicyUrl link text. */
  cookiePolicyUrl?: string;
}

export function CookieConsent({
  privacyPolicyUrl = '/privacy',
  cookiePolicyUrl,
}: CookieConsentProps) {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    storeConsent(allAccepted);
    setVisible(false);
  }, []);

  const handleRejectAll = useCallback(() => {
    storeConsent(DEFAULT_PREFERENCES);
    setVisible(false);
  }, []);

  const handleSavePreferences = useCallback(() => {
    storeConsent(prefs);
    setVisible(false);
  }, [prefs]);

  if (!visible) return null;

  const policyLink = cookiePolicyUrl ?? privacyPolicyUrl;
  const policyLabel = cookiePolicyUrl ? 'cookie policy' : 'privacy policy';

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
      <div className="bg-background border-border mx-auto max-w-2xl rounded-xl border p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-foreground text-base font-semibold">
              We use cookies
            </h2>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
              We use cookies to improve your experience, analyze traffic, and
              personalize content. You can choose which cookies to allow. Read
              our{' '}
              <a
                href={policyLink}
                className="text-primary underline underline-offset-4 hover:no-underline"
              >
                {policyLabel}
              </a>
              .
            </p>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-muted-foreground hover:text-foreground shrink-0 rounded-md p-1 transition-colors"
            aria-label="Dismiss for now"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Category toggles (expandable) */}
        {showDetails ? (
          <div className="border-border mt-4 space-y-3 border-t pt-4">
            <label className="flex items-center justify-between">
              <div>
                <span className="text-foreground text-sm font-medium">
                  Necessary
                </span>
                <p className="text-muted-foreground text-xs">
                  Required for the site to function. Cannot be disabled.
                </p>
              </div>
              <input
                type="checkbox"
                checked
                disabled
                className="size-4 rounded"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between">
              <div>
                <span className="text-foreground text-sm font-medium">
                  Analytics
                </span>
                <p className="text-muted-foreground text-xs">
                  Help us understand how visitors use our site.
                </p>
              </div>
              <input
                type="checkbox"
                checked={prefs.analytics}
                onChange={(e) =>
                  setPrefs((p) => ({ ...p, analytics: e.target.checked }))
                }
                className="size-4 rounded"
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between">
              <div>
                <span className="text-foreground text-sm font-medium">
                  Marketing
                </span>
                <p className="text-muted-foreground text-xs">
                  Used to deliver relevant ads and track campaigns.
                </p>
              </div>
              <input
                type="checkbox"
                checked={prefs.marketing}
                onChange={(e) =>
                  setPrefs((p) => ({ ...p, marketing: e.target.checked }))
                }
                className="size-4 rounded"
              />
            </label>
          </div>
        ) : null}

        {/* Actions */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button onClick={handleAcceptAll} size="sm">
            Accept all
          </Button>
          <Button onClick={handleRejectAll} variant="outline" size="sm">
            Reject all
          </Button>
          {showDetails ? (
            <Button onClick={handleSavePreferences} variant="outline" size="sm">
              Save preferences
            </Button>
          ) : (
            <button
              onClick={() => setShowDetails(true)}
              className="text-muted-foreground hover:text-foreground text-sm underline underline-offset-4 transition-colors"
            >
              Customize
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
