const path = require("path");

const makePath = (destination) => path.join(__dirname, destination);

const asset = {
  favicon: makePath("./favicon.ico"),
};

module.exports = asset;
