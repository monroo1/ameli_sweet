const { Schema, model, Types } = require("mongoose");

const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  avatar: { type: String },
  orders: [{ type: Types.ObjectId, ref: "Order" }],
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

module.exports = model("User", User);
