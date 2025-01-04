const config = require("../config");

/*
 * Sync vs. Async Logging:
 * 1. For synchronous functions, use past tense verbs to indicate successful completion (e.g., "cleaned ...").
 * 2. For asynchronous functions, log both the progress and outcome (e.g., "... starting", "... success", "... finished").
 */

function decorator(emoji, defaultType = "log") {
  return function method(message, type = defaultType) {
    const datetime = new Date().toLocaleString().replace(",", "");
    console[type](`${datetime} - ${emoji} ${message}.`);
  };
}

const log = {
  cronjob: decorator("⏰ Cronjob"),
  database: decorator("🗄  Database"),
  env: decorator("🌐 Environment"),
  fetch: decorator("🐶 Fetch"),
  job: decorator("👷🏽‍♂️ Job"),
  mailer: decorator("📧 Mailer"),
  request: decorator("🛰️ "),
  script: decorator("▶️  Script"),
  server: decorator("📡 Server"),
  util: decorator("🔧 Util"),
  warning: decorator("⚠️  Warning:", "warn"),
};

if (config.nodeEnv?.length) {
  log.env(`in ${config.nodeEnv}`);
} else {
  log.warning("NODE_ENV is undefined");
}

module.exports = log;

// https://developer.mozilla.org/en-US/docs/Web/API/console
