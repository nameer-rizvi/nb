const util = require("../../util");

// Set recommended limit for request duration to 500 ms.

const DURATION_LIMIT = 500;

function performanceMiddleware(req, res, next) {
  // Create constant for request start time.

  const start = new Date().getTime();

  // On response finish...

  res.on("finish", () => {
    // Create constant for request end time.

    const end = new Date().getTime();

    // Create constant for request duration.

    const duration = end - start;

    // Create constant for request duration string in ms.

    const ms = `${duration.toLocaleString()} ms`;

    // Log request peformance.

    util.log.performance(ms);

    // If request performance was above the recommended limit, log warning.

    if (duration > DURATION_LIMIT) {
      const warning = [
        `${req.method.toLowerCase()} ${req.path} (${ms})`,
        "took longer than recommended request time limit.",
        "Consider refactoring to enhance route logic and reduce request time.",
      ].join(" ");
      util.log.warning(warning);
    }
  });

  // Go to next middleware.

  next();
}

module.exports = performanceMiddleware;
