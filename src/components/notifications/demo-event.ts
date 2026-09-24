/**
 * The custom notification event this demo sends. It is registered on the
 * organization in the console (Notifications → Events) with email and push
 * enabled, so one `notification.send()` reaches every channel the person
 * has left on. The slug is the contract between the console and this app.
 */
export const DEMO_EVENT_SLUG = 'comment-added';

export const DEMO_EVENT_DEFAULTS = {
  title: 'Alice commented on your document',
  message: '"Can we try the darker hero?" - open it to reply, {{name}}.',
  url: '/dashboard/documents',
} as const;
