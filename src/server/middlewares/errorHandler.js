const {
  isString,
  isNumber,
  isStringValid,
  logger,
  string: simpulString,
} = require("simpul");

function handleClientError(err, res) {
  const errSplit = err.split("::");

  const hasCode = isNumber(+errSplit[0]);

  const code = hasCode ? +errSplit[0] : 500;

  const message = hasCode ? errSplit[1] : errSplit[0];

  isStringValid(message)
    ? res.status(code).send(message)
    : res.sendStatus(code);
}

function handleServerError(err, res) {
  const message = err.message || err.toString();

  message && logger({ e: message });

  let stack = [];

  const errStackSplit = err.stack && err.stack.split("at ");
  for (let i = 0; i < errStackSplit.length; i++) {
    let trace = errStackSplit[i];
    trace &&
      trace.includes("/nb/src") &&
      stack.push(simpulString.space.clean(trace));
  }

  if (stack && stack.length) {
    for (let i = stack.length - 1; i >= 0; i--) {
      logger("➡️  " + stack[i]);
    }
  }

  res.sendStatus(500);
}

// next param is required for capturing errors.
//
// eslint-disable-next-line
module.exports = (err, req, res, next) =>
  err
    ? isString(err)
      ? handleClientError(err, res)
      : handleServerError(err, res)
    : res.sendStatus(500);
