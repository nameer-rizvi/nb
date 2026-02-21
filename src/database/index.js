const database = {
  client: require("./client"),
  collection: {
    error: { add: require("./collection.error.add") },
    json: require("./collection.json"),
  },
};

module.exports = database;
