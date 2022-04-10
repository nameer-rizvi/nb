const { log } = require("../../util");

// Mock todo microservice.

function todo(processExit) {
  setTimeout(() => {
    log.bot("Starting job...");
  }, 100);

  setTimeout(() => {
    log.bot("Doing job...");
  }, 250);

  setTimeout(() => {
    log.bot("Finished job.");
  }, 1000);

  setTimeout(() => {
    if (processExit) processExit();
  }, 1200);
}

module.exports = todo;
