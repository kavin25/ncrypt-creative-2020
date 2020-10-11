const cron = require("node-cron");
const { sendDailyMail } = require("../lib/email")

var sendEmailJob = cron.schedule("00 08 * * *", () => {
// var sendEmailJob = cron.schedule("* * * * * *", () => {
    console.log("Workking");
    sendDailyMail("kavinvalli@gmail.com");
}, 
{
    scheduled: false,
    timezone:"Asia/Kolkata"
});

exports.sendEmailJob = sendEmailJob;