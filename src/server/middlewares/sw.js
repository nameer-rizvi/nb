const util = require("../../util");

// Allow service worker to operate in global scope.
function serviceWorkerMiddleware(req, res, next) {
  if (req.path === "/js/sw.js" && util.isRoute.get(req)) {
    res.setHeader("Service-Worker-Allowed", "/");
  }

  next();
}

module.exports = serviceWorkerMiddleware;
