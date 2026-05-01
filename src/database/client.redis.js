const redis = require("redis");
const config = require("../config");
const util = require("../util");

const databaseClientRedis = redis.createClient({
  url: config.redisUrl,
  socket: { connectTimeout: config.redisConnectTimeout, reconnectStrategy },
});

databaseClientRedis.on("connect", function onClientConnect() {
  util.log.database("redis client connecting..");
});

databaseClientRedis.on("ready", function onClientReady() {
  util.log.database("redis client connected");
});

databaseClientRedis.on("reconnecting", function onClientReconnecting() {
  util.log.database("redis client reconnecting..");
});

databaseClientRedis.on(
  "sharded-channel-moved",
  function onClientShardedChannelMoved() {
    util.log.database("redis client moved");
  },
);

databaseClientRedis.on("end", function onClientEnd() {
  util.log.database("redis client disconnected");
});

databaseClientRedis.on("invalidate", function onClientInvalidate() {
  util.log.database("redis client invalidated");
});

databaseClientRedis.on("error", function onClientError(err) {
  let message = `redis client error ("${err}")`;
  if (err.code === "ECONNREFUSED") message += ": server not running";
  util.log.database(message, "error");
});

function reconnectStrategy(retries, cause) {
  if (cause instanceof redis.SocketTimeoutError) {
    return false; // Do not reconnect on socket timeout.
  } else if (retries + 1 >= config.redisConnectRetries) {
    return new RangeError("Too many retries.");
  } else {
    return (retries + 1) * 500; // Incremental delay.
  }
}

module.exports = databaseClientRedis;

// https://redis.io/docs/latest/develop/clients/nodejs/
// https://github.com/redis/node-redis/blob/master/docs/client-configuration.md
