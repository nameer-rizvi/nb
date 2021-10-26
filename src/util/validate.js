const simpul_validate = require("simpul-validate");

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

const validate = simpul_validate(dictionary);

module.exports = validate;
