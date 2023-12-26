require("dotenv").config();
const job = require("./job")[process.env.JOB];

if (!job) {
  throw new Error(`Job is undefined ("JOB=${process.env.JOB || ""}").`);
}

job(() => process.exit());
