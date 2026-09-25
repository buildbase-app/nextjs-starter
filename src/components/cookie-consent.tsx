'use client';

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useSyncExternalStore,
} from 'react';
import { useTranslations } from 'next-intl';
import { useTracking } from '@buildbase/sdk/tracking';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * One consent system for the whole app.
 *
 * The SDK's tracking consent (`useTracking().consent`) is what decides which
 * analytics and ad tags load, so every choice made here goes through
 * `consent.set()`. The SDK keeps that state in memory only, so this module
 * also keeps the one persisted record (localStorage `cookie-consent`) and
 * replays it into the SDK on every load. Its categories are the SDK's:
 * `analytics` and `marketing`, plus `necessary`, which is always on.
 */

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

const OPEN_EVENT = 'cookie-consent-open';

/** Reopen the banner with the current choices, e.g. from a settings page. */
export function openCookieChoices() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
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
  const t = useTranslations('cookieConsent');
  const { consent } = useTracking();
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>(DEFAULT_PREFERENCES);

  // `consent.set` may change identity between renders; read it through a
  // ref so replaying the stored choice does not loop.
  const setSdkConsent = useRef(consent.set);
  useEffect(() => {
    setSdkConsent.current = consent.set;
  }, [consent.set]);
  const sdkState = consent.state;

  // Replay the persisted choice into the SDK: on load, and whenever another
  // tab or `updateCookieConsent` changes it.
  useEffect(() => {
    const sync = () => {
      const stored = getStoredConsent();
      if (!stored) return;
      const { analytics, marketing } = stored.preferences;
      if (
        sdkState?.analytics === analytics &&
        sdkState?.marketing === marketing
      )
        return;
      setSdkConsent.current({ analytics, marketing });
    };
    sync();
    window.addEventListener('cookie-consent-update', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('cookie-consent-update', sync);
      window.removeEventListener('storage', sync);
    };
  }, [sdkState]);

  // Ask once; reopen on request with the current choices ticked.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (!getStoredConsent()) timer = setTimeout(() => setVisible(true), 500);
    const open = () => {
      setPrefs(getStoredConsent()?.preferences ?? DEFAULT_PREFERENCES);
      setShowDetails(true);
      setVisible(true);
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener(OPEN_EVENT, open);
    };
  }, []);

  const choose = useCallback((next: CookiePreferences) => {
    storeConsent(next);
    setSdkConsent.current({
      analytics: next.analytics,
      marketing: next.marketing,
    });
    setVisible(false);
    if (next.analytics || next.marketing) {
      // Ticks the tour's consent task for a signed-in visitor; a 401 for
      // everyone else is expected and ignored.
      void fetch('/api/tracking/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consent: true }),
      }).catch(() => {});
    }
  }, []);

  const handleAcceptAll = useCallback(
    () => choose({ necessary: true, analytics: true, marketing: true }),
    [choose]
  );
  const handleRejectAll = useCallback(
    () => choose(DEFAULT_PREFERENCES),
    [choose]
  );
  const handleSavePreferences = useCallback(
    () => choose(prefs),
    [choose, prefs]
  );

  // The installed tags behind each category, named so the choice is informed.
  const vendors = (category: 'analytics' | 'marketing') =>
    consent.manifest
      .filter((entry) => entry.category === category)
      .map((entry) => entry.name)
      .join(', ');

  if (!visible) return null;

  const policyLink = cookiePolicyUrl ?? privacyPolicyUrl;
  const policyLabel = cookiePolicyUrl
    ? t('policyLinkCookie')
    : t('policyLinkPrivacy');

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
      <div className="bg-background border-border mx-auto max-w-2xl rounded-xl border p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-foreground text-base font-semibold">
              {t('title')}
            </h2>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
              {t('descriptionBefore')}{' '}
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
            aria-label={t('dismissAriaLabel')}
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
                  {t('necessary.title')}
                </span>
                <p className="text-muted-foreground text-xs">
                  {t('necessary.description')}
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
                  {t('analytics.title')}
                </span>
                <p className="text-muted-foreground text-xs">
                  {t('analytics.description')}
                </p>
                {vendors('analytics') && (
                  <p className="text-muted-foreground text-xs">
                    {t('loads', { names: vendors('analytics') })}
                  </p>
                )}
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
                  {t('marketing.title')}
                </span>
                <p className="text-muted-foreground text-xs">
                  {t('marketing.description')}
                </p>
                {vendors('marketing') && (
                  <p className="text-muted-foreground text-xs">
                    {t('loads', { names: vendors('marketing') })}
                  </p>
                )}
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
            {t('acceptAll')}
          </Button>
          <Button onClick={handleRejectAll} variant="outline" size="sm">
            {t('rejectAll')}
          </Button>
          {showDetails ? (
            <Button onClick={handleSavePreferences} variant="outline" size="sm">
              {t('savePreferences')}
            </Button>
          ) : (
            <button
              onClick={() => setShowDetails(true)}
              className="text-muted-foreground hover:text-foreground text-sm underline underline-offset-4 transition-colors"
            >
              {t('customize')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
