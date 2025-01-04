const config = require("../../config");

// Pass route config in res.locals for access by proceeding middlewares and route handlers.
function localsMiddleware(req, res, next) {
  const url = new URL(req.originalUrl, `${req.protocol}://${req.headers.host}`);

  res.locals = { url, ...config.route(req.method, url.pathname) };

  next();
}

module.exports = localsMiddleware;
