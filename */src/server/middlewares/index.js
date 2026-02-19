const middlewares = {
  api: [
    require("./locals"),
    require("./authenticate"),
    require("./parsers"),
    require("./validation"),
  ],
  app: [
    require("./logger"),
    require("./redirect"),
    require("./cors"),
    require("./helmet"),
    require("./compression"),
  ],
  public: [require("./status"), require("./locals")],
  static: [require("./sw")],
};

module.exports = middlewares;
