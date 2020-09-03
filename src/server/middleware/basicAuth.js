const { decode } = require("simpul").base64;

// Basic authorization to grant access only to
// specific users. Basic auth is NOT recommended
// for production use, as base64 encoded strings
// are essentially hard-coded translations and
// provide minimum, if any, protection against
// hackers. This is simply a template for how one
// might incorporate a simple authorization process
// within the app.
//
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication

module.exports = (req, res, next) => {
  const secure = process.env.NODE_ENV === "production" ? req.secure : null;

  const { authorization } = req.headers;

  const authSplit = authorization && authorization.split(" ");

  const isBasic = authSplit && authSplit[0] === "Basic";

  const base64 = authSplit && authSplit[1];

  function authorizeUser() {
    const credentials = decode(base64).split(":");
    const user = credentials[0];
    const accounts = { nameer: process.env.PASSWORD };
    accounts[user] === credentials[1]
      ? ((res.locals.user = user), next())
      : res.sendStatus(403);
  }

  secure && (!isBasic || !base64) ? res.status(401) : authorizeUser();
};
