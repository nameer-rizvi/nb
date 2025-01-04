const simpul = require("simpul");
const ui = require("../ui");
const util = require("../util");
const config = require("../config");
const transporter = require("./transporter");

async function send(email = {}) {
  if (!email.to?.length || !email.html?.length) return;

  if (!simpul.isArray(email.html)) email.html = [email.html];

  email.html = ui.document.email(email.html.filter(simpul.isString).join("")); // ui components are minified by default.

  util.log.mailer(`sending email ("${email.to}")..`);

  let res = { accepted: [email.to], rejected: [] };

  if (config.nodeEnvInProduction) {
    res = await transporter.sendMail(email);
  }

  if (res.accepted.length) {
    util.log.mailer(`sent email ("${res.accepted}")`);
  }

  if (res.rejected.length) {
    util.log.mailer(`send failed ("${res.rejected}")`, "warn");
  }

  return { success: res.accepted.length, fail: res.rejected.length };
}

module.exports = send;
