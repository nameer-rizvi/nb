// --starterKit-flag [review authentication strategy]
const util = require("../../../util");

async function authenticateMiddleware(req, res, next) {
  try {
    const authenticate = res.locals.routeConfig.authenticate;

    const config = {
      bearerToken: {
        verifyTokens: ["jwt"],
        getAuthToken: parseBearerToken,
        isValidToken: ({ token }) => Boolean(token),
      },
    }[authenticate];

    if (authenticate && !config) {
      throw new Error(`Missing config: "${authenticate}"`);
    } else if (config) configAuth(config, req, res, authenticate);

    next();
  } catch (error) {
    util.log.warning(`Authenticate Middleware: ${error.toString()}`);
    res.sendStatus(401);
  }
}

function parseBearerToken(req) {
  const { authorization = "" } = req.headers;
  let bearerToken = authorization.split("Bearer ")[1];
  if (bearerToken === "null" || bearerToken === "undefined") bearerToken = null;
  if (!bearerToken) throw new Error("Request authorization header is invalid.");
  return bearerToken;
}

function configAuth(config, req, res, authenticate) {
  const authToken = config.getAuthToken(req);
  if (authToken) {
    for (let verifyToken of config.verifyTokens) {
      try {
        if (verifyToken === "jwt")
          res.locals.token = util.jwt.verify(authToken);
      } catch (error) {
        util.log.warning(`Authenticate Middleware: ${error}`);
      }
    }
  }
  if (!config.isValidToken(res.locals))
    throw new Error(`Authorization denied ("${authenticate}")`);
}

module.exports = authenticateMiddleware;

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
