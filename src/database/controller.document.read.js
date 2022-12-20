const databaseClient = require("./client");
const { isValid, isString, isArray, isObject, isFunction } = require("simpul");

function databaseControllerDocumentRead(find) {
  const store = databaseClient.read();

  const result = !isValid(find)
    ? store
    : isString(find)
    ? store.find((doc) => doc.id === find)
    : isArray(find)
    ? store.filter((doc) => find.includes(doc.id))
    : isObject(find)
    ? store.filter((doc) =>
        Object.keys(find).every((key) => doc[key] === find[key])
      )
    : isFunction(find)
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
