const nodemailer = require("nodemailer");
const { format } = require("date-fns");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_SENDER_USERNAME,
    pass: process.env.NODEMAILER_SENDER_PASSWORD,
  },
});

function send(to, unsubLink, loginLink, repos, issueId) {
  return transporter.sendMail({
    to,
    from: process.env.NODEMAILER_SENDER_EMAIL,
    subject: "Today's DevLetter",
    html: require("./template")({
      unsubLink,
      loginLink,
      repos,
      issueId,
      today: format(new Date(), "d MMM yyyy"),
    }),
  });
}

module.exports = {
  transporter,
  send,
};
