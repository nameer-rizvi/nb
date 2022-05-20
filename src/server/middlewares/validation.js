const sanitized = require("sanitized");
const util = require("../../util");

function validationMiddleware(req, res, next) {
  try {
    // Initialize values config with payload and required params for route.

    const values = {
      payload: { ...req.body, ...req.query, ...req.params },
      required: res.locals.routeConfig.requiredParams,
    };

    // If route ignores validations, then set res locals to sanitized values payload.
    //  Otherwise, validate the values payload/required.

    res.locals.values = res.locals.routeConfig.ignoreValidation
      ? sanitized(values.payload)
      : util.validate(values.payload, values.required);

    // Go to next middleware.

    next();
  } catch (error) {
    const isUndefined = error
      .toString()
      .match(/\bDictionary definition with key\b.*\bdoes not exist\b/);

    if (isUndefined) {
      // If error is for a missing data dictionary config...

      // Handle it with next server error middleware.

      next(error);
    } else {
      // Else...

      // Log validation error as a warning

      util.log.warning(error.toString().replace("Error:", ""));

      // Send client a 400 ("Bad Request") status with the validation error.

      next("400::" + error);
    }
  }
}

module.exports = validationMiddleware;
