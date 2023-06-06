const helmet = require("helmet");

// helmet applies best-practices security measures on requests.

const helmetMiddleware = helmet();

module.exports = helmetMiddleware;

// https://helmetjs.github.io/
// https://www.npmjs.com/package/helmet
