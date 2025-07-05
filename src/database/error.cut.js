const util = require("../util");
const client = require("./_client");
const collection = require("./_collection");

async function errorCut(...records) {
  if (records.length) {
    util.log.database(`cut error ("${records.length}")`);
    return client.cut(...records);
  } else {
    util.log.database('cut error ("ALL")');
    return client.cut({ collection: collection.error });
  }
}

module.exports = errorCut;
