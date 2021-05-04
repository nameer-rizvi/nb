const { logger } = require("simpul");

function requestLoggerMiddleware(req, res, next) {
  logger(`📟 ${req.method} "${req.url}" @ ${req.headers["user-agent"]}`);

  next();
}

module.exports = requestLoggerMiddleware;
