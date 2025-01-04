require("dotenv").config();
const routes = require("./routes");
const workers = require("./workers");

const config = {
  appAuthor: "",
  appCategories: [],
  appDescription: "",
  appLang: "en-US",
  appName: "nb",
  appNameShort: "nb",
  appVersion: "1",
  dictionary: require("./dictionary"),
  emailAddress: process.env.EMAIL_ADDRESS,
  emailPassword: process.env.EMAIL_PASSWORD,
  emailService: process.env.EMAIL_SERVICE,
  jwtSecret: process.env.JWT_SECRET,
  nanoidSize: +process.env.NANOID_SIZE || 3,
  nodeEnv: process.env.NODE_ENV,
  nodeEnvInDevelopment: process.env.NODE_ENV === "development",
  nodeEnvInMaintenance: process.env.MAINTENANCE_MODE === "true",
  nodeEnvInProduction: process.env.NODE_ENV === "production",
  nodePort: +process.env.PORT || 3000,
  redisConnectRetries: +process.env.REDIS_CONNECT_RETRIES || 5,
  redisConnectTimeout: +process.env.REDIS_CONNECT_TIMEOUT || 10000,
  redisKey: "nb:db",
  redisUrl: process.env.REDIS_URL,
  route: routes.find,
  routes: routes.configs,
  routesDisallowed: routes.disallow,
  urlLocalhost: "http://127.0.0.1",
  urlWebsite: process.env.WEBSITE,
  worker: workers.find,
  workers: workers.configs,
  workerCronjobs: workers.cronjobs,
  workerJobs: workers.jobs,
};

if (!config.nodeEnv) {
  throw new Error("NODE_ENV is undefined.");
}

if (!config.jwtSecret) {
  throw new Error("JWT_SECRET is undefined.");
}

config.urlLocalhost += ":" + config.nodePort;

module.exports = config;

// https://www.npmjs.com/package/dotenv
