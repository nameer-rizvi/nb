const config = require("../../config");
const utilN = require("@nameer/utils");

// Initialize a request-scoped context object on each request for downstream use.
function ctxMiddleware(req, res, next) {
  const url = new URL(req.originalUrl, `${req.protocol}://${req.headers.host}`);

  const routeConfig = config.route(req.method, url.pathname);

  req.ctx = { url, ...req.ctx, ...routeConfig };

  if (req.ctx.userAgentCode === true) {
    const userAgent = req.ip + req.headers["user-agent"];
    req.ctx.userAgentCode = utilN.base64.encode(userAgent);
  }

  if (config.nodeEnvInProduction) {
    if (req.ctx.cacheNoStore === true) {
      res.set("Cache-Control", "no-store");
    } else if (req.ctx.cacheNoCache === true) {
      res.set("Cache-Control", "no-cache");
    } else if (req.ctx.cacheMaxAge > 0) {
      res.set("Cache-Control", `max-age=${req.ctx.cacheMaxAge}`); // Age is in seconds.
    }
  }

  next();
}

module.exports = ctxMiddleware;
