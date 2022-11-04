const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const db = require("../config/connection");
const Client = require("../models/Client");
const Message = require("../models/Message");
const User = require("../models/User");
const margePhone = process.env.MARGE_PHONE;

db.once("open", async () => {
  console.log("seeding database...");
  try {
    await Client.deleteMany({});
    await Message.deleteMany({});
    await Message.insertMany([
      { messageText: "This is the first day message", messageDay: 1 },
      { messageText: "This is the second day message", messageDay: 2 },
      { messageText: "This is the third day message", messageDay: 3 },
      { messageText: "This is the fourth day message", messageDay: 4 },
      { messageText: "This is the fifth day message", messageDay: 5 },
      { messageText: "This is the sixth day message", messageDay: 6 },
      { messageText: "This is the seventh day message", messageDay: 7 },
      { messageText: "This is the eighth day message", messageDay: 8 },
      { messageText: "This is the ninth day message", messageDay: 9 },
      { messageText: "This is the tenth day message", messageDay: 10 },
    ]);

    await Client.insertMany([
      {
        username: "davepsandy",
        firstName: "Dave",
        lastName: "Sanders",
        email: "davepaulsanders@gmail.com",
        phoneNumber: "6095294847",
        weightLossGoals: "15 pounds",
        startDate: "10/19/2022",
      },
      {
        username: "margenice",
        firstName: "Margaret",
        lastName: "Nice",
        email: "margeenice@gmail.com",
        phoneNumber: margePhone,
        weightLossGoals: "0 pounds",
        daysElapsed: 4,
        startDate: "10/19/2022",
      },
    ]);
    await User.create({
      username: "davepsandy",
      password: "123456"
    })
    console.log("Clients and messages created!");
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
});
