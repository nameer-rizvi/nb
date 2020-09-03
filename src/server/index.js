const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { logger } = require("simpul");
const { rateLimiter, sanitizer, basicAuth } = require("./middleware");
const routes = require("./routes");

module.exports = () => {
  const server = express();
  const port = process.env.PORT || 4000;
  const origin = process.env.ORIGIN ? { origin: process.env.ORIGIN } : null;
  server.listen(port, () =>
    logger({ s: "Express server listening on port " + port })
  );
  server.use(express.json());
  server.use(cors(origin));
  server.use(helmet());
  server.use(rateLimiter(500));
  server.use(sanitizer);
  server.use(basicAuth);
  server.use(routes);
};
