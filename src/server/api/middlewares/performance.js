const util = require("../../../util");

// Track time performance of each request.

function performanceMiddleware(req, res, next) {
  const start = Date.now();

  const path = req.path;

  res.on("finish", () => {
    const end = Date.now();
    const duration = end - start;
    util.log.performance(`${duration.toLocaleString()} ms ("${path}")`);
  });

  next();
}

module.exports = performanceMiddleware;
