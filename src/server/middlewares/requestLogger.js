const { timelog } = require("simpul");

function requestLoggerMiddleware(req, res, next) {
  timelog(`🚚 ${req.method} ${req.url}`);

  timelog(`👤 ${req.headers["user-agent"]}`);

  next();
}

module.exports = requestLoggerMiddleware;
