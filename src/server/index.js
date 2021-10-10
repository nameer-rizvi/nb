const express = require("express");
const constant = require("../constant");
const { log } = require("../util");
const middlewares = require("./middlewares");

const server = express();

server.listen(constant.port, () =>
  log.express(`server listening on port ${constant.port}`)
);

server.use(middlewares);
