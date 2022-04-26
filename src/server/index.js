require("dotenv").config();
const express = require("express");
const util = require("../util");
const { isEnv } = require("simpul");
const middlewaresAndRoutes = require("./middlewares");

// Initialize Express server.

const server = express();

// Initialize port to use for the server.

const port = process.env.PORT || 4000;

// Listen for requests on server port.

server.listen(port, () => {
  // Log environment.

  util.log.environment2(`in ${isEnv.name}.`, { flag: "minimal" });

  // Log listener.

  util.log.express(`server listening on port ${port}`, { flag: "minimal" });
});

// Set "trust proxy" in live environments.

server.set("trust proxy", isEnv.live);

// Use middlewares + routes for Express server.

server.use(middlewaresAndRoutes);

// https://expressjs.com/
// https://www.npmjs.com/package/express
