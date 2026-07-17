const sanitized = require("sanitized");
const config = require("../../config");
const validateN = require("@nameer/validate")(config.dictionary);
const util = require("../../util");
const utilN = require("@nameer/utils");

function validationMiddleware(req, res, next) {
  try {
    req.ctx.values = parsePayload({ ...req.query, ...req.body }); // req.params is only accessible in the route handler.

    if (req.ctx.ignoreValidation === true) {
      req.ctx.values = sanitized(req.ctx.values);
    } else {
      validateN(req.ctx.values, req.ctx.requiredKeys);
    }

    if (req.ctx.values.token) {
      req.ctx.values.token = util.jwt.verify(req.ctx.values.token);
    }

    next();
  } catch (error) {
    const isUndefined = /Definition with key\b.*\bdoes not exist/;

    if (!isUndefined.test(String(error))) error.status = 400;

    next(error);
  }
}

function parsePayload(payload) {
  for (const [key, value] of Object.entries(payload)) {
    const definition = config.dictionary.find((i) => i.key === key);
    if (definition?.type === "array" && utilN.isObject(value)) {
      const isKeysIndexes = Object.keys(value).every(utilN.isNumberString);
      if (isKeysIndexes) payload[key] = Object.values(value);
    }
  }
  return payload;
}

module.exports = validationMiddleware;

// https://github.com/nameer-rizvi/validate/tree/main/src
