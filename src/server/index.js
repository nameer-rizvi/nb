const express = require("express");
const { timelog } = require("simpul");
const middlewares = require("./middlewares");

const server = express();

const port = process.env.EXPRESS_PORT || 4000;

server.listen(port, () =>
  timelog(`⚡ Express server listening on port ${port}.`)
);

server.use(middlewares);
