/**
 * Constants
 */

const cacheName = "v1";

const coreAssets = ["/static/css/tw.css", "/static/js/sw-register.js"]; // Core assets pre-cached on install.

const maxCacheEntries = 100; // Maximum non-core entries before LRU eviction kicks in.

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

self.addEventListener("message", function handleMessage(event) {
  // Client can send { type: "SKIP_WAITING" } to immediately activate a waiting SW.
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
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
    const url = new URL(event.request.url);
    if (url.pathname.startsWith("/api")) {
      // Network-only: never cache API responses.
      console.info("👷🏾 Service worker handled fetch request with api.");
      return await fetch(event.request);
    }
    if (url.pathname.startsWith("/static")) {
      // Cache-first: static assets are content-addressed; serve from cache immediately.
      return await cacheFirst(event.request);
    }
    // Network-first: always try the network for HTML pages so deploys land immediately.
    return await networkFirst(event.request);
  } catch (error) {
    handleError(error);
    return offlineFallback(event.request);
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    console.info("👷🏾 Service worker handled fetch request with cache.");
    return cached;
  }
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(cacheName);
    await cache.put(request, response.clone());
    await evict(cache);
  }
  console.info("👷🏾 Service worker handled fetch request with network.");
  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      await cache.put(request, response.clone());
      await evict(cache);
    }
    console.info("👷🏾 Service worker handled fetch request with network.");
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) {
      console.info("👷🏾 Service worker handled fetch request with cache.");
      return cached;
    }
    throw new Error("No network and no cache available.");
  }
}

async function evict(cache) {
  // Remove the oldest entries once the cache exceeds maxCacheEntries.
  const keys = await cache.keys();
  if (keys.length > maxCacheEntries) {
    const stale = keys.slice(0, keys.length - maxCacheEntries);
    for (const key of stale) {
      await cache.delete(key);
      console.info(`👷🏾 Service worker evicted cache entry ("${key.url}").`);
    }
  }
}

function offlineFallback(request) {
  const isHtml =
    request.mode === "navigate" ||
    request.headers.get("Accept")?.includes("text/html");
  if (isHtml) {
    return new Response(
      "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Offline</title></head><body><p>You appear to be offline. Please check your connection and try again.</p></body></html>",
      { headers: { "Content-Type": "text/html" }, status: 503 },
    );
  }
  return new Response("Network Error", {
    headers: { "Content-Type": "text/plain" },
    status: 503,
  });
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
  console.error("👷🏾 Service worker error:", error);
}

// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
// https://gist.github.com/cferdinandi/6e4a73a69b0ee30c158c8dd37d314663#file-sw-boilerplate-js
// https://github.com/mdn/dom-examples/blob/main/service-worker/simple-service-worker/sw.js
// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/notificationclick_event
