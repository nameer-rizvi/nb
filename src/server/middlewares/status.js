/*
 * Send appropriate health response for status check requests.
 * Protocol for conducting maintenance in a live pm2 environment:
 *  1. Set 'MAINTENANCE_MODE=true' in ecosystem.config.js.
 *  2. Run "yarn run pm2-restart" from root folder.
 *  3. [CONDUCT MAINTENANCE]
 *  4. Set 'MAINTENANCE_MODE=' in ecosystem.config.js.
 *  5. 2. Run "yarn run pm2-restart" from root folder.
 */

function statusMiddleware(req, res, next) {
  const responses = [
    {
      condition: req.method === "GET" && req.url === "/health",
      log: "OK health",
      status: 200,
    },
    {
      condition: process.env.MAINTENANCE_MODE === "true",
      log: "In maintenance mode",
      status: 503,
    },
    {
      condition: req.method === "GET" && req.url === "/status",
      log: "OK status",
      status: 200,
    },
  ];

  const response = responses.find((r) => r.condition);

  if (response) {
    res.sendStatus(response.status);
  } else next();
}

module.exports = statusMiddleware;
