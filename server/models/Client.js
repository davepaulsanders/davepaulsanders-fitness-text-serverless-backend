const { Schema, model } = require("mongoose");

const clientSchema = new Schema({
  firstName: {
    type: "String",
    required: "true",
  },
  lastName: {
    type: "String",
    required: "true",
  },
  email: {
    type: "String",
    required: "true",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please use a valid email address",
    ],
    unique: true,
  },
  phoneNumber: {
    type: "String",
    required: "true",
    unique: true,
    match: [
      /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      "Please use valid phone number",
    ],
  },
  weightLossGoals: {
    type: "String",
    required: "true",
  },
  daysElapsed: {
    type: "Number",
    required: "true",
    default: 1,
  },
  startDate: {
    type: Date,
    required: true,
  },
  spendTotal: {
    type: "Number",
    required: "true",
    default: 0,
  },
  coach: {
    type: "String",
    default: "Bonnie Tynch",
  },
});

const Client = model("Client", clientSchema);

module.exports = Client;
