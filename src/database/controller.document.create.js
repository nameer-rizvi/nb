const databaseClient = require("./client");
const simpul = require("simpul");

function databaseControllerDocumentCreate(newDocument, options = {}) {
  if (!simpul.isObject(newDocument)) {
    const error = "Document must be an object.";

    if (!options.ignoreThrowError) throw new Error(error);

    return { success: false, message: error };
  } else {
    const store = databaseClient.read();

    let id = simpul.uid();

    let idIndex = store.findIndex((doc) => doc.id === id);

    while (idIndex !== -1) {
      id = simpul.uid();
      idIndex = store.findIndex((doc) => doc.id === id);
    }

    newDocument.id = id;

    newDocument.history = [];

    const timestamp = new Date().getTime();

    newDocument.created_at = timestamp;

    newDocument.updated_at = timestamp;

    store.push(newDocument);

    databaseClient.write(store);

    return { success: true, message: "Created.", new_document: newDocument };
  }
}

module.exports = databaseControllerDocumentCreate;
