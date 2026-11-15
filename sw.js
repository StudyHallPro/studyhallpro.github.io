// Edusphere Lobby Chat service worker: receives push messages and shows them.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (e) {}

  const title = data.title || 'Edusphere Lobby Chat';
  const options = {
    body: data.body || 'New message in the lobby',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    tag: 'lobby-chat'
  };

  // iPhones/iPads require that EVERY push shows a notification, so never skip this.
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of all) {
      if (client.url.includes('chat.html') && 'focus' in client) return client.focus();
    }
    return self.clients.openWindow('chat.html');
  })());
});
