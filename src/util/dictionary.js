// --starterKit-flag [define data dictionary definitions]
/*
 * The data dictionary store contains definitions that define any and all
 * values that can be passed to the api routes (unless a route config has
 * explicity set "ignoreValidationMiddleware" to true).
 */

const dictionary = [
  {
    key: "document",
    type: "object",
  },
  {
    key: "error",
    type: "object",
    whitelistKeys: ["pathname", "message", "stack"],
  },
  {
    key: "id",
    type: "string",
    maxLength: 100,
  },
];

module.exports = dictionary;

// https://github.com/nameer-rizvi/simpul-validate/tree/main/src
