import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import en from '@/i18n/messages/en';

vi.mock('@/i18n/routing', () => ({
  Link: ({ children, ...props }: React.ComponentProps<'a'>) => (
    <a {...props}>{children}</a>
  ),
}));

// The real module validates environment variables at import.
vi.mock('@/config/site', () => ({
  sourceUrl: (path: string) => `https://example.test/${path}`,
}));

import { WebhookFlow } from '@/components/marketing/webhook-flow';

function setReducedMotion(reduce: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      matches: reduce && query.includes('reduce'),
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    }))
  );
}

function renderFlow() {
  return render(
    <NextIntlClientProvider locale="en" messages={en}>
      <WebhookFlow />
    </NextIntlClientProvider>
  );
}

describe('WebhookFlow', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('walks the four stages in order and announces each', () => {
    setReducedMotion(false);
    renderFlow();
    expect(
      screen.getByRole('button', { name: 'Send it again' })
    ).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'Play the upgrade' }));
    expect(screen.getByRole('status')).toHaveTextContent(
      'Step 1 of 4: A customer upgrades'
    );
    act(() => vi.advanceTimersByTime(700 * 3));
    expect(screen.getByRole('status')).toHaveTextContent(
      'Step 4 of 4: One row in Postgres'
    );
  });

  it('a second delivery lands on the same row', () => {
    setReducedMotion(false);
    const { container } = renderFlow();
    fireEvent.click(screen.getByRole('button', { name: 'Play the upgrade' }));
    act(() => vi.advanceTimersByTime(700 * 4));
    fireEvent.click(screen.getByRole('button', { name: 'Send it again' }));
    act(() => vi.advanceTimersByTime(700 * 3));
    expect(container.textContent).toContain('deliveries: 2 rows: 1');
    expect(screen.getByRole('status')).toHaveTextContent(
      'Delivered again: same row, no duplicate.'
    );
  });

  it('with reduced motion, every stage is on at once', () => {
    setReducedMotion(true);
    renderFlow();
    fireEvent.click(screen.getByRole('button', { name: 'Play the upgrade' }));
    expect(screen.getByRole('status')).toHaveTextContent(
      'Step 4 of 4: One row in Postgres'
    );
  });
});
