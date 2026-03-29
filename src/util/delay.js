const simpul = require("simpul");
const log = require("./log");

function delay(ms, callback) {
  return simpul.delay(ms, function onDelay() {
    log.util(`delayed ("${ms.toLocaleString()}ms")`);
    if (callback) callback();
  });
}

module.exports = delay;
