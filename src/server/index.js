require("dotenv").config();
const express = require("express");
const { log } = require("../util");
const { isEnv } = require("simpul");
const middlewares = require("./middlewares");

// Initialize Express server.

const server = express();

// Initialize port to use for the server.

const port = process.env.PORT || 4000;

// Listen for requests on server port.

server.listen(port, () => {
  // Log listener.

  log.express(`server listening on port ${port}`, { flag: "minimal" });

  // Log environment.

  log.environment(`in ${process.env.NODE_ENV}.`, { flag: "minimal" });
});

// Set "trust proxy" in live environments.

server.set("trust proxy", isEnv.live);

// Use middlewares for Express application.

server.use(middlewares);

// http://expressjs.com/
// https://www.npmjs.com/package/express
