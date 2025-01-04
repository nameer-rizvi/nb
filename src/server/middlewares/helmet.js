const helmet = require("helmet");

// Note: causes issues for requests by service worker, temp solution: res.set("Cache-Control", "no-store")
const helmetMiddleware = helmet();

module.exports = helmetMiddleware;

// https://helmetjs.github.io/
// https://www.npmjs.com/package/helmet
