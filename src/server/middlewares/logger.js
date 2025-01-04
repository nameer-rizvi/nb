const util = require("../../util");

// Log information for the request in a readable format.
function loggerMiddleware(req, res, next) {
  const start = Date.now(); // Date.now() is 4 times faster than performance.now(): https://stackoverflow.com/a/70545051

  res.on("finish", function onResFinish() {
    let statusCodeColor = 0;

    if (res.statusCode < 200) {
      statusCodeColor = 37;
    } else if (res.statusCode < 300) {
      statusCodeColor = 32;
    } else if (res.statusCode < 400) {
      statusCodeColor = 36;
    } else if (res.statusCode < 500) {
      statusCodeColor = 33;
    } else if (res.statusCode < 600) {
      statusCodeColor = 31;
    }

    const duration = (Date.now() - start).toLocaleString();

    const log = `\x1b[${statusCodeColor}m${res.statusCode}\x1b[0m ${req.method} ${req.path} by ${req.ip} in ${duration} ms`;

    const payload = { ...req.params, ...req.query, ...req.body };

    if (res.locals.error) {
      util.log.request(`${log} ("Error: ${res.locals.error}")`, "error");
    } else if (Object.keys(payload).length) {
      util.log.request(`${log} (${JSON.stringify(payload)})`);
    } else {
      util.log.request(log);
    }
  });

  next();
}

module.exports = loggerMiddleware;
