import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import en from '@/i18n/messages/en';

const auth = vi.hoisted(() => ({ isAuthenticated: false }));
vi.mock('@buildbase/sdk/react', () => ({
  useSaaSAuth: () => auth,
}));

import { TourMap } from '@/components/marketing/tour-map';
import { decodeProgressCode } from '@/tour/share-code';

const COLUMNS = [
  { id: 'start', title: 'Get started', taskIds: ['a', 'b'] },
  { id: 'billing', title: 'Billing', taskIds: ['c'] },
];

function renderMap() {
  return render(
    <NextIntlClientProvider locale="en" messages={en}>
      <TourMap columns={COLUMNS} total={3} order={['a', 'b', 'c']} />
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

  it('shares a link that decodes to the same finished tasks', async () => {
    auth.isAuthenticated = true;
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ progress: [{ taskId: 'b' }] }),
    });
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', {
      ...navigator,
      share: undefined,
      clipboard: { writeText },
    });
    renderMap();
    fireEvent.click(
      await screen.findByRole('button', { name: 'Share your progress' })
    );
    await waitFor(() => expect(writeText).toHaveBeenCalled());
    const url = new URL(writeText.mock.calls[0][0]);
    expect(url.pathname).toBe('/tour/progress');
    expect([
      ...decodeProgressCode(url.searchParams.get('d'), ['a', 'b', 'c']),
    ]).toEqual(['b']);
    expect(
      await screen.findByRole('button', { name: 'Link copied' })
    ).toBeTruthy();
  });

  it('draws a shared snapshot without fetching or offering to share it', () => {
    auth.isAuthenticated = true;
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={en}>
        <TourMap
          columns={COLUMNS}
          total={3}
          order={['a', 'b', 'c']}
          shared={['a']}
        />
      </NextIntlClientProvider>
    );
    expect(container.querySelectorAll('circle.fill-brand')).toHaveLength(1);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(
      screen.queryByRole('button', { name: 'Share your progress' })
    ).toBeNull();
    expect(screen.getByText('1 of 3 tasks done')).toBeTruthy();
  });
});
