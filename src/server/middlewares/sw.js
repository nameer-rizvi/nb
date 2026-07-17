const util = require("../../util");

// Allow service worker to operate in global scope.
// Prevent the SW file itself from being cached so updates always land.
function serviceWorkerMiddleware(req, res, next) {
  if (req.path === "/js/sw.js" && util.isRoute.get(req)) {
    res.setHeader("Service-Worker-Allowed", "/");
    res.setHeader("Cache-Control", "no-store");
  }
  next();
}

module.exports = serviceWorkerMiddleware;
