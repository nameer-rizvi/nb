require("dotenv").config();
const express = require("express");
const simpul = require("simpul");
const logger = require("./middlewares/logger");
const path = require("path");
const middlewares = require("./middlewares");
const routes = require("./routes");
const errors = require("./errors");
const util = require("../util");

const server = express();

const port = process.env.PORT || 4000;

server.set("trust proxy", simpul.isEnv.live);

server.use(logger);

server.use(express.static(path.join(__dirname, "public")));

server.use("/api", middlewares, routes, errors);

server.listen(port, () => {
  util.log.environment(`in ${simpul.isEnv.name}.`);
  util.log.express(`server listening on port ${port}`);
});

// https://expressjs.com/
// https://www.npmjs.com/package/express
