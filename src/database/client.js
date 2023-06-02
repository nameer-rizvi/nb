/*
 * jsontxt is a simple in-memory client that stores json in a .txt file located in the project's root folder.
 *   It's only used here for demonstration purposes.
 */

const databaseClient = require("jsontxt");
const util = require("../util");

if (!databaseClient.read()) {
  const INITIAL_STATE = [];
  databaseClient.write(INITIAL_STATE);
  util.log.jsontxt("Initialized Jsontxt file with initial state.");
} else util.log.jsontxt("Initialized Jsontxt");

module.exports = databaseClient;

// https://www.npmjs.com/package/jsontxt
