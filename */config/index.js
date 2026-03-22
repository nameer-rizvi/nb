const workers = require("./workers");

const config = {
  appNameShort: "nb",
  appVersion: "1",
  worker: workers.find,
  workers: workers.configs,
  workerCronjobs: workers.cronjobs,
  workerJobs: workers.jobs,
};

module.exports = config;
