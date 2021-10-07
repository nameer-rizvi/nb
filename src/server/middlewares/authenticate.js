const mock_user = {
  user_id: 1,
  username: "mr_mock",
};

function authenticateMiddleware(req, res, next) {
  const { authorization = "" } = req.headers;

  const bearerToken = authorization.split("Bearer ")[1];

  if (bearerToken && bearerToken !== "null") res.locals.user = mock_user;

  const isAuthenticated =
    (res.locals.routeConfig.authenticate && res.locals.user) ||
    !res.locals.routeConfig.authenticate;

  if (isAuthenticated) {
    next();
  } else res.sendStatus(401);
}

module.exports = authenticateMiddleware;
