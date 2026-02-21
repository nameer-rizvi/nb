const config = require("../config");

function decorator(title, defaultType = "log") {
  return function method(message, type = defaultType) {
    const datetime = new Date().toLocaleString().replace(",", "");
    console[type](`${datetime} - ${title} ${message}.`);
  };
}

const log = Object.freeze({
  // cronjob: decorator("⏰ Cronjob"),
  database: decorator("🗄  Database"),
  env: decorator("🌐 Environment"),
  // fetch: decorator("🐶 Fetch"),
  // job: decorator("👷🏽‍♂️ Job"),
  // mailer: decorator("📧 Mailer"),
  // request: decorator("🛰️ "),
  script: decorator("▶️  Script"),
  // server: decorator("📡 Server"),
  // util: decorator("🔧 Util"),
  // warning: decorator("⚠️  Warning:", "warn"),
});

log.env(`in ${config.nodeEnv}`); // Error will throw if node environment is not defined.

module.exports = log;

// https://developer.mozilla.org/en-US/docs/Web/API/console
