/*
 * jsontxt is a simple in-memory client that stores json in a .txt file located in the project's root folder.
 *   It's only used here for demonstration purposes.
 */

const databaseClient = require("jsontxt");
const util = require("../util");

if (!databaseClient.read()) {
  databaseClient.write([]);
}

util.log.jsontxt("Client initialized.");

module.exports = databaseClient;

// https://www.npmjs.com/package/jsontxt
