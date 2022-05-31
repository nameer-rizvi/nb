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

    if (duration < DURATION_LIMIT) {
      const messages = [
        `Request time took longer than recommended limit ("${ms}").`,
        "Consider refactoring to enhance route logic and reduce request time.",
      ];
      util.log.warning(messages.join(" "));
    }
  });

  // Go to next middleware.

  next();
}

module.exports = performanceMiddleware;
