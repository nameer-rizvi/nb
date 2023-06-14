require("dotenv").config();
const express = require("express");
const util = require("../util");
const simpul = require("simpul");
const path = require("path");
const api = require("./api");

const server = express();

server.set("trust proxy", simpul.isEnv.live);

server.use(express.static(path.join(__dirname, "public")));

server.use(api);

const port = process.env.PORT || 4000;

server.listen(port, () => {
  util.log.environment(`in ${simpul.isEnv.name}.`);
  util.log.express(`server listening on port ${port}`);
});

// https://expressjs.com/
// https://www.npmjs.com/package/express
