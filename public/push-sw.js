// BuildBase Push Notification Service Worker
// Place this file in your app's public directory (e.g. public/push-sw.js)

self.addEventListener('push', function (event) {
  if (!event.data) return;
  try {
    var payload = event.data.json();
    var options = {
      body: payload.body || '',
      icon: payload.icon || undefined,
      badge: payload.badge || payload.icon || undefined,
      image: payload.image || undefined,
      tag: payload.tag || undefined,
      actions: payload.actions || undefined,
      silent: payload.silent || false,
      requireInteraction: payload.requireInteraction || false,
      renotify: payload.renotify || false,
      timestamp: payload.timestamp || undefined,
      dir: payload.dir || 'auto',
      data: { url: payload.url, ...(payload.data || {}) },
    };
    event.waitUntil(
      self.registration.showNotification(
        payload.title || 'Notification',
        options
      )
    );
  } catch (e) {
    console.error('[PushSW]', e);
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  var url = event.notification.data && event.notification.data.url;
  if (url) {
    event.waitUntil(
      clients
        .matchAll({ type: 'window', includeUncontrolled: true })
        .then(function (list) {
          for (var i = 0; i < list.length; i++) {
            if (list[i].url === url && 'focus' in list[i])
              return list[i].focus();
          }
          if (clients.openWindow) return clients.openWindow(url);
        })
    );
  }
});
