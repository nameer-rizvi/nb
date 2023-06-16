const util = require("../../util");

// Log request information.

function loggerMiddleware(req, res, next) {
  const start = Date.now();

  const path = req.path;

  res.on("finish", () => {
    const end = Date.now();

    const duration = (end - start).toLocaleString();

    const log = `${res.statusCode} ${req.method} ${path} by ${req.ip} took ${duration} ms.`;

    util.log.route(log);
  });

  next();
}

module.exports = loggerMiddleware;
