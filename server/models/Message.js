const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  messageText: {
    type: "String",
    required: true,
  },
  messageDay: {
    type: "Number",
  },
  mediaLink: {
    type: "String",
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
      "Please use valid link!",
    ],
    default: "",
  },
});

const Message = model("Message", messageSchema);

module.exports = Message;
