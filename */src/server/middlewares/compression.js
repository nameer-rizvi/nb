const compression = require("compression");

const compressionMiddleware = compression();

module.exports = compressionMiddleware;

// https://www.npmjs.com/package/compression
