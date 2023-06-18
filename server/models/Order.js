const { Schema, model, Types } = require("mongoose");

const Order = new Schema({
  items: [],
  user: { type: Types.ObjectId, ref: "User" },
  count: { type: Number, require: true },
  cost: { type: Number, require: true },
  status: { type: Number, require: true },
  payments: { type: Boolean, require: true, default: false },
  date: { type: String, require: true },
  delivery: { type: Boolean, require: true, default: false },
  communication: { type: Number, require: true },
  phoneNumber: { type: String, require: true },
  paymentId: { type: String },
});

module.exports = model("Order", Order);
