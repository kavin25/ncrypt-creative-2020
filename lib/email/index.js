const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_SENDER_USERNAME,
        pass: process.env.NODEMAILER_SENDER_PASSWORD,
    },
});

function sendDailyMail(to) {
    return transporter.sendMail({
        to,
        from: process.env.NODEMAILER_SENDER_EMAIL,
        subject: "Your daily Newsletter is here...",
        html: require("./templates/dailyMail"),
    });
}

module.exports = {
    transporter,
    sendDailyMail
}