require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require("twilio")(accountSid, authToken);

module.exports = function (client, messages) {
  const { phoneNumber, daysElapsed, firstName } = client;

  // if there is a message for the day the client is currently on
  if (messages[daysElapsed - 1]) {

    // send them that particular message
    twilioClient.messages
      .create({
        body: messages[daysElapsed - 1].messageText,
        from: "+19123257761",
        to: `+1${phoneNumber}`,
      })
      .then((message) => console.log(message.sid));
  }
};
