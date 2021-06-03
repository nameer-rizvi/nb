const { timelog } = require("simpul");

function requestLoggerMiddleware(req, res, next) {
  timelog(`📟 ${req.method} "${req.url}" @ ${req.headers["user-agent"]}`);

  next();
}

module.exports = requestLoggerMiddleware;
