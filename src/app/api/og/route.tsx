import { type NextRequest } from 'next/server';
import { locales, type Locale } from '@/i18n/config';
import { messages } from '@/i18n/messages';
import { siteConfig } from '@/config/site';
import { ogFontsFor, renderOgImage } from './fonts';

// Runs on the default Node.js runtime: the Cloudflare adapter (OpenNext)
// does not support `runtime = 'edge'` routes, and Vercel serves either.

// The brand's colours as values: an image has no CSS variables. Same as the
// tokens in globals.css (paper, ink, muted ink, Plug Orange, hairline).
const PAPER = '#FBFAF7';
const INK = '#15130F';
const MUTED = '#5E584F';
const ORANGE = '#FF5B1F';
const HAIRLINE = '#E5E0D6';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get('title') || siteConfig.name;
  const description = searchParams.get('description') || '';
  const locale = (searchParams.get('locale') || 'en') as Locale;

  const validLocale = locales.includes(locale) ? locale : 'en';
  const isRtl = validLocale === 'ar';
  const align = isRtl ? 'flex-end' : 'flex-start';
  const tagline =
    messages[validLocale]?.home.meta.tagline || messages.en.home.meta.tagline;
  const host = new URL(siteConfig.url || 'https://demo.buildbase.app').host;

  const fonts = await ogFontsFor(validLocale, new URL(request.url).origin);

  return renderOgImage(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: align,
        backgroundColor: PAPER,
        padding: '64px 80px',
        direction: isRtl ? 'rtl' : 'ltr',
        borderBottom: `12px solid ${ORANGE}`,
      }}
    >
      {/* Wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            background: ORANGE,
          }}
        />
        <span style={{ fontSize: '30px', fontWeight: 600, color: INK }}>
          {siteConfig.name}
        </span>
      </div>

      {/* Title and description */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: align,
          gap: '24px',
          maxWidth: '1000px',
        }}
      >
        <h1
          style={{
            fontSize: '68px',
            fontWeight: 700,
            color: INK,
            lineHeight: 1.04,
            letterSpacing: '-2px',
            margin: 0,
            textAlign: isRtl ? 'right' : 'left',
          }}
        >
          {title}
        </h1>
        {description && (
          <p
            style={{
              fontSize: '28px',
              color: MUTED,
              lineHeight: 1.4,
              margin: 0,
              textAlign: isRtl ? 'right' : 'left',
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Tagline and address */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: `2px solid ${HAIRLINE}`,
          paddingTop: '24px',
          fontSize: '24px',
          color: MUTED,
        }}
      >
        <span>{tagline}</span>
        <span style={{ color: INK }}>{host}</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
    // Hindi, Japanese, Chinese and Arabic need their own script's font;
    // the other locales keep next/og's default.
    fonts
  );
}
