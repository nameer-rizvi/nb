const utilN = require("@nameer/utils");
const util = require("../../util");
const config = require("../../config");

// Develop and use strategies to authorize requests.
function authorizationMiddleware(req, res, next) {
  try {
    const [scheme, token] = (req.headers.authorization || "").split(" ");

    if (scheme === "Bearer" && token != null && token !== "undefined") {
      req.ctx.token = util.jwt.verify(token);
    } else if (scheme === "Basic") {
      const decoded = utilN.base64.decode(token).split(":");
      req.ctx.username = decoded[0];
      req.ctx.password = decoded[1];
    }

    req.ctx.apiKey =
      req.get("x-api-key") || req.get("apikey") || req.query.apiKey; // req.get is case insensitive.

    for (const strategy of req.ctx.strategies || []) {
      if (strategy === "jwt" && !req.ctx.token) {
        throw new Error("Invalid token");
      } else if (strategy === "apiKey" && req.ctx.apiKey !== config.apiKey) {
        throw new Error("Invalid api key");
      }
    }

    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
}

module.exports = authorizationMiddleware;

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
