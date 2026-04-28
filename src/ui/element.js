const utils = require("@nameer/utils");

function element(tagName, props = {}) {
  const { children: _children, render, json, js, ...attrs } = props;

  const children = utils.isArray(_children)
    ? utils.trim(_children.filter(utils.isString).join(""))
    : utils.isString(_children)
    ? utils.trim(_children)
    : "";

  delete attrs.mode;

  if (utils.isArray(tagName)) {
    return tagName.map((args) => element(...args)).join("");
  } else if (!utils.isStringNonEmpty(tagName)) {
    throw new TypeError("Element tagName must be a non-empty string.");
  } else if (render === false) {
    return "";
  } else if (tagName === "style") {
    return `<style>${stylesheet(attrs)}</style>`;
  } else if (tagName === "script" && attrs.src) {
    return `<script${attributes(attrs)}></script>`;
  } else if (tagName === "script" && json) {
    if (!attrs.type) attrs.type = getJsonType(json);
    return `<script${attributes(attrs)}>${JSON.stringify(json)}</script>`;
  } else if (tagName === "script" && js) {
    if (!attrs.type) attrs.type = "text/javascript";
    return `<script${attributes(attrs)}>(${String(js)})()</script>`;
  } else if (tags.graph.includes(tagName)) {
    if (tagName === "svg") attrs.xmlns = "http://www.w3.org/2000/svg";
    return `<${tagName}${attributes(attrs)}>${children}</${tagName}>`;
  } else if (tags.self.includes(tagName) && !children.length) {
    const end = tagName.startsWith("?") ? "?" : "";
    return `<${tagName}${attributes(attrs)}${end}>`;
  } else if (children.length) {
    return `<${tagName}${attributes(attrs)}>${children}</${tagName}>`;
  } else {
    return `<${tagName}${attributes(attrs)} />`;
  }
}

function stylesheet(css = {}) {
  const sheet = [];
  for (const [selector, rules] of Object.entries(css)) {
    if (utils.isObject(rules)) {
      sheet.push(`${selector}{${processCss(rules)}}`);
    } else {
      sheet.push(`${transformKey(selector)}:${rules};`);
    }
  }
  return sheet.join(" ");
}

function processCss(rules) {
  const cssRules = [];
  for (const [key, value] of Object.entries(rules)) {
    if (utils.isObject(value)) {
      cssRules.push(`${key}{${processCss(value)}}`);
    } else {
      cssRules.push(`${transformKey(key)}:${value};`);
    }
  }
  return cssRules.join("");
}

function attributes(attrs = {}) {
  const arr = [];
  for (const [key, value] of Object.entries(attrs)) {
    if (value === true) {
      arr.push(transformKey(key));
    } else if (key.startsWith("on") && key.length > 2) {
      arr.push(`${utils.changecase.camelCase(key)}="${value}()"`);
    } else if (key === "class" && utils.isArray(value)) {
      const v = value.flat().filter(utils.isString).join(" ");
      arr.push(`${transformKey(key)}="${transformValue(v)}"`);
    } else if (key === "style" && utils.isObject(value)) {
      let pairs = [];
      for (let [k, v] of Object.entries(value))
        pairs.push(`${transformKey(k)}:${transformValue(v)};`);
      arr.push(`${transformKey(key)}="${pairs.join("")}"`);
    } else {
      arr.push(`${transformKey(key)}="${transformValue(value)}"`);
    }
  }
  return arr.length ? " " + arr.join(" ") : "";
}

function transformKey(k = "") {
  return utils.changecase.paramCase(k);
}

function transformValue(v = "") {
  if (utils.isHTTP(v)) {
    return v;
  } else if (utils.isObject(v)) {
    const pairs = [];
    for (const [key, value] of Object.entries(v))
      pairs.push(`${transformKey(key)}=${value}`);
    return pairs.join(",");
  } else {
    return String(v).replace(/[&<>"']/g, function handle(char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      }[char];
    });
  }
}

function getJsonType(json) {
  if (utils.isArray(json) ? json.some(isSchema) : isSchema(json)) {
    return "application/ld+json";
  } else {
    return "application/json";
  }
}

function isSchema(json) {
  return Boolean(json?.["@context"]?.startsWith("https://schema.org"));
  // https://schema.org/docs/schemas.html
  // https://developers.google.com/search/docs/appearance/structured-data
}

const tags = {
  graph: ["svg", "path", "circle", "rect", "line", "g"],
  self: [
    "!DOCTYPE",
    "?xml",
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "source",
  ],
};

module.exports = element;
