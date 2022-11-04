const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new Schema({
  username: {
    type: "String",
    required: true,
    unique: true,
  },
  password: {
    type: "String",
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;

  next();
});

userSchema.methods.comparePassword = function (password) {
  console.log("Got here");
  return bcrypt.compareSync(password, this.password);
};
const User = model("User", userSchema);
module.exports = User;
