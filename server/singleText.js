require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require("twilio")(accountSid, authToken);

module.exports = function (message, phoneNumber) {
  const { messageText, mediaLink } = message;
  try {
    if (message.mediaLink) {
      twilioClient.messages
        .create({
          body: messageText,
          from: "+19123257761",
          mediaUrl: [message.mediaLink],
          to: `+1${phoneNumber}`,
        })
        .then((message) => console.log(message.sid));
    } else {
      twilioClient.messages
        .create({
          body: messageText,
          from: "+19123257761",
          to: `+1${phoneNumber}`,
        })
        .then((message) => console.log(message.sid));
    }
  } catch (err) {
    console.log(err);
  }
};
