const asset = require("../../asset");

// Send client a 200 ("OK") status with the favicon asset file.

const routeFavicon = (req, res) => res.sendFile(asset.favicon);

module.exports = routeFavicon;
