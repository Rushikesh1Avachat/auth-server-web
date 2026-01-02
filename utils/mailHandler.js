const nodemailer = require('nodemailer');

console.log(process.env.SMTP_USER, 'asdadd');
const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  post: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

module.exports = { transporter };
