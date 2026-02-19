const collection = require("./_collection");
const util = require("../util");
const config = require("../config");
const errorCut = require("./error.cut");
const client = require("./_client");

async function errorAdd(...errors) {
  const records = [];

  for (let error of errors) {
    if (typeof error === "string") {
      records.push({ collection: collection.error, message: error });
      continue;
    }

    if (typeof error === "object" && error.message) {
      error = Object.getOwnPropertyNames(error).reduce((reducer, key) => {
        return { ...reducer, [key]: error[key] };
      }, {});

      if (typeof error.stack === "string") {
        error.stack = error.stack.split("\n").map((i) => i.trim());
        error.stack = error.stack.filter(Boolean);
        if (error.stack[0]?.includes("Error")) error.stack.shift();
      }

      records.push({ collection: collection.error, ...error });

      continue;
    }

    util.log.database(`invalid error ("${error}")`, "warn");
  }

  if (!config.nodeEnvInProduction) await errorCut();

  util.log.database(`add error ("${records.length}")`);

  return client.add(...records);
}

module.exports = errorAdd;
