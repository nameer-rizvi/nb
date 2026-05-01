const utils = require("@nameer/utils");
const util = require("../util");
const ui = require("../ui");
const config = require("../config");
const transporter = require("./transporter");

async function send(email = {}) {
  try {
    if (!utils.isStringNonEmpty(email.to) || !email.html?.length) {
      util.log.mailer(`invalid email ("${email.to}")`, "warn");
      return;
    }

    if (!utils.isArray(email.html)) email.html = [email.html];

    email.html = ui.document.email(email.html.filter(utils.isString).join("")); // ui components are minified by default.

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
  } catch (error) {
    util.log.mailer(error, "error");
  }
}

module.exports = send;
