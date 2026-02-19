const ui = require("../../ui");

function page(status = 400, message = "Something went wrong") {
  const title = message ? `${status} | ${message}` : status.toString();

  const description = message
    ? `Error ${status}: ${message}`
    : `Error ${status}`;

  const keywords = ["error", status];

  const header = ui.component.h1_1(status.toString(), {
    class: message ? ["pr-3 mr-3 border-r"] : undefined,
  });

  const paragraph = message ? ui.component.p(message) : "";

  const container = ui.component.div_3(header + paragraph);

  const body = ui.component.main_1(container);

  const html = ui.document.html({
    title,
    description,
    keywords,
    body,
  });

  return html;
}

module.exports = page;
