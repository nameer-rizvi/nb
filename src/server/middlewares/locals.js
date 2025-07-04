const config = require("../../config");
const simpul = require("simpul");

// Pass route config in res.locals for access by proceeding middlewares and route handlers.
function localsMiddleware(req, res, next) {
  const url = new URL(req.originalUrl, `${req.protocol}://${req.headers.host}`);

  const routeConfig = config.route(req.method, url.pathname);

  res.locals = { url, ...res.locals, ...routeConfig };

  if (res.locals.userAgentCode === true) {
    const userAgentAttributes = req.ip + req.headers["user-agent"];

    res.locals.userAgentCode = simpul.base64.encode(userAgentAttributes);
  }

  next();
}

module.exports = localsMiddleware;
