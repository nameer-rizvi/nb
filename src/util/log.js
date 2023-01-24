const simpul = require("simpul");

const keyEmojis = []; // keyEmojis can add/overwrite methods: "[ { key: "fail", emoji: "🚨" }, ...]"

module.exports = simpul.log(keyEmojis, { ignoreEnvironment: true }); // ...ignoreNonCriticalLogs: true, flags: ["minimal"],
