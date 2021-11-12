const { isObject, clone } = require("simpul");
const databaseClient = require("./client");

function databaseControllerUpdate(update, options = {}) {
  function handleError(error) {
    if (!options.ignoreThrowError) throw new Error(error);
    return { success: false, message: error };
  }

  if (!isObject(update)) {
    return handleError("Update must be an object.");
  } else if (!update.id) {
    return handleError("Update requires an id.");
  } else {
    const store = databaseClient.read() || [];

    const documentIndex = store.findIndex((doc) => doc.id === update.id);

    if (documentIndex === -1) {
      return handleError(`Document with id ("${update.id}") does not exist.`);
    } else {
      const previous_document = clone(store[documentIndex]);

      const updated_document = {
        ...store[documentIndex],
        ...update,
        updated_at: new Date().getTime(),
      };

      store[documentIndex] = updated_document;

      databaseClient.write(store);

      return {
        success: true,
        message: "Updated.",
        previous_document,
        updated_document,
      };
    }
  }
}

module.exports = databaseControllerUpdate;
