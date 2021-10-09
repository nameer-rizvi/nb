// Fake user.

const mock_user = {
  user_id: 1,
  username: "mr_mock",
};

function authenticateMiddleware(req, res, next) {
  // Initialize authorization header with default string type.

  const { authorization = "" } = req.headers;

  // Parse "Bearer" token from authorization header.

  const bearerToken = authorization.split("Bearer ")[1];

  // If a bearer token exists, assign user to res.locals store.
  //   Typically, the bearer token is verified using "jsonwebtoken"
  //   and if any data is returned (which would most likely contain
  //   the user id in it), we'd assign that to res.locals store instead.

  if (bearerToken && bearerToken !== "null") res.locals.user = mock_user;

  // Request is authenticated if a route requires authentication
  // and a user exists, or if the route doesn't require authentication.

  const isAuthenticated =
    (res.locals.routeConfig.authenticate && res.locals.user) ||
    !res.locals.routeConfig.authenticate;

  // If request is authenticated, go to next middleware,
  // otherwise respond with a 401 "Unauthorized" status code.

  if (isAuthenticated) {
    next();
  } else res.sendStatus(401);
}

module.exports = authenticateMiddleware;

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization
