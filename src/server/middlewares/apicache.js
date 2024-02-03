const apicache = require("apicache");
const simpul = require("simpul");

apicache.clear(); // Reset api cache on server restart.

const cache = {
  min: apicache.middleware("30 seconds"),
  stale: apicache.middleware("5 minutes"),
  hour: apicache.middleware("1 hour"),
  day: apicache.middleware("1 day"),
  max: apicache.middleware("3 weeks"), // Max cache time limit: "2,147,483,647 milliseconds" || "35,791 minutes" || "596 hours" || "24 days" || "3.5 weeks"
};

function apicacheMiddleware(req, res, next) {
  if (simpul.isEnv.live && res.locals.routeConfig.cache) {
    res.locals.routeConfig.cache(req, res, next);
  } else {
    next();
  }
}

module.exports = { cache, middleware: apicacheMiddleware };

// https://www.npmjs.com/package/apicache
