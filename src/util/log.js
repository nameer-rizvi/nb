const simpul = require("simpul");

// keyEmojis can add/overwrite methods "[ { key: "fail", emoji: "🚨" }, ...]"

const keyEmojis = [];

module.exports = simpul.log(keyEmojis, { ignoreEnvironment: true }); // ...ignoreNonCriticalLogs: true, flags: ["minimal"],
