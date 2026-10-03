/**
 * The notification events the tour talks about, member-managed so each
 * person can choose their own channels on the Notifications page. A
 * workspace admin can still make one required for their workspace (the SDK's
 * Notifications settings screen); this seed only creates the types.
 */
const EVENTS = [
  {
    slug: 'comment-added',
    name: 'Comment added',
    description: 'Someone commented on a document you follow.',
  },
  {
    slug: 'weekly-report',
    name: 'Weekly report',
    description: 'A summary of the workspace, every Monday.',
  },
];

export async function seed(api) {
  const existing = await api.list('workspaces/notification-events', {
    pagination: false,
  });
  for (const event of EVENTS) {
    const found = existing.find((e) => e.slug === event.slug);
    if (!found) {
      const created = await api.post('workspaces/notification-events', {
        ...event,
        userManaged: true,
        channels: { email: true, push: true },
      });
      console.log('event', event.slug, created?._id ?? '');
    } else if (!found.userManaged) {
      await api.patch(`workspaces/notification-events/${found._id}`, {
        userManaged: true,
      });
      console.log('event', event.slug, found._id, '(now member-managed)');
    } else {
      console.log('event', event.slug, found._id, '(exists)');
    }
  }
}
