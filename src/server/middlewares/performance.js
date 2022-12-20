const util = require("../../util");

function performanceMiddleware(req, res, next) {
  // Constant for request start time.

  const start = Date.now();

  // Constant to store path. For some reason it changes on finish...

  const path = req.path;

  // On response finish...

  res.on("finish", () => {
    // Constant for request end time.

    const end = Date.now();

    // Constant for request duration.

    const duration = end - start;

    // Log request peformance duration in ms.

    util.log.performance(`${duration.toLocaleString()} ms ("${path}")`);
  });

  // Go to next middleware.

  next();
}

module.exports = performanceMiddleware;
