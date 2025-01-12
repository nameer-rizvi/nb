const util = require("../util");
const database = require("../database");

const index = {
  generateSitemapUrls: require("./generateSitemapUrls"),
};

async function job(...jobs) {
  for (const name of jobs) {
    if (index[name]) {
      try {
        util.log.job(`started ("${name}")`);
        await index[name]();
        util.log.job(`completed ("${name}")`);
      } catch (error) {
        util.log.job(`errored ("${name}"): ${error}`, "error");
        await database.error.add(error);
      } finally {
        util.log.job(`finished ("${name}")`);
      }
    } else {
      util.log.job(`is undefined ("${name}")`, "warn");
    }
  }
}

module.exports = job;
