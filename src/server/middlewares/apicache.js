async function apicacheMiddleware(req, res, next) {
  if (res.locals.routeConfig.cache) {
    // If route has a apicache middleware method available call it.

    res.locals.routeConfig.cache(req, res, next);
  } else {
    // Else, go to next middleware.

    next();
  }
}

module.exports = apicacheMiddleware;

// https://www.npmjs.com/package/apicache
