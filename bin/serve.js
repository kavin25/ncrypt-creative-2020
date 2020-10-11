if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = require("../app");

const { sendEmailJob } = require("../jobs/sendEmailJob");

const repos = require("../data/repos");

repos.forEach(repo => {
    console.log(`Title: ${repo.name} \n Link: ${repo.url}`)
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`> Listening on http://localhost:${port}`);
    sendEmailJob.start();
});