const element = require("./element");
const theme = require("./theme");

/*
 * <main />
 */

function main(children, attrs = {}) {
  if (!children) return "";
  return element("main", { ...attrs, children });
}

function main_1(children, attrs = {}) {
  attrs.class = ["flex", "min-h-screen", "min-w-screen", attrs.class];
  return main(children, attrs);
}

/*
 * <div />
 */

function div(children, attrs = {}) {
  if (!children) return "";
  return element("div", { ...attrs, children });
}

function div_1(children, attrs = {}) {
  return div(children, {
    ...attrs,
    style: {
      padding: "2rem",
      backgroundColor: theme.color.light.background,
      ...attrs.style,
    },
  });
}

function div_2(children, attrs = {}) {
  return div(children, {
    ...attrs,
    style: {
      maxWidth: "35rem",
      padding: "2rem 1.5rem",
      margin: "auto",
      borderRadius: "0.5rem",
      backgroundColor: theme.color.light.foreground,
      fontFamily: theme.fontFamily.sans,
      ...attrs.style,
    },
  });
}

function div_3(children, attrs = {}) {
  attrs.class = ["flex", "w-full", "flex-row", "items-center"];
  attrs.class.push("justify-center", attrs.class);
  return div(children, attrs);
}

/*
 * <h1 />
 */

function h1(children, attrs = {}) {
  if (!children) return "";
  return element("h1", { ...attrs, children });
}

function h1_1(children, attrs = {}) {
  attrs.class = ["font-extrabold", "text-3xl", attrs.class];
  return h1(children, attrs);
}

/*
 * <p />
 */

function p(children, attrs = {}) {
  if (!children) return "";
  return element("p", { ...attrs, children });
}

module.exports = { main, main_1, div, div_1, div_2, div_3, h1, h1_1, p };
