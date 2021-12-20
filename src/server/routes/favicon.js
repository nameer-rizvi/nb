const asset = require("../../asset");

// Send client a 200 ("OK") status with the favicon asset file.

const routeAppFavicon = (req, res) => res.sendFile(asset.favicon);

module.exports = routeAppFavicon;
