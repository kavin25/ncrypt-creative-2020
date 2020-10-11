const express = require("express");
const app = express();

const { sendEmailJob } = require("./jobs/sendEmailJob");
sendEmailJob.start();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
