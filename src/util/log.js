const simpul = require("simpul");

const keyEmojis = []; // keyEmojis can add/overwrite methods: "[ { key: "fail", emoji: "🚨" }, ...]"

module.exports = simpul.log(keyEmojis, { ignoreEnvironment: true });

// https://github.com/nameer-rizvi/simpul/blob/master/src/log.js
