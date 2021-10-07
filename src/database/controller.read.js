const databaseClient = require("./client");
const { isString, isArray, isObject, isFunction } = require("simpul");

function databaseControllerRead(find) {
  const store = databaseClient.read() || [];

  if (isString(find)) {
    return store.find((doc) => doc.id === find);
  } else if (isArray(find)) {
    return store.filter((doc) => find.includes(doc.id));
  } else if (isObject(find)) {
    return store.filter((doc) =>
      Object.keys(find).every((key) => doc[key] === find[key])
    );
  } else if (isFunction(find)) {
    return store.filter(find);
  } else return store;
}

module.exports = databaseControllerRead;
