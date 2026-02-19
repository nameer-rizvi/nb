const redis = require("redis");
const config = require("../config");
const util = require("../util");

const client = redis.createClient({
  url: config.redisUrl,
  connectTimeout: config.redisConnectTimeout,
  socket: { reconnectStrategy },
});

client.on("connect", function onClientConnect() {
  util.log.database("redis client connected");
});

client.on("disconnect", function onClientDisconnect() {
  util.log.database("redis client disconnected");
});

client.on("error", function onClientError(err) {
  let message = `redis client error ("${err}")`;
  if (err.code === "ECONNREFUSED") message += ": server not running";
  util.log.database(message, "error");
});

function reconnectStrategy(retries) {
  if (retries >= config.redisConnectRetries) {
    return new RangeError("Too many retries.");
  } else {
    return retries * 500; // incremental delay
  }
}

module.exports = client;

// https://redis.io/docs/latest/develop/connect/clients/nodejs/
