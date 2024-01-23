const constant = require("../../constant");

function environmentMiddleware(req, res, next) {
  const { environment } = res.locals.routeConfig;

  if (environment && environment !== constant.node_env) {
    throw new Error(`Invalid environment ("${environment}")`);
  }

  next();
}

module.exports = environmentMiddleware;
