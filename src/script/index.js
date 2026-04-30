const config = require("../config");
const util = require("../util");
const database = require("../database");

async function script() {
  for (const name of config.script) {
    try {
      util.log.script(`started ("${name}")`);
      await require(`./${name}`)();
      util.log.script(`completed ("${name}")`);
    } catch (error) {
      util.log.script(`errored ("${name}"): ${error}`, "error");
      await database.controller.error.add(error);
    } finally {
      util.log.script(`finished ("${name}")`);
    }
  }
  process.exit(0);
}

script();
