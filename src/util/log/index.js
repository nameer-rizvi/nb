const { log: generateLogger } = require("simpul");
const constant = require("../../constant");

const log = generateLogger(undefined, {
  ignoreNonCriticalLogs: constant.ignoreNonCriticalLogs,
});

module.exports = log;
