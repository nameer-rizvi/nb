const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { logger } = require("simpul");
const { sanitizer, errorHandler } = require("./middleware");
const routes = require("./routes");

module.exports = () => {
  const server = express();
  const port = process.env.PORT || 4000;
  const origin = process.env.ORIGIN
    ? { origin: process.env.ORIGIN.split(",") }
    : null;
  server.listen(port, () =>
    logger({ s: "Express server listening on port " + port })
  );
  server.use(
    express.json(),
    cors(origin),
    helmet(),
    sanitizer,
    routes,
    errorHandler
  );
};
