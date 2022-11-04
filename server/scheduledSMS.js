// automated scheduling npm package
const cron = require("node-cron");

// function that connects to twilio and sends the messages
const dailyMessage = require("./dailyMessage");

// models
const Client = require("./models/Client");
const Message = require("./models/Message");

exports.initScheduledSMS = () => {
  // initiates this process regularly at set time

  const scheduledSMS = cron.schedule("*/1 * * * *", async () => {
    const clients = await Client.find({});
    // messages sorted by which day it is supposed to be sent
    const messages = await Message.find({}).sort({ messageDay: 1 });
    console.log("sending daily messages...");

    try {
      clients.forEach((client) => {
        // send specific daily message to clients
        dailyMessage(client, messages);
      });
      console.log("messages sent");
    } catch (err) {
      console.log(err);
    }
  });

  scheduledSMS.start();
};
