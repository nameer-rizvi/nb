const database = {
  client: require("./client"),
  collection: require("./collection.json"),
  controller: {
    error: {
      add: require("./controller.error.add"),
      cut: require("./controller.error.cut"),
    },
  },
};

module.exports = database;
