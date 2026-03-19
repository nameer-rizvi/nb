const workers = require("./workers");

const config = {
  apiKey: process.env.API_KEY,
  appNameShort: "nb",
  appVersion: "1",
  dictionary: require("./dictionary"),
  jwtIss: "nb_jwt_" + process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
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
