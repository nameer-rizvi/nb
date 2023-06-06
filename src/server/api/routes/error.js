function routeError(req, res, next) {
  if (res.locals.values.error?.message) {
    const error = new Error(res.locals.values.error.message);
    error.status = 499; // Custom status code for client error.
    next(error);
  } else {
    res.sendStatus(403);
  }
}

module.exports = routeError;
