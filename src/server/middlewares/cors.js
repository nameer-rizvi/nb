const cors = require("cors");

module.exports = cors({
  origin: process.env.ORIGIN ? process.env.ORIGIN.split(",") : undefined,
});
