const express = require("express");
const { logger } = require("simpul");
const middlewares = require("./middlewares");

module.exports = () => {
  const server = express();

  const port = process.env.PORT || 4000;

  server.listen(port, () =>
    logger({ s: "Express server listening on port " + port })
  );

  server.use(middlewares);
};
