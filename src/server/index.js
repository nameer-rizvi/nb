const express = require("express");
const simpul = require("simpul");
const logger = require("./middlewares/logger");
const path = require("path");
const middlewares = require("./middlewares");
const routes = require("./routes");
const errors = require("./errors");
const util = require("../util");
const constant = require("../constant");

const server = express();

server.set("trust proxy", simpul.isEnv.live);

server.use(logger);

server.use(express.static(path.join(__dirname, "public")));

server.use("/api", middlewares, routes, errors);

server.listen(constant.node_port, () => {
  util.log.environment(`in ${simpul.isEnv.name}.`);
  util.log.express(`server listening on port ${constant.node_port}`);
});

// https://expressjs.com/
// https://www.npmjs.com/package/express
