const configs = require("./routeManager.configs");
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

    // Store route config in res locals.

    res.locals.routeConfig = routeConfig;

    // Log route request.

    util.log.route(`${req.method} ("${req.path}")`);

    // Log request ip.

    util.log.user(`Request by ${req.ip}`);

    // Go to next middleware

    next();
  } else {
    // Else...

    // Log missing route config.

    util.log.warning(
      `Route Manager Middleware: Missing route config ("${req.path}")`
    );

    // Send client a 404 ("Not Found") status.

    res.sendStatus(404);
  }
}

module.exports = routeManagerMiddleware;
