const utils = require("@nameer/utils");
const log = require("./log");

function delay(ms, callback) {
  return utils.delay(ms, function onDelay() {
    log.util(`delayed ("${ms.toLocaleString()}ms")`);
    if (callback) callback();
  });
}

module.exports = delay;
