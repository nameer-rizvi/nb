const middlewares = {
  api: [
    require("./ctx"),
    require("./authorization"),
    require("./parsers"),
    require("./validation"),
  ],
  app: [
    require("./logger"),
    require("./status"),
    require("./cors"),
    require("./helmet"),
    require("./compression"),
    require("./redirect"),
  ],
  public: [require("./ctx")],
  static: [require("./sw")],
};

module.exports = middlewares;
