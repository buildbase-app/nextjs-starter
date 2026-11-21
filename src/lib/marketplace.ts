import { useSyncExternalStore } from 'react';

/** Where the shop keeps the order a signed-in buyer just started, for Orders. */
export const LAST_ORDER_KEY = 'marketplace:lastOrderId';

const noSubscribe = () => () => {};

function readLastOrderId(): string | null {
  try {
    return sessionStorage.getItem(LAST_ORDER_KEY);
  } catch {
    // Storage blocked: Orders falls back to the latest order.
    return null;
  }
}

/** The order the shop kept before Stripe's page; null on the server. */
export function useLastOrderId(): string | null {
  return useSyncExternalStore(noSubscribe, readLastOrderId, () => null);
}
