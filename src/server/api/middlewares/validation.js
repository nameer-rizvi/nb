const sanitized = require("sanitized");
const util = require("../../../util");
const simpul = require("simpul");

function validationMiddleware(req, res, next) {
  try {
    const values = {
      payload: parsePayload({ ...req.body, ...req.query, ...req.params }),
      required: res.locals.routeConfig.requiredParams,
    };

    if (res.locals.routeConfig.ignoreValidationMiddleware) {
      res.locals.values = sanitized(values.payload);
    } else {
      res.locals.values = util.validate(values.payload, values.required);
    }

    next();
  } catch (error) {
    const isUndefined = error
      .toString()
      .match(/Dictionary definition with key\b.*\bdoes not exist/);

    if (!isUndefined) {
      error.status = 400;
      util.log.warning(`Validation Middleware: ${error.toString()}`);
    }

    next(error);
  }
}

module.exports = validationMiddleware;

function parsePayload(payload) {
  for (let [key, value] of Object.entries(payload)) {
    let definition = util.dictionary.find((i) => i.key === key);
    if (definition?.type === "array" && simpul.isObject(value)) {
      let isArrayObject = Object.keys(value).every(simpul.isNumber);
      if (isArrayObject) payload[key] = Object.values(value);
    }
  }
  return payload;
}
