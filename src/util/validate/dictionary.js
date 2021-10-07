const validateDictionary = [
  {
    key: "document",
    label: "Document",
    type: "isObjectValid",
  },
  {
    key: "error",
    label: "Error",
    type: "isObjectValid",
  },
  {
    key: "id",
    label: "Id",
    type: "isString",
    maxLength: 100,
  },
];

module.exports = validateDictionary;
