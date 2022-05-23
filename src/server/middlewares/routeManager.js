const configs = require("./routeManager.configs");
const { base64 } = require("simpul");
const util = require("../../util");

function routeManagerMiddleware(req, res, next) {
  // Loop through all route configs and use the request path & method to find the route config.

  let routeConfig;

  for (let config of configs)
    if (config.path === req.path && config.method === req.method) {
      routeConfig = config;
      break;
    }

  if (routeConfig) {
    // If a route config exists for the request...

    // Create request user ip as base64 encoded string of the request ip.

    const reqUserIp = base64.encode(req.ip.replace(/\D/g, ""));

    // Store route config and request user ip in res locals.

    res.locals.routeConfig = { ...routeConfig, ip: reqUserIp };

    // Log route request.

    util.log.route(req.method.toLowerCase() + " " + req.path);

    // Log request user ip.

    util.log.user(`Request by ${reqUserIp}`);

    // Go to next middleware

    next();
  } else {
    // Else...

    // Log missing route config as warning.

    util.log.warning(`Missing route config for: ${req.path} [${req.method}].`);

    // Send client a 404 ("Not Found") status.

    res.sendStatus(404);
  }
}

module.exports = routeManagerMiddleware;
