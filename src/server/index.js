require("dotenv").config();
const express = require("express");
const path = require("path");
const simpul = require("simpul");
const api = require("./api");
const util = require("../util");

const server = express();

const public = express.static(path.join(__dirname, "public"));

const port = process.env.PORT || 4000;

server.set("trust proxy", simpul.isEnv.live);

server.use(public, api);

server.listen(port, () => {
  util.log.environment(`in ${simpul.isEnv.name}.`);
  util.log.express(`server listening on port ${port}`);
});

// https://expressjs.com/
// https://www.npmjs.com/package/express
