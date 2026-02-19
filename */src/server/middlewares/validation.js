const sanitized = require("sanitized");
const config = require("../../config");
const validate = require("simpul-validate")(config.dictionary);
const util = require("../../util");
const simpul = require("simpul");

function validationMiddleware(req, res, next) {
  try {
    res.locals.values = parsePayload({ ...req.query, ...req.body }); // req.params is only accessible in the route handler.

    if (res.locals.ignoreValidation === true) {
      sanitized(res.locals.values);
    } else {
      validate(res.locals.values, res.locals.requiredKeys);
    }

    if (res.locals.values.token) {
      res.locals.values.token = util.jwt.verify(res.locals.values.token);
    }

    next();
  } catch (error) {
    const isUndefined = new RegExp(/Definition with key\b.*\bdoes not exist/);

    if (!isUndefined.test(error.toString())) error.status = 400;

    next(error);
  }
}

function parsePayload(payload) {
  for (const [key, value] of Object.entries(payload)) {
    const definition = config.dictionary.find((i) => i.key === key);
    if (definition?.type === "array" && simpul.isObject(value)) {
      const isKeysIndexes = Object.keys(value).every(simpul.isNumber);
      if (isKeysIndexes) payload[key] = Object.values(value);
    }
  }
  return payload;
}

module.exports = validationMiddleware;

// https://github.com/nameer-rizvi/simpul-validate/tree/main/src
