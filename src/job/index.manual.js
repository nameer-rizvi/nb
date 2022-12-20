require("dotenv").config();
const job = require("./job")[process.env.JOB];

if (!job) {
  console.error(new Error(`Job is undefined ("JOB=${process.env.JOB}").`));
  process.exit();
}

job(() => process.exit());
