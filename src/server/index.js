require("dotenv").config();
const express = require("express");
const { log } = require("../util");
const middlewares = require("./middlewares");

const server = express();

const port = process.env.PORT || 4000;

server.listen(port, () => log.express(`server listening on port ${port}`));

server.use(middlewares);
