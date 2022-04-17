const databaseController = {
  client: require("./client"),
  controller: {
    document: {
      create: require("./controller.document.create"),
      delete: require("./controller.document.delete"),
      read: require("./controller.document.read"),
      update: require("./controller.document.update"),
    },
  },
};

module.exports = databaseController;
