const { isString } = require("simpul");
const databaseClient = require("./client");

function databaseControllerDocumentDelete(id, options = {}) {
  if (!isString(id)) {
    const error = "Document id must be a string.";

    if (!options.ignoreThrowError) throw new Error(error);

    return { success: false, message: error };
  } else {
    const store = databaseClient.read();

    const documentIndex = store.findIndex((doc) => doc.id === id);

    const deletedDocument = store[documentIndex];

    if (documentIndex !== -1) store.splice(documentIndex, 1);

    databaseClient.write(store);

    return {
      success: true,
      message: "Deleted.",
      index: documentIndex,
      deleted_document: deletedDocument,
    };
  }
}

module.exports = databaseControllerDocumentDelete;
