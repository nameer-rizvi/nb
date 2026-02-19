const database = {
  client: require("./_client"),
  collection: require("./_collection"),
  error: {
    add: require("./error.add"),
    cut: require("./error.cut"),
  },
};

module.exports = database;
