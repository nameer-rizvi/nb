require("dotenv").config({ quiet: true });
const routes = require("./routes");

const config = {
  apiKey: process.env.API_KEY,
  appAuthor: "",
  appCategories: [],
  appDescription: "",
  appLang: "en-US",
  appName: "nb",
  dictionary: require("./dictionary"),
  emailAddress: process.env.EMAIL_ADDRESS,
  emailPassword: process.env.EMAIL_PASSWORD,
  emailService: process.env.EMAIL_SERVICE,
  jwtIss: "nb-" + process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  nanoidSize: +process.env.NANOID_SIZE || 3,
  nodeEnv: process.env.NODE_ENV,
  nodeEnvInDevelopment: process.env.NODE_ENV === "development",
  nodeEnvInMaintenance: process.env.MAINTENANCE_MODE === "true",
  nodeEnvInProduction: process.env.NODE_ENV === "production",
  nodePort: +process.env.PORT || 3000,
  redisConnectRetries: +process.env.REDIS_CONNECT_RETRIES || 5,
  redisConnectTimeout: +process.env.REDIS_CONNECT_TIMEOUT || 10_000,
  redisKey: "nb:db",
  redisUrl: process.env.REDIS_URL,
  route: routes.find,
  routes: routes.configs,
  routesDisallowed: routes.disallow,
  script: (process.env.SCRIPT || "").split(",").filter(Boolean),
  timezone: process.env.TZ,
  urlLocalhost: "http://127.0.0.1",
  urlWebsite: process.env.WEBSITE,
};

if (!config.nodeEnv) {
  throw new TypeError("Missing required environment variable: NODE_ENV");
}

if (!config.jwtSecret) {
  throw new TypeError("Missing required environment variable: JWT_SECRET");
}

if (config.urlLocalhost) {
  config.urlLocalhost += ":" + config.nodePort;
}

module.exports = config;

// https://www.npmjs.com/package/dotenv
