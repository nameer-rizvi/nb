const util = require("../util");
const client = require("./client");
const collection = require("./collection.json").error;

async function databaseControllerErrorCut(...records) {
  if (records.length) {
    util.log.database(`cut error ("${records.length}")`);
    return client.cut(...records);
  } else {
    util.log.database('cut error ("ALL")');
    return client.cut({ collection });
  }
}

module.exports = databaseControllerErrorCut;
