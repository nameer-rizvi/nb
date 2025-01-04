const simpul_validate = require("simpul-validate");
const config = require("../../config");
const sanitized = require("sanitized");
const simpul = require("simpul");

const validate = simpul_validate(config.dictionary);

function validationMiddleware(req, res, next) {
  try {
    res.locals.values = parsePayload({
      ...req.query,
      ...req.params,
      ...req.body,
    });

    if (res.locals.ignoreValidation === true) {
      sanitized(res.locals.values);
    } else {
      validate(res.locals.values, res.locals.requiredKeys);
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
