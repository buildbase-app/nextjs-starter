# Security Policy

## Supported Versions

| Version | Supported |
| ------- | --------- |
| Latest  | ✅ Yes    |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

If you discover a security vulnerability in this template, please report it by emailing:

**support@buildbase.app**

Include as much of the following information as possible to help us understand and resolve the issue quickly:

- Type of issue (e.g. SQL injection, XSS, authentication bypass, etc.)
- Full path of the source file related to the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue and how an attacker might exploit it

## Response Timeline

- We will acknowledge your report within **48 hours**
- We aim to provide a detailed response within **7 days**
- We will notify you when a fix is released

## Security Best Practices for Template Users

When deploying this template, ensure you:

1. **Rotate all secrets** — Never use example values from `.env.example` in production
2. **Generate a strong `SYSTEM_SECRET`** — Use `openssl rand -base64 32` to generate a 32+ character secret
3. **Set `BUILDBASE_CLIENT_SECRET`** — Use the secret from your BuildBase dashboard
4. **Use HTTPS in production** — The HSTS header is configured; ensure your host serves over TLS
5. **Add rate limiting** — The template does not include rate limiting; add `@upstash/ratelimit` before deploying publicly
6. **Review CSP directives** — Tighten the Content Security Policy for your specific use case
7. **Protect the `/api/events` endpoint** — Consider adding IP allowlisting if your BuildBase webhooks come from known IPs
8. **Keep dependencies updated** — Run `npm audit` regularly and update vulnerable packages

## Scope

This security policy covers the template code itself. Third-party dependencies, the BuildBase platform, and user-customised deployments are out of scope for this policy.
