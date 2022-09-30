const { log: generateLogger } = require("simpul");

// keyEmojis can add/overwrite methods "[ { key: "fail", emoji: "🚨" }, ...]"

const keyEmojis = [];

const logEnvConfig = { ignoreEnvironment: true }; // ...ignoreNonCriticalLogs: true, flags: ["minimal"],

const log = generateLogger(keyEmojis, logEnvConfig);

module.exports = log;
