const cors = require("./cors");
const errorHandler = require("./errorHandler");
const expressJSON = require("./expressJSON");
const helmet = require("./helmet");
const routes = require("../routes");
const sanitizer = require("./sanitizer");

module.exports = [cors, helmet, expressJSON, sanitizer, routes, errorHandler];
