const sanitized = require("sanitized");

// Protection against XSS attacks from user inputs.
// https://www.npmjs.com/package/sanitized

module.exports = (req, res, next) => {
  res.locals = sanitized({ ...req.body, ...req.params, ...req.query });
  next();
};
