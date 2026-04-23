import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

/**
 * Canonical host for the production site. Set via CANONICAL_HOST env var.
 * When set, requests to `www.{host}` are 301-redirected to the apex
 * domain so search engines consolidate around a single canonical URL.
 */
const CANONICAL_HOST = process.env.CANONICAL_HOST;

function addSecurityHeaders(response: NextResponse): NextResponse {
  const cspDirectives = [
    "default-src 'self'",
    // 'unsafe-eval' required for Contentlayer MDX runtime
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
  ];

  response.headers.set('Content-Security-Policy', cspDirectives.join('; '));
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  return response;
}

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // --- Canonical host redirect (www → apex) ---
  if (CANONICAL_HOST) {
    const host = request.headers.get('host') ?? '';
    if (host === `www.${CANONICAL_HOST}`) {
      const url = request.nextUrl.clone();
      url.host = CANONICAL_HOST;
      return NextResponse.redirect(url, 301);
    }
  }

  // --- Markdown content negotiation ---
  // When an agent requests Accept: text/markdown on a content page,
  // rewrite to the /api/content/ endpoint which returns raw markdown.
  const accept = request.headers.get('accept') ?? '';
  if (accept.includes('text/markdown')) {
    const blogMatch = pathname.match(/^(?:\/[a-z]{2})?\/blog\/([^/]+)$/);
    const changelogMatch = pathname.match(
      /^(?:\/[a-z]{2})?\/changelog\/([^/]+)$/
    );
    if (blogMatch) {
      const url = request.nextUrl.clone();
      url.pathname = `/api/content/blog/${blogMatch[1]}`;
      return NextResponse.rewrite(url);
    }
    if (changelogMatch) {
      const url = request.nextUrl.clone();
      url.pathname = `/api/content/changelog/${changelogMatch[1]}`;
      return NextResponse.rewrite(url);
    }
  }

  // --- X-Robots-Tag for API routes ---
  // Belt-and-braces: robots.txt already disallows /api/, but this
  // header prevents accidental indexing if a crawler ignores robots.txt.
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  // --- Propagate request-id for observability ---
  const requestId = request.headers.get('x-request-id') ?? crypto.randomUUID();

  // Run intl middleware first
  const response = intlMiddleware(request);

  // Set request-id header
  response.headers.set('x-request-id', requestId);

  // --- Link headers for agent/resource discovery ---
  const origin = request.nextUrl.origin;
  response.headers.append(
    'Link',
    [
      `<${origin}/llms.txt>; rel="describedby"; type="text/plain"`,
      `<${origin}/sitemap.xml>; rel="sitemap"; type="application/xml"`,
      `<${origin}/blog/feed.xml>; rel="alternate"; type="application/rss+xml"; title="Blog"`,
    ].join(', ')
  );

  // Add security headers to the response
  return addSecurityHeaders(response);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sitemap.xml and robots.txt (SEO files)
     * - public folder assets
     */
    '/((?!_next/static|_next/image|favicon.ico|push-sw\\.js|sitemap\\.xml|sitemap-\\d+\\.xml|robots\\.txt|llms\\.txt|llms-full\\.txt|openapi\\.json|\\.well-known/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
