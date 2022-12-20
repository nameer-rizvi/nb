const util = require("../util");

// Mock todo job.

function todo(processExit) {
  setTimeout(() => {
    util.log.bot("Starting job...");
  }, 100);

  setTimeout(() => {
    util.log.bot("Doing job...");
  }, 250);

  setTimeout(() => {
    util.log.bot("Finished job.");
  }, 1000);

  setTimeout(() => {
    if (processExit) processExit();
  }, 1200);
}

module.exports = todo;
