const util = require("../util");
const client = require("./client");
const collection = require("./collection.json").error;

async function databaseControllerErrorGet(...records) {
  if (records.length) {
    util.log.database(`get error ("${records.length}")`);
    return client.get(...records);
  } else {
    util.log.database('get error ("ALL")');
    return client.get({ collection });
  }
}

module.exports = databaseControllerErrorGet;
