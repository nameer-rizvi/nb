const util = require("../../util");

// Log request information.

function loggerMiddleware(req, res, next) {
  const start = Date.now();

  const path = req.path;

  res.on("finish", () => {
    const statusCode = coloredStatusCode(res.statusCode);

    const end = Date.now();

    const duration = (end - start).toLocaleString();

    const log = `${statusCode} ${req.method} ${path} by ${req.ip} took ${duration} ms.`;

    util.log.request(log);
  });

  next();
}

module.exports = loggerMiddleware;

function coloredStatusCode(statusCode) {
  if (statusCode < 300) {
    return `\x1b[32m${statusCode}\x1b[0m`;
  } else if (statusCode < 400) {
    return `\x1b[36m${statusCode}\x1b[0m`;
  } else if (statusCode < 500) {
    return `\x1b[33m${statusCode}\x1b[0m`;
  } else return `\x1b[31m${statusCode}\x1b[0m`;
}
