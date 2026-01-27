import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';
import { locales, type Locale } from '@/i18n/config';
import { messages } from '@/i18n/messages';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Get parameters
  const title = searchParams.get('title') || 'My App';
  const description = searchParams.get('description') || '';
  const locale = (searchParams.get('locale') || 'en') as Locale;

  // Validate locale and get tagline from centralized translations
  const validLocale = locales.includes(locale) ? locale : 'en';
  const isRtl = validLocale === 'ar';
  const tagline =
    messages[validLocale]?.home.meta.tagline || messages.en.home.meta.tagline;

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isRtl ? 'flex-end' : 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#030712',
        backgroundImage:
          'radial-gradient(circle at 25% 25%, #1e3a5f 0%, transparent 50%), radial-gradient(circle at 75% 75%, #312e81 0%, transparent 50%)',
        padding: '60px 80px',
        direction: isRtl ? 'rtl' : 'ltr',
      }}
    >
      {/* Logo/Brand */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '40px',
        }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...(isRtl ? { marginLeft: '20px' } : { marginRight: '20px' }),
          }}
        >
          <span style={{ fontSize: '32px', color: 'white', fontWeight: 700 }}>
            M
          </span>
        </div>
        <span
          style={{
            fontSize: '28px',
            color: '#9ca3af',
            fontWeight: 500,
          }}
        >
          My App
        </span>
      </div>

      {/* Title */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '900px',
        }}
      >
        <h1
          style={{
            fontSize: '72px',
            fontWeight: 700,
            color: 'white',
            lineHeight: 1.1,
            margin: 0,
            textAlign: isRtl ? 'right' : 'left',
          }}
        >
          {title}
        </h1>

        {description && (
          <p
            style={{
              fontSize: '32px',
              color: '#9ca3af',
              lineHeight: 1.4,
              margin: 0,
              textAlign: isRtl ? 'right' : 'left',
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Tagline */}
      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          ...(isRtl ? { right: '80px' } : { left: '80px' }),
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#22c55e',
          }}
        />
        <span
          style={{
            fontSize: '24px',
            color: '#6b7280',
          }}
        >
          {tagline}
        </span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
