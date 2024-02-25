const statusText = {
  pending: "⏳ Checking services...",
  online: "🟢 All services are online.",
  maintenance: "🟡 Services are in maintenance.",
  unavailable: "🔴 Services are unavailable.",
};

const statusElement = document.getElementById("status");

statusElement.textContent = statusText.pending;

fetch("/api/status").then((r) => {
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
