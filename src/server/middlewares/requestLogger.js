const { logger } = require("simpul");

function requestLoggerMiddleware(req, res, next) {
  logger({ s: `${req.method} "${req.url}"` });
  next();
}

module.exports = requestLoggerMiddleware;
