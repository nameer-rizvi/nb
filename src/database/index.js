const databaseController = {
  create: require("./controller.create"),
  read: require("./controller.read"),
  update: require("./controller.update"),
  delete: require("./controller.delete"),
};

module.exports = databaseController;
