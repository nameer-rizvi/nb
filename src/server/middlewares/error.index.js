const { isString } = require("simpul");
const handleClientError = require("./error.client");
const handleServerError = require("./error.server");

// eslint-disable-next-line
function errorHandlerMiddleware(err, req, res, next) {
  if (err && isString(err)) {
    handleClientError(err, res);
  } else if (err) {
    handleServerError(err, res);
  } else res.sendStatus(500);
}

module.exports = errorHandlerMiddleware;

// https://expressjs.com/en/guide/error-handling.html
