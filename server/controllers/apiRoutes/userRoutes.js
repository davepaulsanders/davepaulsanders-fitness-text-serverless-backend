const router = require("express").Router();
const User = require("../../models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (user) {
    // check password, then send back token
    const validPassword = await user.comparePassword(req.body.password);

    if (validPassword) {
      const payload = {
        user_id: user._id,
        username: user.username,
      };
      // create token and send back
      const token = jwt.sign(payload, process.env.JWT_SECRET);

      res.send({ userToken: `Bearer ${token}` });
    } else {
      res.json({ error: "Your username/password is incorrect" });
    }
  } else {
    res.json({ error: "Your username/password is incorrect" });
  }
});
module.exports = router;
