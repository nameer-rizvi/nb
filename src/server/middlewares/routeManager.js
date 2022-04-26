const configs = require("./routeManager.configs");
const { base64 } = require("simpul");
const util = require("../../util");

function routeManagerMiddleware(req, res, next) {
  // Create the route constant by splitting the request url using the query delimiter.

  const route = req.url.split("?")[0];

  // Loop through all route configs and use the route constant & request method to find the route config.

  let routeConfig;

  for (let config of configs)
    if (config.route === route && config.method === req.method) {
      routeConfig = config;
      break;
    }

  if (routeConfig) {
    // If a matching route config exists for the request...

    // Store route config in res locals.

    // Store request ip as base64 encoded string in route config.

    res.locals.routeConfig = {
      ...routeConfig,
      ip: base64.encode(req.ip.replace(/\D/g, "")),
    };

    // Log route request.

    util.log.route(req.method.toLowerCase() + " " + route);

    // Log request user.

    util.log.user(`Request by ${res.locals.routeConfig.ip}`);

    // Go to next middleware

    next();
  } else {
    // Else...

    // Log missing route config as warning.

    util.log.warning(`Missing route config for: ${route} [${req.method}].`);

    // Send client a 404 ("Not Found") status.

    res.sendStatus(404);
  }
}

module.exports = routeManagerMiddleware;
