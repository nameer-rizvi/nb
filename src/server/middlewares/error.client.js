const { isNumber, isStringValid } = require("simpul");

function handleClientError(err, res) {
  const errSplit = err.split("::");

  const hasCode = isNumber(+errSplit[0]);

  const code = hasCode ? +errSplit[0] : 500;

  const message = hasCode ? errSplit[1] : errSplit[0];

  if (isStringValid(message)) {
    res.status(code).send(message);
  } else res.sendStatus(code);
}

module.exports = handleClientError;
