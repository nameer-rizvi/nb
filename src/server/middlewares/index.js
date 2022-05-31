const middlewares = [
  require("./performance"),
  require("./status"),
  require("./cors"),
  require("./helmet"),
  require("./expressParsers"),
  require("./routeManager"),
  // require("./rateLimit"), // Proxies (i.e. NGINX) normally handle this...
  require("./authenticate"),
  require("./validation"),
  require("./compression"),
  require("./apicache").middleware,
  require("../routes"),
  require("./error.index"),
];

module.exports = middlewares;
