const middlewares = [
  require("./robots"),
  require("./performance"),
  require("./status"),
  require("./cors"),
  require("./helmet"),
  require("./expressParsers"),
  require("./routeManager"),
  require("./validation"),
  require("./authenticate"),
  require("./compression"),
  require("./apicache").middleware,
  require("../routes"),
  require("./error.index"),
];

module.exports = middlewares;
