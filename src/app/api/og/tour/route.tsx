import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';
import { createTranslator } from 'next-intl';
import { locales, type Locale } from '@/i18n/config';
import { messages } from '@/i18n/messages';
import { siteConfig } from '@/config/site';
import { TASK_ORDER, decodeProgress, tourColumns } from '@/tour/share';

// Same values as the tokens in globals.css: an image has no CSS variables.
const PAPER = '#FBFAF7';
const INK = '#15130F';
const MUTED = '#5E584F';
const ORANGE = '#FF5B1F';
const DOT_EMPTY = '#CFC8BB';

const DOT = 14;
const GAP = 6;

/**
 * The share card for /tour/progress: the sharer's count and their map, one
 * column per group, one dot per task, filled where done. Everything comes
 * from the `d` code; no account is looked up.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const done = decodeProgress(searchParams.get('d'));
  const requested = (searchParams.get('locale') || 'en') as Locale;
  const locale = locales.includes(requested) ? requested : 'en';
  const isRtl = locale === 'ar';
  const t = createTranslator({
    locale,
    messages: messages[locale],
    namespace: 'home.tourMap',
  });
  const title = t('progress', { done: done.size, total: TASK_ORDER.length });

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: isRtl ? 'row-reverse' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: PAPER,
        padding: '64px 80px',
        borderBottom: `12px solid ${ORANGE}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: isRtl ? 'flex-end' : 'flex-start',
          height: '100%',
          maxWidth: '560px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '6px',
              background: ORANGE,
            }}
          />
          <span style={{ fontSize: '28px', fontWeight: 600, color: INK }}>
            {siteConfig.name}
          </span>
        </div>
        <div
          style={{
            fontSize: '64px',
            fontWeight: 700,
            color: INK,
            lineHeight: 1.05,
            letterSpacing: '-2px',
            textAlign: isRtl ? 'right' : 'left',
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: '24px', color: MUTED }}>
          {new URL(siteConfig.url || 'https://demo.buildbase.app').host}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: GAP }}>
        {tourColumns().map((column) => (
          <div
            key={column.id}
            style={{
              display: 'flex',
              flexDirection: 'column-reverse',
              gap: GAP,
            }}
          >
            {column.taskIds.map((id) => (
              <div
                key={id}
                style={{
                  width: DOT,
                  height: DOT,
                  borderRadius: DOT,
                  background: done.has(id) ? ORANGE : 'transparent',
                  border: `2px solid ${done.has(id) ? ORANGE : DOT_EMPTY}`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
