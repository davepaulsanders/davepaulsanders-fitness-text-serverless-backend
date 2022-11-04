const router = require("express").Router();
const apiRoutes = require("./apiRoutes");
const dailyTextRoutes = require("./dailyTextRoutes");
const singleTextRoutes = require("./singleTextRoutes");
router.get("/test", (req, res) => {
  res.send("yas");
});
router.use("/api", apiRoutes);
router.use("/dailytext", dailyTextRoutes);
router.use("/singletext", singleTextRoutes);

module.exports = router;
