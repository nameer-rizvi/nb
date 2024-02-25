const databaseClient = require("./client");
const dottpath = require("dottpath");
const simpul = require("simpul");

function databaseControllerDocumentUpdate(update, options = {}) {
  function handleError(error) {
    if (!options.ignoreThrowError) throw new Error(error);
    return { success: false, message: error };
  }

  if (!simpul.isObject(update)) {
    return handleError("Update must be an object.");
  } else if (!update.id) {
    return handleError("Update requires an id.");
  } else {
    const store = databaseClient.read();

    const documentIndex = store.findIndex((doc) => doc.id === update.id);

    if (documentIndex === -1) {
      return handleError(`Document with id ("${update.id}") does not exist.`);
    } else {
      const previous_document = simpul.clone(store[documentIndex]);

      const updated_document = { ...store[documentIndex], ...update };

      const ignoreKeyDiffs = ["history", "created_at", "updated_at"];

      const diffs = dottpath.diffs(
        previous_document,
        updated_document,
        ignoreKeyDiffs,
      );

      const updatesExist = diffs.length;

      if (updatesExist) {
        updated_document.history = [
          ...(updated_document.history || []),
          ...diffs,
        ];

        updated_document.updated_at = new Date().getTime();

        store[documentIndex] = updated_document;

        databaseClient.write(store);

        return {
          success: true,
          message: "Updated.",
          previous_document,
          updated_document,
        };
      }

      return {
        success: true,
        message: "No updates detected.",
        document: previous_document,
      };
    }
  }
}

module.exports = databaseControllerDocumentUpdate;
