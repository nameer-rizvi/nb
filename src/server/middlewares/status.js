const util = require("../../util");
const config = require("../../config");

// Send OK response for health and status checks if app is not undergoing maintenance or otherwise unhealthy.
function statusMiddleware(req, res, next) {
  if (req.url === "/health" && util.isRoute.get(req)) {
    res.sendStatus(200);
  } else if (config.nodeEnvInMaintenance) {
    res.sendStatus(503);
  } else if (req.url === "/status" && util.isRoute.get(req)) {
    res.sendStatus(200);
  } else {
    next();
  }
}

module.exports = statusMiddleware;
