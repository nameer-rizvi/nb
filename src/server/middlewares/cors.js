const cors = require("cors");
const { ORIGIN } = process.env;

const corsMiddleware = cors({
  origin: ORIGIN ? ORIGIN.split(",") : undefined,
});

module.exports = corsMiddleware;

// https://www.npmjs.com/package/cors
