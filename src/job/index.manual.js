const constant = require("../constant");
const job = require("./job")[constant.process_job];

if (!job) {
  throw new Error(`Job is undefined ("JOB=${constant.process_job || ""}").`);
}

job(() => process.exit());
