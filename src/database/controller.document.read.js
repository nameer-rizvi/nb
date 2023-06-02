const databaseClient = require("./client");
const simpul = require("simpul");

function databaseControllerDocumentRead(find) {
  const store = databaseClient.read();

  const result = !simpul.isValid(find)
    ? store
    : simpul.isString(find)
    ? store.find((doc) => doc.id === find)
    : simpul.isArray(find)
    ? store.filter((doc) => find.includes(doc.id))
    : simpul.isObject(find)
    ? store.filter((doc) => {
        return Object.keys(find).every((key) => doc[key] === find[key]);
      })
    : simpul.isFunction(find)
    ? store.filter(find)
    : "invalid";

  return result !== "invalid"
    ? {
        success: true,
        message: "Read.",
        result,
      }
    : {
        success: false,
        message: "Invalid read operator.",
        result: undefined,
      };
}

module.exports = databaseControllerDocumentRead;
