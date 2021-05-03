const middlewares = [
  require("./cors"),
  require("./expressJSON"),
  require("./helmet"),
  require("./sanitizer"),
  require("./requestLogger"),
  require("../routes"),
  require("./errorHandler"),
];

module.exports = middlewares;
