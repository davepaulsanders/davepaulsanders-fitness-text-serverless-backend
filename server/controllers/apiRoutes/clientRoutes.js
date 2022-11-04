const router = require("express").Router();
const Client = require("../../models/Client");
const passport = require("passport");
// get all clients
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const clients = await Client.find({});
      res.send(clients);
    } catch (err) {
      console.log(err);
    }
  }
);

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const client = await Client.findOneAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true, runValidators: true }
      );
      res.json(client);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const client = await Client.create(req.body);
      res.send(client);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const client = await Client.deleteOne({ _id: req.body.id });
      res.send(client);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
);
module.exports = router;
