// Disallow web crawlers to index routes.

function robotsMiddleware(req, res, next) {
  if (req.method === "GET" && req.path === "/robots.txt") {
    // If the request is for the robots.txt...

    // Set the response type to text.

    res.type("text/plain");

    // Send client a 200 ("OK") status with the text.

    res.send("User-agent: *\nDisallow: /");
  } else next();
}

module.exports = robotsMiddleware;
