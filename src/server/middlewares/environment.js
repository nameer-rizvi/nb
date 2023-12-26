function environmentMiddleware(req, res, next) {
  const { environment } = res.locals.routeConfig;

  if (environment && environment !== process.env.NODE_ENV) {
    throw new Error(`Invalid environment ("${environment}")`);
  }

  next();
}

module.exports = environmentMiddleware;
