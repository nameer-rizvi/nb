const config = require("../config");
const element = require("./element");
const theme = require("./theme");
const simpul = require("simpul");

function html(options = {}) {
  /*
   * <head />
   */

  // values

  const title =
    options.title ||
    (options.title2 && [options.title2, config.appName].join(" - ")) ||
    config.appName;

  const description = options.description || config.appDescription;

  const keywords = options.keywords || options.categories;

  const author = options.author || config.appAuthor;

  const index = options.index === false ? "noindex" : "index";

  const follow = options.follow === false ? "nofollow" : "follow";

  // elements

  const charset = element("meta", { charset: "utf-8" });

  const viewport = element("meta", {
    name: "viewport",
    content: { width: "device-width", initialScale: "1.0" },
  });

  const documentTitle = title ? element("title", { children: title }) : "";

  const metaDescription = description
    ? element("meta", { name: "description", content: description })
    : "";

  const metaKeywords = keywords?.length
    ? element("meta", { name: "keywords", content: keywords })
    : "";

  const metaAuthor = author
    ? element("meta", { name: "author", content: author })
    : "";

  const robots = element("meta", { name: "robots", content: [index, follow] });

  const themeColorLight = theme?.color?.light?.themeColor
    ? element("meta", {
        name: "theme-color",
        media: "(prefers-color-scheme: light)",
        content: theme.color.light.themeColor,
      })
    : "";

  const themeColorDark = theme?.color?.dark?.themeColor
    ? element("meta", {
        name: "theme-color",
        media: "(prefers-color-scheme: dark)",
        content: theme.color.dark.themeColor,
      })
    : "";

  // TODO
  // const icon48 = element("link", {
  //   rel: "icon",
  //   type: "image/x-icon",
  //   href: "/static/img/favicon.ico",
  // });
  // const icon32 = element("link", {
  //   rel: "icon",
  //   type: "image/png",
  //   sizes: "32x32",
  //   href: "/static/img/favicon-32x32.png",
  // });
  // const icon16 = element("link", {
  //   rel: "icon",
  //   type: "image/png",
  //   sizes: "16x16",
  //   href: "/static/img/favicon-16x16.png",
  // });
  // const iconApple = element("link", {
  //   rel: "apple-touch-icon",
  //   type: "image/png",
  //   sizes: "180x180",
  //   href: "/static/img/apple-touch-icon.png",
  // });
  // const stylesheet = element("link", {
  //   rel: "stylesheet",
  //   href: "/static/css/tw.css",
  // });
  // const manifestQuery = options.manifest
  //   ? "?" + new URLSearchParams(options.manifest)
  //   : "";
  // const manifest =
  //   options.manifest !== false &&
  //   element("link", {
  //     rel: "manifest",
  //     href: `/manifest.json${manifestQuery}`,
  //   });

  const canonical = options.canonical
    ? element("link", { rel: "canonical", href: options.canonical })
    : "";

  const head = element("head", {
    children: [
      charset,
      viewport,
      documentTitle,
      metaDescription,
      metaKeywords,
      metaAuthor,
      robots,
      themeColorLight,
      themeColorDark,
      // icon48,
      // icon32,
      // icon16,
      // iconApple,
      // stylesheet,
      // manifest,
      canonical,
      ...(options.head || []),
    ],
  });

  /*
   * <body />
   */

  const scripts = [];

  if (simpul.isObject(options.script)) {
    scripts.push(element("script", options.script));
  } else if (simpul.isArray(options.script)) {
    for (const script of options.script) {
      if (simpul.isObject(script)) scripts.push(element("script", script));
    }
  }

  // TODO
  // if (options.sw !== false) {
  //   const sw = element("script", {
  //     defer: true,
  //     src: "/static/js/sw-register.js",
  //   });
  //   scripts.push(sw);
  // }

  const jsNote = scripts.length
    ? element("noscript", {
        children: "You need to enable JavaScript to run this app.",
      })
    : "";

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

  const docType = element("!DOCTYPE", { html: true });

  return [docType, html].join("");
}

module.exports = html;

// https://developers.google.com/search/docs
// https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
