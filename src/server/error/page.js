const ui = require("../../ui");

function page(status = 400, message = "Something went wrong") {
  const title = message ? `${status} | ${message}` : String(status);

  const description = message
    ? `Error ${status}: ${message}`
    : `Error ${status}`;

  const keywords = ["error", status];

  const header = ui.component.h1_1(String(status), {
    class: message ? ["pr-3 mr-3 border-r"] : undefined,
  });

  const paragraph = message ? ui.component.p(message) : "";

  const container = ui.component.div_3([header, paragraph]);

  const statusText = ui.component.p(" ", {
    id: "status",
    style: {
      position: "fixed",
      bottom: "0.5rem",
      right: "1rem",
      fontSize: "small",
      fontFamily: ui.theme.fontFamily.mono,
    },
  });

  const body = ui.component.main_2([container, statusText]);

  const html = ui.document.html({
    title,
    description,
    keywords,
    body,
    script: { src: "/static/js/status-message.js" },
    index: false,
    follow: false,
  });

  return html;
}

module.exports = page;
