const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { format } = require("date-fns");
const axios = require("axios");
const { send } = require("../lib/email");
const client = new PrismaClient();

router.use((req, res, next) =>
  req.isAuthenticated() ? next() : res.status(401).send("401 Unauthorised")
);

router.get("/", async (req, res, next) => {
  try {
    const emails = await client.email.findMany({
      select: {
        id: true,
        sent: true,
        sentAt: true,
        repos: true,
      },
      where: { userId: req.user.id },
    });

    return res.render("dashboard", {
      emails: emails
        .map((email) => ({
          ...email,
          sentAt: format(email.sentAt, "d MMM yyyy"),
        }))
        .reverse(),
    });
  } catch (e) {
    return next(e);
  }
});

router.get("/new", async (req, res, next) => {
  try {
    let email = await client.email.create({
      data: {
        user: { connect: { id: req.user.id } },
        sent: true,
        sentAt: new Date(),
      },
    });

    let repos = (
      await axios.get(
        `https://api.github.com/users/${req.user.username}/starred?per_page=1000`
      )
    ).data;

    const l = Array(3)
      .fill("_")
      .map((_) => Math.floor((Math.random() * 10000000) % repos.length));

    nrepos = [];
    for (let i = 0; i < 3; i++) {
      const rp = repos[l[i]];
      nrepos.push(rp);

      await client.repo.create({
        data: {
          user: { connect: { id: req.user.id } },
          email: { connect: { id: email.id } },
          repoLink: rp.url,
        },
      });
    }

    // repo - link, fullName, languages, tags, description
    const frepos = [];
    for (let repo of nrepos) {
      const languages = await axios.get(repo.languages_url);

      frepos.push({
        link: repo.html_url,
        fullName: repo.full_name,
        description: repo.description,
        tags: [],
        languages: Object.keys(languages.data),
      });
    }

    console.log(frepos);

    // Create email
    // Find starred repo
    // Add to db
    // Send email
    send(
      req.user.email,
      "https://google.com",
      "https://google.com",
      frepos,
      email.id
    );

    res.redirect("/dashboard");
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
