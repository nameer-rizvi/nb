const isLocalhost =
  window.location.hostname === "localhost" ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === "[::1]" ||
  // 127.0.0.1/8 is considered localhost for IPv4.
  /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/.test(
    window.location.hostname,
  );
// https://stackoverflow.com/a/57949518

async function registerServiceWorker() {
  try {
    if (isLocalhost) {
      console.warn("👷🏾 Service worker not supported in local environment.");
    } else if (!window.isSecureContext) {
      console.warn("👷🏾 Service worker requires a secure browser context.");
    } else if (!("serviceWorker" in navigator)) {
      console.warn("👷🏾 Service worker is not available in navigator.");
    } else {
      const registration = await register();
      if (registration?.installing) {
        console.info("👷🏾 Service worker is installing.");
      } else if (registration?.waiting) {
        console.info("👷🏾 Service worker is installed, waiting to activate.");
      } else if (registration?.active) {
        console.info(`👷🏾 Service worker is ${registration.active.state}.`);
      } else {
        console.warn("👷🏾 Service worker registration failed.");
      }
    }
  } catch (error) {
    console.error("👷🏾 Service worker registration error:", error);
  }
}

function register() {
  return navigator.serviceWorker.register("/static/js/sw.js", { scope: "/" });
  // "Service-Worker-Allowed" header is set in middlewares/sw.js to allow global scope.
}

registerServiceWorker();

// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
// https://developer.chrome.com/docs/workbox/service-worker-overview
