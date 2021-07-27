const express = require("express");
const { timelog } = require("simpul");
const middlewares = require("./middlewares");

function expressServer() {
  const server = express();

  const port = process.env.PORT || 4000;

  const logListener = () =>
    timelog(`⚡ Express server listening on port ${port}.`);

  server.listen(port, logListener);

  server.use(middlewares);
}

module.exports = expressServer;
