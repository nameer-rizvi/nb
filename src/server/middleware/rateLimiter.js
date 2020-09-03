const rateLimit = require("express-rate-limit");

// Protection against brute-force attacks.
// https://www.npmjs.com/package/express-rate-limit
//
// Should be delegated to something like Nginx or Apache.

module.exports = (limit) =>
  rateLimit({
    windowMs: 60 * 60 * 1000, // 15 minutes
    max: limit || 100,
    message: "Too many requests, try again in 15 minutes.",
  });
