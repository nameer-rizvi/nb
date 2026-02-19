/*
 * Not-in-use due to the following issues:
 * 1. apicache does not use the redis client, even with the redis connection being called in the redis client file.
 * 2. apicache creates new entries for same requests on hard refresh, bloating the keys count.
 * The file is being kept here as a proof-of-concept for how to implement apicache as a middleware compatible with the different route types.
 */

const apicache = require("apicache");
const database = require("../../database");
const config = require("../../config");
const util = require("../../util");

const cache = apicache.options({ redisClient: database.redis, debug: false });

cache.clear(); // Reset api cache on server start.

// Max cache time limit: "2,147,483,647 milliseconds" || "35,791 minutes" || "596 hours" || "24 days" || "3.5 weeks"
for (const route of config.routes) {
  if (route.cache) route.cache = cache.middleware(route.cache);
}

const cacheApi = cache.middleware("5 minutes");

const cacheStatic = cache.middleware("1 week");

async function apicacheMiddleware(req, res, next) {
  if (res.locals.cache) {
    res.locals.cache(req, res, next);
  } else if (util.isRoute.get(req) && util.isRoute.api(req)) {
    cacheApi(req, res, next);
  } else if (util.isRoute.get(req) && util.isRoute.static(req)) {
    cacheStatic(req, res, next);
  } else {
    next();
  }
}

module.exports = apicacheMiddleware;

// https://www.npmjs.com/package/apicache
