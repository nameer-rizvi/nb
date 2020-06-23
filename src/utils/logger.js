const { logti } = require("simpul");

module.exports = (msg) =>
  Object.keys(msg).forEach((key) => {
    const emoji =
      key === "s" ? "✅" : key === "e" ? "❌" : key === "w" ? "⚠️ " : "";
    const env = process.env.NODE_ENV;
    const environment = env ? ` [${env}]` : "";
    logti(`${emoji}${environment} ${msg[key]}`);
  });
