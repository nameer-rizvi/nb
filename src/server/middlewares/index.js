const middlewares = {
  api: [
    require("./locals"),
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
  public: [require("./locals")],
  static: [require("./sw")],
};

module.exports = middlewares;
