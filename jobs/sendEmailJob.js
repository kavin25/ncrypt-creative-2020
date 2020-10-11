const cron = require("node-cron");

var sendEmailJob = cron.schedule('00 08 * * *', () => {
    
}, 
{
    scheduled: false,
    timezone: "Asia/Kolkata"
});

exports.sendEmailJob = sendEmailJob;