/*
 * Send appropriate health response for status check requests.
 * Protocol for conducting maintenance in a live pm2 environment:
 *  1. Set 'MAINTENANCE_MODE=true' in ecosystem.config.js.
 *  2. Run "yarn run pm2-restart" from root folder.
 *  3. [CONDUCT MAINTENANCE]
 *  4. Set 'MAINTENANCE_MODE=' in ecosystem.config.js.
 *  5. Run "yarn run pm2-restart" from root folder.
 */

function statusMiddleware(req, res, next) {
  if (req.url === "/health" && req.method === "GET") {
    res.sendStatus(200);
  } else if (process.env.MAINTENANCE_MODE === "true") {
    res.sendStatus(503);
  } else if (req.url === "/status" && req.method === "GET") {
    res.sendStatus(200);
  } else next();
}

module.exports = statusMiddleware;
