const util = require("../../util");
const simpul = require("simpul");

// Develop and use strategies to authenticate requests.
function authenticateMiddleware(req, res, next) {
  try {
    const authorization = (req.headers.authorization || "").split(" ");

    if (authorization[0] === "Bearer") {
      res.locals.token = util.jwt.verify(authorization[1]);
    } else if (authorization[0] === "Basic") {
      const decoded = simpul.base64.decode(authorization[1]).split(":");
      res.locals.username = decoded[0];
      res.locals.password = decoded[1];
    }

    if (res.locals.userAgentCode === true) {
      const userAgentAttributes = req.ip + req.headers["user-agent"];
      res.locals.userAgentCode = simpul.base64.encode(userAgentAttributes);
    }

    res.locals.apiKey = req.headers.apikey || req.query.apiKey;

    for (const strategy of res.locals.strategies || []) {
      if (strategy === "isToken") {
        if (!res.locals.token) throw new Error("Invalid token");
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
