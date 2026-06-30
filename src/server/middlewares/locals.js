const config = require("../../config");
const utilN = require("@nameer/utils");

// Pass route config in res.locals for access by proceeding middlewares and route handlers.
function localsMiddleware(req, res, next) {
  const url = new URL(req.originalUrl, `${req.protocol}://${req.headers.host}`);

  const routeConfig = config.route(req.method, url.pathname);

  res.locals = { url, ...res.locals, ...routeConfig };

  if (res.locals.userAgentCode === true) {
    const userAgentAttributes = req.ip + req.headers["user-agent"];

    res.locals.userAgentCode = utilN.base64.encode(userAgentAttributes);
  }

  if (config.nodeEnvInProduction) {
    if (res.locals.cacheNoStore) {
      res.set("Cache-Control", "no-store");
    } else if (res.locals.cacheNoCache) {
      res.set("Cache-Control", "no-cache");
    } else if (res.locals.cacheMaxAge > 0) {
      res.set("Cache-Control", `max-age=${res.locals.cacheMaxAge}`); // Age is in seconds.
    }
  }

  next();
}

module.exports = localsMiddleware;
