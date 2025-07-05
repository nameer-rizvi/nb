const database = {
  client: require("./_client"),
  error: {
    add: require("./error.add"),
    cut: require("./error.cut"),
  },
};

module.exports = database;
