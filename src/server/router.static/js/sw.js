/**
 * Constants
 */

const cacheName = "v1";

const coreAssets = []; // Core assets required for the app to run offline.

/**
 * Event Listeners
 */

self.addEventListener("install", function handleInstall(event) {
  event.waitUntil(installer().catch(handleError));
});

self.addEventListener("activate", function handleActivate(event) {
  event.waitUntil(activator().catch(handleError));
});

self.addEventListener("fetch", function handleFetch(event) {
  event.respondWith(fetcher(event)); // Error is self-handled.
});

self.addEventListener("push", function handlePush(event) {
  event.waitUntil(pusher(event).catch(handleError));
});

self.addEventListener("notificationclick", function handleNotClick(event) {
  event.waitUntil(notificationclicker(event).catch(handleError));
});

/**
 * Helper Functions
 */

async function installer() {
  const cache = await caches.open(cacheName);
  if (coreAssets.length) {
    await cache.addAll(coreAssets);
    console.info(`👷🏾 Service worker cached core assets ("${cacheName}").`);
  }
  await self.skipWaiting();
  console.info('👷🏾 Service worker event complete ("install").');
}

async function activator() {
  const cacheKeys = await caches.keys();
  for (const cacheKey of cacheKeys) {
    if (cacheKey !== cacheName) {
      await caches.delete(cacheKey);
      console.info(`👷🏾 Service worker removed stale cache ("${cacheKey}").`);
    }
  }
  await self.clients.claim();
  console.info('👷🏾 Service worker event complete ("activate").');
}

async function fetcher(event) {
  try {
    if (new URL(event.request.url).pathname.startsWith("/api")) {
      // Do not cache api requests.
      console.info("👷🏾 Service worker handled fetch request with api.");
      return await fetch(event.request);
    } else {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        console.info("👷🏾 Service worker handled fetch request with cache.");
        return cachedResponse;
      }
      const networkResponse = await fetch(event.request);
      const cache = await caches.open(cacheName);
      await cache.put(event.request, networkResponse.clone());
      console.info("👷🏾 Service worker handled fetch request with network.");
      return networkResponse;
    }
  } catch (error) {
    handleError(error);
    return new Response("Network Error", {
      headers: { "Content-Type": "text/plain" },
      status: 503,
    });
  }
}

async function pusher(event) {
  // NOTE: Sending notifications from the server requires setting up a webpush flow with a VAPID key.
  if (self.Notification?.permission === "granted" && self.registration) {
    const options = {
      lang: "en",
      vibrate: [500],
      icon: "/static/img/favicon.ico",
      title: "New Notification",
    };
    try {
      Object.assign(options, event.data.json());
    } catch {
      options.body = event.data.text();
    }
    await self.registration.showNotification(options.title, options);
    console.info('👷🏾 Service worker event complete ("push").');
  }
}

async function notificationclicker(event) {
  event.notification.close();
  const origin = self.location.origin;
  const pathname = event.notification.data?.pathname;
  const url = event.notification.data?.url || origin + (pathname || "");
  const clientWindows = await self.clients.matchAll({ type: "window" });
  const clientWindowA = clientWindows.find((cw) => isURL(url, cw.url));
  const clientWindowB = clientWindows.find((cw) => cw.url.startsWith(origin));
  const clientWindow = clientWindowA || clientWindowB; // Prefer window that matches notification url.
  if (clientWindow && "focus" in clientWindow) {
    clientWindow.focus();
    if ("navigate" in clientWindow && !isURL(url, clientWindow.url)) {
      clientWindow.navigate(url);
    }
  } else if ("openWindow" in clients) {
    clients.openWindow(url);
  } else {
    console.warn("👷🏾 Service worker failed to find client window.");
  }
  console.info('👷🏾 Service worker event complete ("notificationclick").');
}

function isURL(urlA, urlB) {
  try {
    return Boolean(urlA && urlB) && new URL(urlA).href === new URL(urlB).href;
  } catch {
    return false;
  }
}

function handleError(error) {
  console.error(`👷🏾 Service worker ${error.toString().toLowerCase()}`);
}

// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
// https://gist.github.com/cferdinandi/6e4a73a69b0ee30c158c8dd37d314663#file-sw-boilerplate-js
// https://github.com/mdn/dom-examples/blob/main/service-worker/simple-service-worker/sw.js
// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/notificationclick_event
