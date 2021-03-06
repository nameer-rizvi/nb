const { isString, isNumber, isStringValid, timelog } = require("simpul");

function clientErrorHandler(err, res) {
  const errSplit = err.split("::");
  const hasCode = isNumber(+errSplit[0]);
  const code = hasCode ? +errSplit[0] : 500;
  const message = hasCode ? errSplit[1] : errSplit[0];
  if (isStringValid(message)) {
    res.status(code).send(message);
  } else res.sendStatus(code);
}

function serverErrorHandler(err, res) {
  timelog("💬 " + (err.sqlMessage || err.message || err.toString()));
  let stack = [];
  const errStackSplit = err.stack && err.stack.split("at ");
  for (let i = 0; i < errStackSplit.length; i++) {
    let trace = errStackSplit[i];
    if (trace && trace.includes("/src")) stack.push(trace.trim());
  }
  if (stack && stack.length) {
    for (let i = 0; i < stack.length; i++) {
      timelog("➡️  " + stack[i]);
    }
  }
  res.sendStatus(500);
}

// eslint-disable-next-line
function errorHandlerMiddleware(err, req, res, next) {
  timelog({ e: `${req.method} "${req.url}"` });
  if (err && isString(err)) {
    clientErrorHandler(err, res);
  } else if (err) {
    serverErrorHandler(err, res);
  } else res.sendStatus(500);
}

module.exports = errorHandlerMiddleware;

// https://expressjs.com/en/guide/error-handling.html
