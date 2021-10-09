require("dotenv").config();

const constant = {
  isEnv: require("./isEnv"),
  secret: require("./secret"),
};

module.exports = constant;
