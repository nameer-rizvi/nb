const cors = require("cors");
const { ORIGIN } = process.env;

module.exports = cors({
  origin: ORIGIN ? ORIGIN.split(",") : undefined,
});

// https://www.npmjs.com/package/cors
