// --starterKit-flag [review authentication strategy]
const simpul = require("simpul");
const util = require("../../util");

async function authenticateMiddleware(req, res, next) {
  try {
    // Destructure required props from route config.

    const { authenticate } = res.locals.routeConfig;

    // Assign authentication config based on required authentication method by route.

    const config = {
      bearerToken: {
        verifyTokens: ["jwt"],
        getAuthToken: parseBearerToken,
        isValidToken: ({ token }) => Boolean(token),
      },
    }[authenticate];

    // Use config to authenticate request and assign data to res locals.

    if (config) {
      const authToken = config.getAuthToken(req);
      if (authToken) {
        for (let verifyToken of config.verifyTokens) {
          await simpul.tryAsync(async function verifyAndAssignAuthToken() {
            if (verifyToken === "jwt") {
              res.locals.token = await util.jwt.verify(authToken);
            }
          });
        }
      }
    }

    // Deny request if token[data] is not valid/unauthorized.

    const denyAuthorization = config && !config.isValidToken(res.locals);

    // Throw error if request authorization is denied.

    if (denyAuthorization)
      throw new Error(`Authorization denied ("${authenticate}")`);

    // Go to next middleware.

    next();
  } catch (error) {
    // Log authentication error.

    util.log.warning2(`Authenticate Middleware: ${error.toString()}`);

    // Send client a 401 ("Unauthorized") status.

    res.sendStatus(401);
  }
}

function parseBearerToken(req) {
  // Destructure authorization header with default string type.

  const { authorization = "" } = req.headers;

  // Split bearer token from authorization header.

  let bearerToken = authorization.split("Bearer ")[1];

  // If bearer token is a null or undefined literal string, set it to null.

  if (bearerToken === "null" || bearerToken === "undefined") bearerToken = null;

  // If bearer token doesn't exist, throw error.

  if (!bearerToken) throw new Error("Request authorization header is invalid.");

  // Return bearer token.

  return bearerToken;
}

module.exports = authenticateMiddleware;

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
