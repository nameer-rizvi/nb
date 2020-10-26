const cors = require("./cors");
const errorHandler = require("./errorHandler");
const expressJSON = require("./expressJSON");
const helmet = require("./helmet");
const sanitizer = require("./sanitizer");

module.exports = {
  main: [cors, helmet, expressJSON, sanitizer],
  errorHandler,
};
