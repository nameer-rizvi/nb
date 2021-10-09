const cors = require("cors");
const { ORIGIN } = process.env;

// An api service might want to provide access to multiple origins,
// as such, we declare them as env variables separated by commas.

const corsMiddleware = cors({ origin: ORIGIN && ORIGIN.split(",") });

module.exports = corsMiddleware;

// https://www.npmjs.com/package/cors
