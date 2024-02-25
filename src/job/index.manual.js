const constant = require("../constant");
const job = require("./job")[constant.job_name];

if (!job) {
  throw new Error(`Job is undefined ("JOB=${constant.job_name || ""}").`);
}

job(() => process.exit());
