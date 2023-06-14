const util = require("../../../util");

// Log request information.

function loggerMiddleware(req, res, next) {
  util.log.route(`${req.method} ("${req.path}")`);

  util.log.user(`Request by ${req.ip}`);

  const start = Date.now();

  res.on("finish", () => {
    const end = Date.now();

    const duration = end - start;

    util.log.performance(`${duration.toLocaleString()} ms ("${req.path}")`);
  });

  next();
}

module.exports = loggerMiddleware;
