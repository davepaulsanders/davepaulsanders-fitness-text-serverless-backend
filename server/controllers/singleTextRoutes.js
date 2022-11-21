const router = require("express").Router();
const singleText = require("../singleText");
const Message = require("../models/Message");
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { message, selectedGroup } = req.body;
    // add message to database
    try {
      const messageSent = await Message.create(message);

      if (messageSent) {
        //send message to client
        try {
          await Promise.all(
            selectedGroup.forEach(async (client) => {
              const text = await singleText(message, client.phoneNumber);
              return text;
            })
          );
          res.send(messageSent);
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      res.send(err);
    }
  }
);

module.exports = router;
