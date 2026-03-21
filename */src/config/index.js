const workers = require("./workers");

const config = {
  appNameShort: "nb",
  appVersion: "1",
  timezone: process.env.TZ,
  urlLocalhost: "http://127.0.0.1",
  urlWebsite: process.env.WEBSITE,
  worker: workers.find,
  workers: workers.configs,
  workerCronjobs: workers.cronjobs,
  workerJobs: workers.jobs,
};

if (!config.jwtSecret) {
  throw new ReferenceError("JWT_SECRET is undefined.");
}

config.urlLocalhost += ":" + config.nodePort;

module.exports = config;
