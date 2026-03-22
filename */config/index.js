const workers = require("./workers");

const config = {
  worker: workers.find,
  workers: workers.configs,
  workerCronjobs: workers.cronjobs,
  workerJobs: workers.jobs,
};

module.exports = config;
