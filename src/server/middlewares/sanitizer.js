const sanitized = require("sanitized");

function sanitizerMiddleware(req, res, next) {
  res.locals = sanitized({ ...req.body, ...req.params, ...req.query });

  next();
}

module.exports = sanitizerMiddleware;

// Protection against XSS attacks.
//
// https://www.npmjs.com/package/sanitized
