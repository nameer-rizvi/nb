const config = require("../config");
const element = require("./element");
const theme = require("./theme");
const simpul = require("simpul");

function html(options = {}) {
  /*
   * <head />
   */

  // title

  const t = options.title
    ? options.title
    : options.title2
    ? [options.title2, config.appName].join(" - ")
    : config.appName;

  // description

  const d = options.description
    ? options.description
    : t === config.appName
    ? config.appDescription
    : "";

  // keywords

  const k = options.keywords || options.categories || [];

  // author

  const a = options.author
    ? options.author
    : t === config.appName
    ? config.appAuthor
    : "";

  const charset = element("meta", { charset: "UTF-8" });

  const viewport = element("meta", {
    name: "viewport",
    content: { width: "device-width", initialScale: "1.0" },
  });

  const title = t && element("title", { children: t });

  const description = d && element("meta", { name: "description", content: d });

  const keywords =
    k.length && element("meta", { name: "keywords", content: k });

  const author = a && element("meta", { name: "author", content: a });

  const robots = element("meta", {
    name: "robots",
    content: options.robots ? ["index", "follow"] : ["noindex", "nofollow"],
  });

  const themeColorLight = element("meta", {
    name: "theme-color",
    media: "(prefers-color-scheme: light)",
    content: theme.color.light.themeColor,
  });

  const themeColorDark = element("meta", {
    name: "theme-color",
    media: "(prefers-color-scheme: dark)",
    content: theme.color.dark.themeColor,
  });

  const icon48 = element("link", {
    rel: "icon",
    type: "image/x-icon",
    href: "/static/img/favicon.ico",
  });

  const icon32 = element("link", {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/static/img/favicon-32x32.png",
  });

  const icon16 = element("link", {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/static/img/favicon-16x16.png",
  });

  const iconApple = element("link", {
    rel: "apple-touch-icon",
    type: "image/png",
    sizes: "180x180",
    href: "/static/img/apple-touch-icon.png",
  });

  const stylesheet = element("link", {
    rel: "stylesheet",
    href: "/static/css/tw.css",
  });

  const manifestQuery = options.manifest
    ? "?" + new URLSearchParams(options.manifest)
    : "";

  const manifest =
    options.manifest !== false &&
    element("link", {
      rel: "manifest",
      href: `/manifest.json${manifestQuery}`,
    });

  const canonical =
    options.canonical &&
    element("link", { rel: "canonical", href: options.canonical });

  const head = element("head", {
    children: [
      charset,
      viewport,
      title,
      description,
      keywords,
      author,
      robots,
      themeColorLight,
      themeColorDark,
      icon48,
      icon32,
      icon16,
      iconApple,
      stylesheet,
      manifest,
      canonical,
      ...(options.head || []),
    ],
  });

  /*
   * <body />
   */

  const jsNote = element("noscript", {
    children: "You need to enable JavaScript to run this app.",
  });

  const scripts = [];

  if (simpul.isObject(options.script)) {
    scripts.push(element("script", options.script));
  } else if (simpul.isArray(options.script)) {
    for (const script of options.script) {
      if (simpul.isObject(script)) {
        scripts.push(element("script", script));
      }
    }
  }

  if (options.sw !== false) {
    scripts.push(
      element("script", { defer: true, src: "/static/js/sw-register.js" }),
    );
  }

  const body = element("body", {
    children: [jsNote, options.body, ...scripts],
  });

  /*
   * <html />
   */

  const html = element("html", {
    lang: config.appLang,
    dir: "ltr",
    children: [head, body],
  });

  const docType = element("!DOCTYPE", {
    html: true,
  });

  return [docType, html].join("");
}

module.exports = html;

// https://developers.google.com/search/docs
// https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
