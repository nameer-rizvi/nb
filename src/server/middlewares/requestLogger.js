const { logger } = require("simpul");

function requestLogger(req, res, next) {
  logger({ s: `${req.method} "${req.url}"` });
  next();
}

module.exports = requestLogger;
