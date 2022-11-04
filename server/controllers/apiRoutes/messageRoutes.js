const router = require("express").Router();
const Message = require("../../models/Message");
const passport = require("passport");
// get all messages
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const messages = await Message.find({ messageDay: { $gte: 0 } });
      res.send(messages);
    } catch (err) {
      console.log(err);
    }
  }
);
// get all messages
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const message = await Message.findOneAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true, runValidators: true }
      );

      res.send(message);
    } catch (err) {
      res.send(err);
    }
  }
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const newDailyMessage = await Message.create(req.body);
      res.send(newDailyMessage);
    } catch (err) {
      res.send(err);
    }
  }
);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const deletedMessage = await Message.findOneAndDelete({_id: req.body._id});
      res.send(deletedMessage);
    } catch (err) {
      res.send(err);
    }
  }
);
module.exports = router;
