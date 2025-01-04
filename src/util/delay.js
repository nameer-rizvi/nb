const simpul = require("simpul");
const log = require("./log");

function delay(ms) {
  return simpul.delay(ms, function onDelay() {
    log.util(`delayed ("${ms.toLocaleString()}ms")`);
  });
}

module.exports = delay;
