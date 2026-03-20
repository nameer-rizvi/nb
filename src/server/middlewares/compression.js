const compression = require("compression");

// Note: remove compression middleware if compression is handled by reverse proxy/CDN (like nginx).
const compressionMiddleware = compression();

module.exports = compressionMiddleware;

// https://www.npmjs.com/package/compression
