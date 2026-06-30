const express = require("express");
const config = require("../config");
const middlewares = require("./middlewares");
const routerStatic = require("./router.static");
const routerApi = require("./router.api");
const routerPublic = require("./router.public");
const errorHandler = require("./error");
const util = require("../util");

const server = express();

server.set("trust proxy", config.nodeEnvInProduction ? 1 : false); // Trust one reverse proxy hop in production.

if (middlewares.app.length) server.use(middlewares.app); // Application middlewares.

server.use(routerStatic, routerApi, routerPublic, errorHandler); // Route and error handlers.

server.listen(config.nodePort, function listener() {
  util.log.server(`listening on port ${config.nodePort}`);
});

// https://expressjs.com/
