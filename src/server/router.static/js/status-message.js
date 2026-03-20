const statusElement = document.getElementById("status");

if (!statusElement) {
  console.warn("🔴 Status element is undefined.");
} else {
  const statusText = {
    pending: "⏳ Checking services...",
    online: "🟢 All services are online.",
    maintenance: "🟡 Services are undergoing maintenance.",
    unavailable: "🔴 Services are unavailable.",
  };

  statusElement.textContent = statusText.pending;

  fetch("/status").then((r) => {
    setTimeout(() => {
      if (r.status === 200) {
        statusElement.textContent = statusText.online;
      } else if (r.status === 503) {
        statusElement.textContent = statusText.maintenance;
      } else {
        statusElement.textContent = statusText.unavailable;
      }
    }, 500);
  });
}
