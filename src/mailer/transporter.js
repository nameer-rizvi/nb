const config = require("../config");
const nodemailer = require("nodemailer");

const transport = {
  service: config.emailService,
  auth: {
    user: config.emailAddress,
    pass: config.emailPassword,
  },
};

const defaults = {
  from: {
    name: config.appName,
    address: config.emailAddress,
  },
};

const transporter = nodemailer.createTransport(transport, defaults);

module.exports = transporter;

// https://nodemailer.com/smtp/
