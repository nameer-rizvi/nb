const express = require("express");
const { logger } = require("simpul");
const middlewares = require("./middlewares");

function expressServer() {
  const server = express();

  const port = process.env.PORT || 4000;

  const logListener = () =>
    logger(`📡 Express server listening on port ${port}.`);

  server.listen(port, logListener);

  server.use(middlewares);
}

module.exports = expressServer;
