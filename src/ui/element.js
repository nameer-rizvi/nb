const simpul = require("simpul");

function element(tagName, props = {}) {
  const { children: _children, render, json, js, ...attrs } = props;

  const children = simpul.isArray(_children)
    ? simpul.trim(_children.filter(simpul.isString).join(""))
    : simpul.isString(_children)
    ? simpul.trim(_children)
    : "";

  if (simpul.isArray(tagName)) {
    return tagName.map((config) => element(...config)).join("");
  } else if (!simpul.isStringValid(tagName)) {
    throw new TypeError("Element tag name is not a valid string.");
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
    return `<script${attributes(attrs)}>(${js.toString()})()</script>`;
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
    if (simpul.isObject(rules)) {
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
    if (simpul.isObject(value)) {
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
      arr.push(`${simpul.changecase.camelCase(key)}="${value}()"`);
    } else if (key === "class" && simpul.isArray(value)) {
      const v = value.flat().filter(simpul.isString).join(" ");
      arr.push(`${transformKey(key)}="${transformValue(v)}"`);
    } else if (key === "style" && simpul.isObject(value)) {
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
  return simpul.changecase.snakeCase(k).replace(/_/g, "-");
}

function transformValue(v = "") {
  if (simpul.isObject(v)) {
    let pairs = [];
    for (const [key, value] of Object.entries(v))
      pairs.push(`${transformKey(key)}=${value}`);
    return pairs.join(",");
  } else {
    return v.toString().replace(/[&<>"']/g, function handle(char) {
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
  if (simpul.isArray(json) ? json.some(isSchema) : isSchema(json)) {
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
