const { isEnv, log: generateLogger } = require("simpul");

// keyEmojis can add/overwrite methods "[ { key: "fail", emoji: "🚨" }, ...]"

const keyEmojis = [];

const logEnvConfig = isEnv.production
  ? {
      ignoreEnvironment: true,
      ignoreNonCriticalLogs: true,
      flags: ["minimal"],
    }
  : {
      ignoreEnvironment: true,
    };

const log = generateLogger(keyEmojis, logEnvConfig);

module.exports = log;
