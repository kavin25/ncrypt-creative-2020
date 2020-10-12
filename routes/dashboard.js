const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();

router.use((req, res, next) =>
  req.isAuthenticated() ? next() : res.status(401).send("401 Unauthorised")
);

router.get("/", async (req, res, next) => {
  try {
    const emails = await client.email.findMany({
      select: {
        sent: true,
        sentAt: true,
        repos: true,
      },
      where: { userId: req.user.id },
    });

    return res.render("dashboard", { emails });
  } catch (e) {
    return next(e);
  }
});

router.get("/new", async (req, res, next) => {
  try {
    // Create email
    // Find starred repo
    // Add to db
    // Send email
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
