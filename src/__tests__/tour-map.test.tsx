import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import en from '@/i18n/messages/en';

const auth = vi.hoisted(() => ({ isAuthenticated: false }));
vi.mock('@buildbase/sdk/react', () => ({
  useSaaSAuth: () => auth,
}));

import { TourMap } from '@/components/marketing/tour-map';

const COLUMNS = [
  { id: 'start', title: 'Get started', taskIds: ['a', 'b'] },
  { id: 'billing', title: 'Billing', taskIds: ['c'] },
];

function renderMap() {
  return render(
    <NextIntlClientProvider locale="en" messages={en}>
      <TourMap columns={COLUMNS} total={3} />
    </NextIntlClientProvider>
  );
}

describe('TourMap', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('draws one dot per task and never asks for progress when signed out', () => {
    auth.isAuthenticated = false;
    const { container } = renderMap();
    expect(container.querySelectorAll('circle')).toHaveLength(3);
    expect(container.querySelectorAll('circle.fill-brand')).toHaveLength(0);
    // A signed-out request would 401 and log a console error.
    expect(fetchMock).not.toHaveBeenCalled();
    expect(
      screen.getByText('Sign in and they fill in as you finish them.')
    ).toBeTruthy();
  });

  it('fills in the finished tasks and says how many when signed in', async () => {
    auth.isAuthenticated = true;
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        progress: [{ taskId: 'a' }, { taskId: 'c' }, { taskId: 'gone' }],
      }),
    });
    const { container } = renderMap();
    await waitFor(() =>
      expect(container.querySelectorAll('circle.fill-brand')).toHaveLength(2)
    );
    expect(fetchMock).toHaveBeenCalledWith('/api/tour', expect.anything());
    // A task id the catalog no longer has does not count.
    expect(screen.getByText('2 of 3 tasks done')).toBeTruthy();
  });
});
