require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require("twilio")(accountSid, authToken);

module.exports = async (message, phoneNumber) => {
  const { messageText, mediaLink } = message;
  try {
    if (message.mediaLink) {
      const message = await twilioClient.messages.create({
        body: messageText,
        from: "+19123257761",
        mediaUrl: [message.mediaLink],
        to: `+1${phoneNumber}`,
      });
      console.log(message.sid);
      return message;
    } else {
      const message = await twilioClient.messages.create({
        body: messageText,
        from: "+19123257761",
        to: `+1${phoneNumber}`,
      });
      console.log(message.sid);
      return message;
    }
  } catch (err) {
    console.log(err);
  }
};
