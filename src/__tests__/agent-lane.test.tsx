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

import { AgentLane } from '@/components/marketing/agent-lane';

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

function renderLane() {
  return render(
    <NextIntlClientProvider locale="en" messages={en}>
      <AgentLane />
    </NextIntlClientProvider>
  );
}

describe('AgentLane', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('charges the person and the agent the same: a credit and a quota unit each', () => {
    setReducedMotion(false);
    renderLane();
    fireEvent.click(screen.getByRole('button', { name: 'Run both' }));
    act(() => vi.advanceTimersByTime(700));
    expect(screen.getByRole('status')).toHaveTextContent(
      'In the app: draft created. 99 credits left, 1 documents this period.'
    );
    act(() => vi.advanceTimersByTime(700 * 2));
    expect(screen.getByRole('status')).toHaveTextContent(
      'Over MCP, as the same person: draft created. 98 credits left, 2 documents this period.'
    );
  });

  it('names the real tool and the service both lanes share', () => {
    setReducedMotion(true);
    const { container } = renderLane();
    expect(container.textContent).toContain('create_document');
    expect(container.textContent).toContain('src/lib/documents/service.ts');
    fireEvent.click(screen.getByRole('button', { name: 'Run both' }));
    // Reduced motion: the end state at once.
    expect(screen.getByRole('status')).toHaveTextContent('98 credits left');
  });
});
