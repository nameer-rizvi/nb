const cors = require("cors");

// Initialize origin from .env config with a default string.

const { ORIGIN = "" } = process.env;

// An api service might want to provide access to multiple origins,
// as such, we declare them in a comma-separated env string variable.

const corsMiddleware = cors({ origin: ORIGIN.split(",") });

module.exports = corsMiddleware;

// https://www.npmjs.com/package/cors
