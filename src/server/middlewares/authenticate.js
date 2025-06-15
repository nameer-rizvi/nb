const simpul = require("simpul");
const util = require("../../util");
const config = require("../../config");

// Develop and use strategies to authenticate requests.
function authenticateMiddleware(req, res, next) {
  try {
    const authorization = (req.headers.authorization || "").split(" ");

    if (authorization[0] === "Bearer" && authorization[1] !== "undefined") {
      res.locals.token = util.jwt.verify(authorization[1]);
    } else if (authorization[0] === "Basic") {
      const decoded = simpul.base64.decode(authorization[1]).split(":");
      res.locals.username = decoded[0];
      res.locals.password = decoded[1];
    }

    res.locals.apiKey =
      req.get("x-api-key") || req.headers.apikey || req.query.apiKey;

    for (const strategy of res.locals.strategies || []) {
      if (strategy === "jwt" && !res.locals.token) {
        throw new Error("Invalid token");
      } else if (strategy === "apiKey" && res.locals.apiKey !== config.apiKey) {
        throw new Error("Invalid api key");
      }
    }

    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
}

module.exports = authenticateMiddleware;

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
