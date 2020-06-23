const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { logger } = require("../utils");
const { rateLimiter, sanitizer, basicAuth } = require("./middleware");
const { get } = require("./routes");

module.exports = () => {
  const server = express();
  const port = process.env.PORT || 5000;
  const origin = process.env.ORIGIN ? { origin: process.env.ORIGIN } : null;
  server.listen(port, () =>
    logger({ s: `Express server listening on port ${port}.` })
  );
  server.use(express.json());
  server.use(cors(origin));
  server.use(helmet());
  server.use(rateLimiter(500), sanitizer, basicAuth);
  server.get("/", get);
};
