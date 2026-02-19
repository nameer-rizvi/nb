const util = require("../util");
const database = require("../database");

const index = {};

async function script() {
  for (const name of (process.env.SCRIPT || "").split(",").filter(Boolean)) {
    if (index[name]) {
      try {
        util.log.script(`started ("${name}")`);
        await index[name]();
        util.log.script(`completed ("${name}")`);
      } catch (error) {
        util.log.script(`errored ("${name}"): ${error}`, "error");
        await database.error.add(error);
      } finally {
        util.log.script(`finished ("${name}")`);
      }
    } else {
      util.log.script(`is undefined ("${name}")`, "warn");
    }
  }
  process.exit();
}

script();
