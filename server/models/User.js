const { Schema, model, Types } = require("mongoose");

const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  avatar: { type: String },
  basket: { type: Types.ObjectId, ref: "Basket" },
  orders: [{ type: Types.ObjectId, ref: "Order" }],
});

module.exports = model("User", User);
