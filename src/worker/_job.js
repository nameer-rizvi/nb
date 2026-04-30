const util = require("../util");
const database = require("../database");

async function job(...jobs) {
  for (const name of jobs) {
    try {
      util.log.job(`started ("${name}")`);
      await require(`./${name}`)();
      util.log.job(`completed ("${name}")`);
    } catch (error) {
      util.log.job(`errored ("${name}"): ${error}`, "error");
      await database.controller.error.add(error);
    } finally {
      util.log.job(`finished ("${name}")`);
    }
  }
}

module.exports = job;
