const middlewares = [
  require("./status"),
  require("./cors"),
  require("./helmet"),
  require("./parsers"),
  require("./routeManager"),
  require("./environment"),
  require("./authenticate"),
  require("./validation"),
  require("./compression"),
  require("./apicache").middleware,
];

module.exports = middlewares;
