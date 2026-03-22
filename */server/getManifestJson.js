const config = require("../../config");
const ui = require("../../ui");

// Manifest.json gives the app PWA capabilities which allows it to be installed in the user's host machine.
function getManifestJson(req, res) {
  res.json({
    id: "/",
    name: config.appName,
    short_name: config.appNameShort,
    description: config.appDescription,
    categories: config.appCategories,
    start_url: "/",
    display: "standalone",
    lang: config.appLang,
    dir: "ltr",
    orientation: "portrait-primary",
    theme_color: ui.theme.color.light.themeColor,
    background_color: ui.theme.color.light.background,
    related_applications: [],
    prefer_related_applications: false,
    screenshots: [],
    icons: [
      {
        src: "/static/img/maskable-320x320.png",
        sizes: "320x320",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/static/img/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/static/img/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    ...req.query,
  });
}

module.exports = getManifestJson;

/*
 * MDN's manifest guide:
 * https://developer.mozilla.org/en-US/docs/Web/Manifest
 * https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
 *
 * Webpack pwa manifest repo:
 * https://github.com/arthurbergmz/webpack-pwa-manifest
 *
 * Create-react-app's manifest.json:
 * https://github.com/react-cosmos/create-react-app-example/blob/master/public/manifest.json
 *
 * For W3C's category list:
 * https://github.com/w3c/manifest/wiki/Categories
 *
 * Information on id property:
 * https://developer.chrome.com/docs/capabilities/pwa-manifest-id
 */
