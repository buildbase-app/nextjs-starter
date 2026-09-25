'use client';

import type { TrackingEvent } from '@buildbase/sdk/tracking';

/**
 * The tracking events the SDK fired in this tab, kept in memory so the
 * Tracking page can show a live log. The provider's `onEvent` pushes here;
 * nothing is persisted and nothing leaves the browser through this file.
 */
export interface LoggedTrackingEvent extends TrackingEvent {
  at: number;
}

const MAX = 50;
const events: LoggedTrackingEvent[] = [];
const listeners = new Set<() => void>();

export function pushTrackingEvent(event: TrackingEvent) {
  events.unshift({ ...event, at: Date.now() });
  if (events.length > MAX) events.length = MAX;
  for (const l of listeners) l();
}

export function getTrackingEvents(): LoggedTrackingEvent[] {
  return events;
}

export function subscribeTrackingEvents(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
