const router = require("express").Router();
const passport = require("passport");

router.get("/github", passport.authenticate("github"));

router.get(
  "/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  function (_req, res) {
    // Successful authentication, redirect home.
    res.send("logged in");
  }
);

router.get("/me", (req, res) =>
  res.json({ authenticated: req.isAuthenticated(), user: req.user })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get(
  "/unsub",
  async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) {
        return next();
      }

      // Logout user
      // Get user id
      // Update user
      return res.send("lol");
    } catch (e) {
      return next(e);
    }
  },
  async (req, res, next) => {
    try {
      // Look for token
      // Get user id from token
      // Update user

      return res.send("lol");
    } catch (e) {
      return next(e);
    }
  }
);

module.exports = router;
