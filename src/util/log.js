const config = require("../config");

function createLogger(title, defaultType = "log") {
  return function logger(message, type = defaultType) {
    const datetime = new Date().toLocaleString().replace(",", "");
    console[type](`${datetime} - ${title} ${message}.`);
  };
}

const log = Object.freeze({
  database: createLogger("🗄  Database"),
  env: createLogger("🌐 Environment"),
  fetch: createLogger("🐶 Fetch"),
  mailer: createLogger("📧 Mailer"),
  request: createLogger("🛰️ "),
  script: createLogger("▶️  Script"),
  server: createLogger("📡 Server"),
  util: createLogger("🔧 Util"),
  // todo
  // cronjob: createLogger("⏰ Cronjob"),
  // job: createLogger("👷🏽‍♂️ Job"),
  // warning: createLogger("⚠️  Warning:", "warn"),
});

log.env(`in ${config.nodeEnv}`);

module.exports = log;

// https://developer.mozilla.org/en-US/docs/Web/API/console
