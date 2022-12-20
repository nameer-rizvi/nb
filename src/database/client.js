// jsontxt is a simple in-memory client that stores json in a .txt file located in the project's root folder.
//   It's only used here for demonstration purposes.

const jsontxt = require("jsontxt");
const util = require("../util");

let databaseClient = {};

const FILENAME = `json_${process.env.NODE_ENV}`;

const INITIAL_STATE = [];

databaseClient.filename = FILENAME;

databaseClient.initialState = INITIAL_STATE;

databaseClient.delete = (option, callback) =>
  jsontxt.delete({ ...option, filename: FILENAME }, callback);

databaseClient.read = (option, callback) =>
  jsontxt.read({ ...option, filename: FILENAME }, callback);

databaseClient.write = (json = INITIAL_STATE, option, callback) =>
  jsontxt.write(json, { ...option, filename: FILENAME }, callback);

if (!databaseClient.read()) {
  databaseClient.write();
  util.log.jsontxt("Initialized Jsontxt file with initial state.");
} else util.log.jsontxt("Initialized Jsontxt");

module.exports = databaseClient;

// https://www.npmjs.com/package/jsontxt
