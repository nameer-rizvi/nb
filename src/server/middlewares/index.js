const middlewares = [
  require("./cors"),
  require("./helmet"),
  require("./expressJSON"),
  require("./routeManager"),
  // require("./rateLimit"), // Proxies (i.e. NGINX) normally handle this...
  require("./authenticate"),
  require("./validation"),
  require("../routes"),
  require("./error.index"),
];

module.exports = middlewares;
