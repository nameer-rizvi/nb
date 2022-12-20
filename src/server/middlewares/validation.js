const sanitized = require("sanitized");
const util = require("../../util");
const { isObject, isNumber } = require("simpul");

function validationMiddleware(req, res, next) {
  try {
    // Initialize values config with parsed payload and required params for route.

    const values = {
      payload: parsePayload({ ...req.body, ...req.query, ...req.params }),
      required: res.locals.routeConfig.requiredParams,
    };

    // If route ignores validations, then set res locals to sanitized values payload.
    //  Else, validate the values payload/required.

    if (res.locals.routeConfig.ignoreValidation) {
      res.locals.values = sanitized(values.payload);
    } else res.locals.values = util.validate(values.payload, values.required);

    // Go to next middleware.

    next();
  } catch (error) {
    const isUndefined = error
      .toString()
      .match(/Dictionary definition with key\b.*\bdoes not exist/);

    if (isUndefined) {
      // If error is for a missing data dictionary config, handle it with next server error middleware.

      next(error);
    } else {
      // Else...

      // Log validation error.

      util.log.warning2(`Validation Middleware: ${error.toString()}`);

      // Send client a 400 ("Bad Request") status with the validation error.

      next("400::" + error);
    }
  }
}

module.exports = validationMiddleware;

function parsePayload(payload) {
  for (let [key, value] of Object.entries(payload)) {
    let definition = util.dictionary.find((i) => i.key === key);
    if (definition?.type === "array" && isObject(value)) {
      let isArrayObject = Object.keys(value).every(isNumber);
      if (isArrayObject) payload[key] = Object.values(value);
    }
  }
  return payload;
}
