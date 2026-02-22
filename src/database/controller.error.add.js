const collection = require("./collection.json").error;
const util = require("../util");
const config = require("../config");
const databaseControllerErrorCut = require("./controller.error.cut");
const client = require("./client");

async function databaseControllerErrorAdd(...errors) {
  const records = [];

  for (let error of errors) {
    if (typeof error === "string") {
      records.push({ collection, message: error });
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

      records.push({ collection, ...error });

      continue;
    }

    util.log.database(`invalid error ("${error}")`, "warn");
  }

  if (!config.nodeEnvInProduction) await databaseControllerErrorCut();

  util.log.database(`add error ("${records.length}")`);

  return client.add(...records);
}

module.exports = databaseControllerErrorAdd;
