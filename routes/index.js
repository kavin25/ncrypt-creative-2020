const router = require("express").Router();

router.get("/", (_req, res) => res.send("hello"));
router.use("/auth", require("./auth"));
router.use("/dashboard", require("./dashboard"));

module.exports = router;
