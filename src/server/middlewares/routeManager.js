const configs = require("./routeManagerConfigs");
const util = require("../../util");

function routeManagerMiddleware(req, res, next) {
  let routeConfig;

  for (let config of configs) {
    if (config.path === req.path && config.method === req.method) {
      routeConfig = config;
      break;
    }
  }

  if (routeConfig) {
    res.locals.routeConfig = routeConfig;

    next();
  } else {
    const warning = `Route Manager Middleware: Missing route config ("${req.path}")`;

    util.log.warning(warning);

    res.sendStatus(404);
  }
}

module.exports = routeManagerMiddleware;
