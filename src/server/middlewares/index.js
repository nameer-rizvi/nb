const middlewares = [
  require("./cors"),
  require("./errorHandler"),
  require("./expressJSON"),
  require("./helmet"),
  require("../routes"),
  require("./sanitizer"),
];

module.exports = middlewares;
