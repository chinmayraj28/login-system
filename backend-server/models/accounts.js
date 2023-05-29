const { Schema, model } = require("mongoose");

const loginSystem = new Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String }
});

module.exports = model("accounts", loginSystem);            