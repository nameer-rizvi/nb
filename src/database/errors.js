const config = require("../config");
const util = require("../util");
const client = require("./_client");

const collection = "error";

async function add(...errors) {
  const records = [];

  for (let error of errors) {
    if (typeof error === "string") {
      records.push({ collection, message: error });
      continue;
    }

    if (typeof error === "object") {
      if (error instanceof Error) {
        error = Object.getOwnPropertyNames(error).reduce((reducer, key) => {
          return { ...reducer, [key]: error[key] };
        }, {});
      }

      if (typeof error.stack === "string") {
        error.stack = error.stack
          .split("\n")
          .map((i) => i.trim())
          .filter(Boolean);
        if (error.stack[0]?.includes("Error")) error.stack.shift();
      }

      records.push({ collection, ...error });

      continue;
    }
  }

  if (!config.nodeEnvInProduction) await cut();

  util.log.database(`add errors ("${records.length}")`);

  return client.add(...records);
}

async function cut() {
  util.log.database('cut errors ("ALL")');
  return client.cut({ collection });
}

module.exports = { add, cut };
